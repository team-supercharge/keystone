import React from 'react';

import { fetchResidents, fetchDailyLogs, fetchDailyTasks, fetchCarers, fetchHome } from '../../common/dataService';

import LmcHomeTitle from './components/LmcHomeTitle.jsx';
import LmcCarersCard from './components/LmcCarersCard.jsx';
import LmcIncidentsCard from './components/LmcIncidentsCard.jsx';
import LmcResidentsCard from './components/LmcResidentsCard.jsx';
import LmcTasksCard from './components/LmcTasksCard.jsx';
import LmcTopTipsCard from './components/LmcTopTipsCard.jsx';
import LmcAdvertCard from './components/LmcAdvertCard.jsx';

import CreateForm from '../../../shared/CreateForm';
import List from '../../../../utils/List';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            showCreateModal: false,
            currentList: null,
            currentListType: null,
        };

        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.onOpenCreateModal = this.onOpenCreateModal.bind(this);
        this.onCreateItemComplete = this.onCreateItemComplete.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.fetchResidents = this.fetchResidents.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);
        this.fetchCarers = this.fetchCarers.bind(this);
        this.renderCreateForm = this.renderCreateForm.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    onOpenCreateModal(listName) {
        this.setState({
            currentListType: listName,
            currentList: new List(Keystone.lists[listName]),
        });
        this.toggleCreateModal(true);
    }


    fetchResidents() {
        fetchResidents().then(({ results }) => {
            this.setState({
                isFetchingResidents: false,
                LmcResidents: results,
            });
        });
    }

    fetchTasks() {
        fetchDailyLogs().then(({ results }) => {
            this.setState({
                isFetchingLogs: false,
                LmcLogs: results,
            });
        });

        fetchDailyTasks().then((data) => {
            this.setState({
                isFetchingTasks: false,
                LmcTasks: data,
            });
        });
    }

    fetchCarers() {
        fetchCarers().then(({ results }) => {
            this.setState({
                fetchingResidents: false,
                LmcCarers: results,
            });
        });
    }

    fetchData() {
        this.setState({
            isFetchingResidents: true,
            isFetchingLogs: true,
            isFetchingTasks: true,
            isFetchingHome: true,
            isFetchingCarers: true,
        });

        this.fetchCarers();
        this.fetchResidents();
        this.fetchTasks();

        fetchHome().then(({ results }) => {
            this.setState({
                isFetchingHome: false,
                LmcHome: results[0],
            });
        });
    }

    onCreateItemComplete (item) {
        this.toggleCreateModal(false);
        switch (this.state.currentListType) {
            case 'Task':
                this.fetchTasks();
                break;
            case 'Resident':
                this.fetchResidents();
                break;
            case 'User':
                this.fetchCarers();
                break;
            default:
                this.fetchData();
                break;
        }

        // refresh the data
		// Redirect to newly created item path
		//const list = this.props.currentList;
		//this.context.router.push(`${Keystone.adminPath}/${list.path}/${item.id}`);
    }

    toggleCreateModal(visible) {
        this.setState({
            showCreateModal: visible,
        });
    }
    
    renderCreateForm() {
        const { currentList, showCreateModal } = this.state;
        return (
            <CreateForm
                isOpen={showCreateModal}
                list={currentList}
                onCancel={() => this.toggleCreateModal(false)}
                formTitle='Create Resident'
                onCreate={this.onCreateItemComplete}
            />
        )
    }

    render () {
        const {
            isFetchingResidents,
            isFetchingLogs,
            isFetchingTasks,
            isFetchingHome,
            isFetchingCarers,
            LmcCarers,
            LmcHome,
            LmcLogs,
            LmcResidents,
            LmcTasks,
            showCreateModal,
            currentList,
        } = this.state;

        return (
            <div style={styles.container} className="row">
                <div className="eight columns">
                    <div className="row">
                        <div className="twelve columns">
                            <LmcHomeTitle home={LmcHome} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="six columns">
                            <LmcResidentsCard residents={LmcResidents} home={LmcHome} onCreate={this.onOpenCreateModal}/>
                        </div>
                        <div className="six columns">
                            <LmcIncidentsCard logs={LmcLogs} residents={LmcResidents} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="six columns">
                            <LmcCarersCard logs={LmcLogs} carers={LmcCarers} onCreate={this.onOpenCreateModal}/>
                        </div>
                        <div className="six columns">
                            <LmcTasksCard logs={LmcLogs} tasks={LmcTasks} onCreate={this.onOpenCreateModal}/>
                        </div>
                    </div>
                </div>
                <div  className="four columns">
                    <div className="row">
                        <LmcTopTipsCard />
                    </div>
                    <div className="row">
                        <LmcAdvertCard />
                    </div>
                </div>
                {
                    currentList ?
                        this.renderCreateForm() : null
                }
            </div>
        );
    }
};


const styles = {
    container: {
        padding: '3em 20px 60px',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 1170,
    }
}
export default Home;


/*

Interesting:
this.context.router.push(`${Keystone.adminPath}/${list.path}/${item.id}`);



*/