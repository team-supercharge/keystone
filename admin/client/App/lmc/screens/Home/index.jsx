import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import _ from 'lodash';

import LmcHomeTitle from './components/LmcHomeTitle.jsx';
import LmcCarersCard from './components/LmcCarersCard.jsx';
import LmcIncidentsCard from './components/LmcIncidentsCard.jsx';
import LmcBirthdaysCard from './components/LmcBirthdaysCard.jsx';
import LmcResidentsCard from './components/LmcResidentsCard.jsx';
import LmcTasksCard from './components/LmcTasksCard.jsx';
import LmcTopTipsCard from './components/LmcTopTipsCard.jsx';
import LmcAdvertCard from './components/LmcAdvertCard.jsx';
import LmcSpinner from '../../components/LmcSpinner.jsx';

import CreateForm from '../../../shared/CreateForm';
import List from '../../../../utils/List';

import { BlankState } from '../../../elemental';

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            showCreateModal: false,
            currentList: null,
            currentListType: null,
            isModalOpen: true,
        };

        this.onCloseCreateModal = this.onCloseCreateModal.bind(this);
        this.onOpenCreateModal = this.onOpenCreateModal.bind(this);
        this.onCreateItemComplete = this.onCreateItemComplete.bind(this);
        this.renderDashboard = this.renderDashboard.bind(this);
    }

    onCloseCreateModal () {
        this.setState({ isModalOpen: false });
        setTimeout(() => {
            this.setState({ showCreateModal: false });
            this.setState({ isModalOpen: true });
        });
    };

    onOpenCreateModal (listName) {
        this.setState({
            currentListType: listName,
            currentList: new List(Keystone.lists[listName]),
            showCreateModal: true,
        });
    }

    onCreateItemComplete (item) {
        this.onCloseCreateModal();
        switch (this.state.currentListType) {
        case 'RecurringTask':
            this.props.refreshTasks();
            break;
        case 'Resident':
            this.props.refreshResidents();
            break;
        case 'User':
            this.props.refreshUsers();
            break;
        default:
            break;
        }
    }

    toggleCreateModal (showCreateModal) {
        this.setState({ showCreateModal });
    }

    renderCreateForm () {
        const { currentList, showCreateModal, isModalOpen } = this.state;
        return (
            (currentList && showCreateModal)
                ? <div className="lmc-create-form">
                    <CreateForm
                        isOpen={isModalOpen}
                        list={currentList}
                        onCancel={() => this.onCloseCreateModal()}
                        formTitle="Create Resident"
                        onCreate={this.onCreateItemComplete}
                    />
                </div> : null
        );
    }


    getSettingsValue (settings, key) {
        let url = _.find(settings, { fields: { key } });
        return _.get(url, 'fields.value');
    }

    renderDashboard () {
        const { categoriesFetch, homeFetch, residentsFetch, logsFetch, tasksFetch, usersFetch, settingsFetch } = this.props;
        return (
            <div>
                {/* <div className="dashboard-container"> */}
                <div className="row">
                    <div className="twelve columns">
                        <LmcHomeTitle
                            residents={residentsFetch.value.results}
                            home={homeFetch.value.results} />
                    </div>
                </div>
                <div id="intro-js-step-dashboard">
                    <div className="row">
                        <div className="four columns" id="intro-js-step-residents">
                            <LmcResidentsCard
                                residents={residentsFetch.value.results}
                                onCreate={this.onOpenCreateModal} />
                        </div>
                        <div className="four columns" id="intro-js-step-incidents">
                            <LmcIncidentsCard
                                logs={logsFetch.value.results}
                                categories={categoriesFetch.value.results}
                                residents={residentsFetch.value.results}
                                home={homeFetch.value.results}
                                onCreate={this.onOpenCreateModal} />
                        </div>
                        <div className="four columns">
                            <LmcTopTipsCard video={this.getSettingsValue(settingsFetch.value.results, 'Home_YouTubeURL')} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="four columns" id="intro-js-step-carers">
                            <LmcCarersCard
                                logs={logsFetch.value.results}
                                carers={usersFetch.value.results}
                                onCreate={this.onOpenCreateModal} />
                            <LmcBirthdaysCard residents={residentsFetch.value.results} />
                        </div>
                        <div className="four columns" id="intro-js-step-tasks">
                            <LmcTasksCard
                                logs={logsFetch.value.results}
                                tasks={tasksFetch.value.results}
                                onCreate={this.onOpenCreateModal} />
                        </div>
                        <div className="four columns" id="intro-js-step-advert">
                            <LmcAdvertCard
                                url={this.getSettingsValue(settingsFetch.value.results, 'Home_Advert_Link')}
                                image={this.getSettingsValue(settingsFetch.value.results, 'Home_Advert_Img')}/>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="six columns" id="intro-js-step-residents">
                            <LmcBirthdaysCard residents={residentsFetch.value.results} />
                        </div>
                    </div> */}
                </div>
                {/* </div> */}
                { this.renderCreateForm() }
            </div>
        );
    }

    render () {
        const { categoriesFetch, homeFetch, residentsFetch, logsFetch, tasksFetch, usersFetch, settingsFetch } = this.props;

        // compose multiple PromiseStates together to wait on them as a whole
        const allFetches = PromiseState.all([categoriesFetch, homeFetch, residentsFetch, logsFetch, tasksFetch, usersFetch, settingsFetch]);

        if (allFetches.pending) {
            return withContainer(<LmcSpinner />);
        } else if (allFetches.fulfilled) {
            return withContainer(this.renderDashboard());
        } else {
            // if (allFetches.rejected) ?
            return withContainer(<BlankState heading={ERROR_MESSAGE} style={{ marginTop: 30 }} />);
        }
    }
};

const withContainer = (co) => (
    <div style={styles.container} className="row">
        { co }
    </div>
);

const styles = {
    container: {
        padding: '3em 20px 60px',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 1170,
    },
};

const ERROR_MESSAGE = 'Oops... looks like something went wrong. Please get in touch if this problem persists!';
// Configuring the data sources
// Note: I went for multiple independet requests because it's more flexible
// Each consumer can just digest whatever data source it needs and apply the logic
// Ie. the cards are all independent
const usersUrl = `${Keystone.adminPath}/api/reports/users`;
const tasksUrl = `${Keystone.adminPath}/api/reports/daily_tasks`;
const logsUrl = `${Keystone.adminPath}/api/reports/daily_logs`;
const residentsUrl = `${Keystone.adminPath}/api/reports/residents`;

export default connect((props) => ({
    logsFetch: logsUrl,
    tasksFetch: tasksUrl,
    refreshTasks: () => ({
        tasksFetch: {
            url: tasksUrl,
            force: true,
            refreshing: true,
        },
    }),
    usersFetch: usersUrl,
    refreshUsers: () => ({
        usersFetch: {
            url: usersUrl,
            force: true,
            refreshing: true,
        },
    }),
    residentsFetch: residentsUrl,
    refreshResidents: () => ({
        residentsFetch: {
            url: residentsUrl,
            force: true,
            refreshing: true,
        },
    }),
    categoriesFetch: `${Keystone.adminPath}/api/log-categories`,
    homeFetch: `${Keystone.adminPath}/api/homes`,
    settingsFetch: `${Keystone.adminPath}/api/careoffice-settings`,
}))(Home);
