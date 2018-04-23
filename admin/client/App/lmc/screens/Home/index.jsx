import React from 'react';
import { connect } from 'react-redux';

import { fetchResidents, fetchDailyLogs, fetchDailyTasks, fetchCarers, fetchHome, fetchCategories, fetchSettings } from '../../common/dataService';

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
            isModalOpen: true,
            LmcSettings: {}
        };

        this.onCloseCreateModal = this.onCloseCreateModal.bind(this);
        this.onOpenCreateModal = this.onOpenCreateModal.bind(this);
        this.onCreateItemComplete = this.onCreateItemComplete.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.fetchResidents = this.fetchResidents.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);
        this.fetchCarers = this.fetchCarers.bind(this);
        this.renderCreateForm = this.renderCreateForm.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    onCloseCreateModal() {
        this.setState({ isModalOpen: false });
        setTimeout(() => {
            this.setState({ showCreateModal: false });
            this.setState({ isModalOpen: true });
        });
    };

    onOpenCreateModal(listName) {
        this.setState({
            currentListType: listName,
            currentList: new List(Keystone.lists[listName]),
            showCreateModal: true,
        });
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

    fetchCategories() {
        fetchCategories().then(({ results }) => {
            this.setState({
                fetchingCategories: false,
                LmcCategories: results,
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
            isFetchingSettings: true,
        });

        this.fetchCarers();
        this.fetchResidents();
        this.fetchTasks();
        this.fetchCategories();

        fetchSettings().then(({ results }) => {
            let settings = {};
            results.forEach(row => {
                settings[row.fields.key] = row.fields.value;
            });
            this.setState({
                isFetchingSettings: false,
                LmcSettings: settings,
            });
        });

        fetchHome().then(({ results }) => {
            this.setState({
                isFetchingHome: false,
                LmcHome: results[0],
            });
        });
    }


    onCreateItemComplete (item) {
        this.onCloseCreateModal();

        switch (this.state.currentListType) {
            case 'RecurringTask':
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
    }

    toggleCreateModal(showCreateModal) {
        this.setState({ showCreateModal });
    }
    
    renderCreateForm() {
        const { currentList, showCreateModal, isModalOpen } = this.state;
        return (
            (currentList && showCreateModal) ? 
                <CreateForm
                    isOpen={isModalOpen}
                    list={currentList}
                    onCancel={() => this.onCloseCreateModal()}
                    formTitle='Create Resident'
                    onCreate={this.onCreateItemComplete}
                /> : null
            ) 
    }

    render () {
        const {
            isFetchingResidents,
            isFetchingLogs,
            isFetchingTasks,
            isFetchingHome,
            isFetchingCarers,
            isFetchingSettings,
            LmcCarers,
            LmcHome,
            LmcLogs,
            LmcResidents,
            LmcTasks,
            LmcCategories,
            LmcSettings,
        } = this.state;

        return (
            <div style={styles.container} className="row">
                <div className="eight columns">
                    <div className="dashboard-container">
                        <div className="row">
                            <div className="twelve columns">
                                <LmcHomeTitle home={LmcHome} residents={LmcResidents} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="six columns">
                                <LmcResidentsCard residents={LmcResidents} home={LmcHome} onCreate={this.onOpenCreateModal}/>
                            </div>
                            <div className="six columns">
                                { LmcHome && LmcCategories
                                    ? <LmcIncidentsCard logs={LmcLogs} residents={LmcResidents} categories={LmcCategories} home={LmcHome} />
                                    : null }
                                
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
                </div>
                <div className="four columns">
                    { !isFetchingSettings
                        ? <div>
                            <div className="row">
                                <LmcTopTipsCard video={LmcSettings.Home_YouTubeURL} />
                            </div>
                            <div className="row">
                                <LmcAdvertCard url={LmcSettings.Home_Advert_Link} image={LmcSettings.Home_Advert_Img} />
                            </div>
                        </div>
                        : null }
                </div>
                { this.renderCreateForm() }
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


Home.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default connect(() => ({}))(Home);


/*

Interesting:
this.context.router.push(`${Keystone.adminPath}/${list.path}/${item.id}`);



*/