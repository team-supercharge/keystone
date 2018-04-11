import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import { fetchResidentsList, fetchResidentLogs } from '../services/dataService';
import LmcResidentChart from './LmcResidentChart.jsx';
import LmcResidentList from './LmcResidentList.jsx';
import LoadingScreen from '../components/LoadingScreen';


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

    componentDidMount() {

        this.setState({ fetchingResidents: true });

        fetchResidentsList()
            .then(({ results }) => {
                this.setState({
                    fetchingResidents: false,
                    LmcresidentList: results,
                });
                this.onSelect(results[0]); // only dev
            })
            .catch(err => {
                this.setState({
                    fetchingResidents: false,
                    fetchingResidentsError: "The resport is not available at this time. Please contact support if this problem persists"
                });
            })
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

        this.setState({
            selection,
            selectionData: null,
            fetchingSelection: true,
            fetchingSelectionError: null,
        });

        fetchResidentLogs(selection.id)
            .then(selectionData => {
                this.setState({ 
                    fetchingSelection: false,
                    selectionData,
                });
            })
            .catch(({ message }) => {
                this.setState({ 
                    fetchingSelection: false,
                    fetchingSelectionError: message,
                });
            });
    }

    render () {

        const { 
            fetchingResidents,
            fetchingResidentsError,
            LmcresidentList,
            fetchingSelection,
            fetchingSelectionError,
            selection,
            selectionData,
        } = this.state;

        return (
            <div className="row">
                <div className="four columns">
                    {
                        fetchingResidents ?
                            <LoadingScreen /> :
                            fetchingResidentsError ? 
                                <ErrorMessage message={fetchingResidentsError} /> :
                                <LmcResidentList data={LmcresidentList} onSelect={this.onSelect} current={selection} />
                    }
                </div>
                <div  className="eight columns">
                    {
                        fetchingSelection ? 
                            <LoadingScreen /> :
                            fetchingSelectionError ? 
                                <ErrorMessage message={fetchingSelectionError} /> :
                                <LmcResidentChart data={selectionData} resident={selection} />
                    }
                </div>
            </div>
        );
    }
};

export default Daily;
