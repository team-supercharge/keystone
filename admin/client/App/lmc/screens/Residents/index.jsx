import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LmcResidentsScreen extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

LmcResidentsScreen.propTypes = {

};



export default connect((props) => ({
    residentsFetch: `${Keystone.adminPath}/api/reports/residents`,
    fetchDailyTasks: (date) => {
        let url = `${Keystone.adminPath}/api/reports/tasks`;
        if (date) url += `?on=${date.toISOString()}`;
        return {
            tasksFetch: url
        }
    },
}))(LmcResidentsScreen);

export default LmcResidentsScreen;