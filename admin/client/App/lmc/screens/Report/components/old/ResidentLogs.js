import React from 'react';
import { Link } from 'react-router';


import moment from 'moment';
// import 'react-dates/initialize';
// import { SingleDatePicker } from 'react-dates';
// const today = moment();
// const isDayBlocked = day => !(day > today)

import LogsViewer from './LogsViewer';

import { fetchResidentLogs, fetchResidentInfo } from '../services/dataService';


const styles = {
    icon: {
        marginRight: 8
    }
}

class ResidentLogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingLogs: true,
            logs: [],
            focused: false,
            date: moment(),
            endDate: new Date(),
            startDate: null
        };
        this.renderDailyReport = this.renderDailyReport.bind(this);
    }

    componentDidMount() {

        const { residentId } = this.props.params;

        fetchResidentLogs(residentId)
            .then(residentLogs => {
                this.setState({ 
                    loadingLogs: false,
                    residentLogs
                });
            })
            .catch(e => {
                // this.setState({
                //     loadingLogs: false,
                //     loadingError: true
                // });
                console.log(e);
            });
    }

    renderDailyReport() {
        const { residentLogs } = this.state;
        return (
            <div>
                <h2>
                    Daily Care for { residentLogs.results.residentName }
                </h2>
                <LogsViewer data={residentLogs.results.logs[0]}></LogsViewer>
            </div>
        )
    }

    renderBackLink() {
        return (
            <div className="Toolbar">
                <Link to={`${Keystone.adminPath}/reports/residents`}>
                    <i className="octicon octicon-chevron-left" style={styles.icon}></i>
                    Residents
                </Link>
            </div>
        )
    }

    render () {
        let { loadingLogs } = this.state;

        return (
            <div>
                { this.renderBackLink() }
                { loadingLogs ? 
                    <div>
                        Loading...
                    </div> :
                    this.renderDailyReport()
                }
            </div>
        );
    }
};

/** <SingleDatePicker
        date={this.state.date}
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            isOutsideRange={day => day > today}
            focused={focused}
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
    />  */
// Use this on the backend to reduce size of log object
// _.omit(object, ['a', 'c']);
// => { 'b': '2' }

module.exports = ResidentLogs;