import React from 'react';
import _ from 'lodash';
import { connect } from 'react-refetch';
import LmcResidentList from '../../../components/LmcResidentList.jsx';
import LmcLoadingScreen from '../../../components/LmcLoadingScreen.jsx';
import { BlankState } from '../../../../elemental';

class LmcCharts extends React.Component {

    renderChildren(residentsFetch, params, children) {
        return React.Children.map(children, child =>
            React.cloneElement(child, { resident: _.find(residentsFetch.value.results, { id: params.resident_id }) })
        )
    }

    render () {
        const { residentsFetch, params, children } = this.props;
        const chart_type = params.chart_type || 'dashboard';
        return (
            residentsFetch.pending
                ? <LmcLoadingScreen />
                : !residentsFetch.fulfilled
                    ? <BlankState heading={'Opps.. Something went wrong'} style={styles.blankSlate} />
                    : _.get(residentsFetch, 'value.results.length') > 0
                        ? <div className="row" style={styles.container}>
                            <div className="three columns lmc-box-shadow__right" style={styles.sidebar}>
                                <LmcResidentList
                                    data={residentsFetch.value.results}
                                    resident_id={params.resident_id}
                                    link={resident_id => `${Keystone.adminPath}/reports/charts/${chart_type}/${resident_id}`}
                                />
                            </div>
                            <div className="nine columns" style={styles.childrenContainer}>
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
        paddingLeft: '3%',
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
