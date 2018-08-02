import React from 'react';
import _ from 'lodash';
import { connect } from 'react-refetch';
import LmcResidentList from '../../../components/LmcResidentList.jsx';
import LmcLoadingScreen from '../../../components/LmcLoadingScreen.jsx';
import { BlankState } from '../../../../elemental';

class LmcCharts extends React.Component {

    renderChart(residentsFetch, params, children) {
        if (!params.chart_type || !params.resident_id) {
            return <BlankState heading={'Oops! Something went wrong'} style={styles.blankSlate} />;
        }

        return React.Children.map(children, child =>
            React.cloneElement(child, { resident: _.find(residentsFetch.value.results, { id: params.resident_id }) })
        )
    }

    render () {
        const { residentsFetch, params, children } = this.props;
        const chart_type = params.chart_type || 'dashboard';

        if (residentsFetch.pending) {
            return <LmcLoadingScreen />;
        }

        if (!residentsFetch.fulfilled) {
            return <BlankState heading={'Oops.. Something went wrong'} style={styles.blankSlate} />;
        }

        if (!_.get(residentsFetch, 'value.results.length') > 0) {
            return <BlankState heading={'You haven\'t added any residents yet'} style={styles.blankSlate} />;
        }

        return (
            <div className="row" style={styles.mainContainer}>
                <div className="three columns lmc-box-shadow__right">
                    <div style={styles.container}>
                        <div style={styles.childrenContainer}>
                            <LmcResidentList
                                data={residentsFetch.value.results}
                                resident_id={params.resident_id}
                                link={resident_id => `${Keystone.adminPath}/reports/charts/${chart_type}/${resident_id}`}
                            />
                        </div>
                    </div>
                </div>
                <div className="nine columns" style={{ marginLeft: 10, width: '78% !important' }}>
                    <div style={styles.container}>
                        <div style={{ borderRight: '1px solid #e1e1e1', ...styles.childrenContainer }}>
                            <div style={{ width: '100%', paddingRight: 25 }}>
                                {this.renderChart(residentsFetch, params, children)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LmcCharts.propTypes = {

};

const styles = {
    mainContainer: {
        height: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '85vh',
    },
    childrenContainer: {
        marginLeft: 0,
        paddingTop: 0,
        paddingLeft: 15,
        width: '100%',
        display: 'flex',
        overflowY: 'auto',
        minHeight: 0,
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
