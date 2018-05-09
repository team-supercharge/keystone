import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { connect } from 'react-refetch';

import LmcResidentChart from './LmcResidentChart.jsx';
import LmcResidentList from './LmcResidentList.jsx';
import LoadingScreen from '../components/LoadingScreen';
import { BlankState } from '../../../../elemental';


class ErrorMessage extends React.Component {
    render() {
        const { message } = this.props;
        return (
            <p> { message } </p>
        )
    }
}


class Daily extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(selection) {
        
        /**
         * selection (User Model): 
         * {    
         *  "id":"5a64a71f669e118a48e4108e",
         *  "name":"Adam Hurst",
         *  "fields":{
         *      "name":{
         *          "first":"Adam",
         *          "last":"Hurst"
         *      },
         *      "summary":"Profile goes here",
         *      "home":"5a64a683669e118a48e41080",
         *      "gender":"male",
         *      "picture":{
         *          "url": "..."
         *      },
         *      "status":"active",
         *      "isInactive":false,
         *      "dateOfBirth":"2018-01-02T00:00:00.000Z",  birthday reminder?
         *      "location.building":"Building 1",
         *      "location.floor":"1",
         *      "location.room":"2",
         *      "location.bed":"3",
         *      "carers":[
         *          "5a64a683669e118a48e4107e"
         *      ],
         *      "measurements":true,
         *      "recentDrinkConsumption":"n/a",
         *      "recentMustScore":"n/a",
         *      "recentWaterlowScore":"n/a"
         *  }
         * }
         * 
         */

        this.props.fetchResidentLogs(selection);
        this.setState({ selection });
    }

    render () {
        const { selection } = this.state;
        const { residentsFetch, residentLogsFetch } = this.props;

        if (!selection && residentsFetch.fulfilled && _.get(residentsFetch, 'value.results.length')) {
            this.onSelect(_.sortBy(residentsFetch.value.results, 'name')[0]);
        }

        return (
            <div>
                { residentsFetch.pending
                    ? <LoadingScreen />
                    : !residentsFetch.fulfilled
                        ? <BlankState heading={'Opps.. Something went wrong'} style={{ marginTop: 40 }} />
                        : _.get(residentsFetch, 'value.results.length') > 0
                            ? <div className="row" style={{ display: 'flex' }}>
                                <div className="four columns lmc-box-shadow__right" style={{ maxWidth: 300 }}>
                                    <LmcResidentList data={residentsFetch.value.results} onSelect={this.onSelect} current={selection} />
                                </div>
                                <div className="eight columns" style={{ marginLeft: 0, paddingLeft: '4%', minHeight: '90vh' }}>
                                    { !residentLogsFetch || residentLogsFetch.pending
                                        ? <LoadingScreen />
                                        : !residentLogsFetch.fulfilled
                                            ? <BlankState heading={'Opps.. Something went wrong. Unable to load logs'} style={{ marginTop: 40 }} />
                                            : <LmcResidentChart data={residentLogsFetch.value} resident={selection} />
                                    }
                                </div>
                            </div>
                            : <BlankState heading={'You haven\'t added any residents yet'} style={{ margin: 40 }} />
                }
            </div>
        );
    }
};



export default connect((props) => ({
    residentsFetch: `${Keystone.adminPath}/api/reports/residents`,
    fetchResidentLogs: resident => ({
        residentLogsFetch: {
            url: `${Keystone.adminPath}/api/reports/logs/${resident.id}`,
            force: true,
            refreshing: false,
        }
    })
}))(Daily);

