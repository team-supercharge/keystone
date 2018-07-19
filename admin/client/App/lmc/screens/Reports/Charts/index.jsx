import React from 'react';
import _ from 'lodash';
import { connect } from 'react-refetch';
import LmcResidentList from '../../../components/LmcResidentList.jsx';
import LoadingScreen from '../../../components/LmcLoadingScreen.jsx';
import { BlankState, GlyphButton } from '../../../../elemental';
import { Link } from 'react-router';

class LmcCharts extends React.Component {

    renderChildren(residentsFetch, params, children) {
        return React.Children.map(children, child =>
            React.cloneElement(child, { resident: _.find(residentsFetch.value.results, { id: params.resident_id }) })
        )
    }

    renderToolbar({ resident_id }) {
        return (
            <div className="Toolbar">
                <GlyphButton
					component={Link}
					glyph="chevron-left"
					position="left"
					style={{}}
					to={`${Keystone.adminPath}/reports/charts/dashboard/${resident_id}`}
					variant="link">
					Dashboard
				</GlyphButton>
            </div>
        )
    }

    render () {
        const { residentsFetch, params, children } = this.props;
        const chart_type = params.chart_type || 'dashboard';
        return (
            residentsFetch.pending
                ? <LoadingScreen />
                : !residentsFetch.fulfilled
                    ? <BlankState heading={'Opps.. Something went wrong'} style={styles.blankSlate} />
                    : _.get(residentsFetch, 'value.results.length') > 0
                        ? <div className="row" style={styles.container}>
                            <div className="four columns lmc-box-shadow__right" style={styles.sidebar}>
                                <LmcResidentList
                                    data={residentsFetch.value.results}
                                    resident_id={params.resident_id}
                                    link={resident_id => `${Keystone.adminPath}/reports/charts/${chart_type}/${resident_id}`}
                                />
                            </div>
                            <div className="eight columns" style={styles.childrenContainer}>
                                {params.chart_type !== 'dashboard' && this.renderToolbar(params)}
                                {this.renderChildren(residentsFetch, params, children)}
                            </div>
                        </div>
                        : <BlankState heading={'You haven\'t added any residents yet'} style={styles.blankSlate} />
        );
    }
}

LmcCharts.propTypes = {

};

const styles = {
    container: {
        display: 'flex',
    },
    childrenContainer: {
        marginLeft: 0,
        paddingLeft: '4%',
        minHeight: '90vh',
    },
    sidebar: {
        maxWidth: 300,
    },
    blankSlate: {
        marginTop: 40,
    }
}

export default connect(props => ({
    residentsFetch: `${Keystone.adminPath}/api/reports/residents`,
}))(LmcCharts);
