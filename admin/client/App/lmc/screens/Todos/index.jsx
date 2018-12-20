import React from 'react';
import { connect as refetch, PromiseState } from 'react-refetch';
import { connect } from 'react-redux';
import {
    LmcTaskList,
} from './components';
import {
    LmcSingleDateSelector,
    LmcLoadingScreen,
} from '../../components';

import LmcTaskCreateModal from './modals/createTask/index.jsx';
import {
    GlyphButton,
    BlankState,
} from '../../../elemental';
import moment from 'moment';

import {
    toggleCreateTodoModal,
} from './actions';

class LmcTodosScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    renderHeader() {
        const { date } = this.state;
        const { toggleCreateModal } = this.props;

        return (
            <div>
                <div>
                    <h2 style={styles.title}>
                        Scheduled ToDo's
                        <GlyphButton
                            style={styles.button}
                            onClick={() => toggleCreateModal()}
                            glyph="plus"
                            color="success"
                            position="right">
                            Add ToDo
                        </GlyphButton>
                    </h2>
                </div>
                <div style={styles.dateSelectorContainer}>
                    <LmcSingleDateSelector date={date} onChange={this.onDateChange} />
                </div>
            </div>
        )
    }

    renderTasks() {
        const { tasksFetch, residentsFetch } = this.props;
        if (!tasksFetch || tasksFetch.pending || residentsFetch.pending) {
            return <LmcLoadingScreen />
        }
        if (tasksFetch.rejected) {
            console.log(tasksFetch)
            return <BlankState heading={tasksFetch.reason || 'Oops. Unable to load To-Do\'s...'} />
        }
        if (tasksFetch.value && (!tasksFetch.value.results || !tasksFetch.value.results.length)) {
            return <BlankState heading={'No To-Do\'s on this date'} />
        }

        return <LmcTaskList data={tasksFetch.value.results} residents={residentsFetch.value.results} />
    }

    onDateChange({ date }) {
        this.setState({ date });
        this.props.fetchDailyTasks(date);
    }

    componentDidMount() {
        const { date } = this.state;
        this.props.fetchDailyTasks(date);
    }

    render() {
        const {
            showCreateTodoModal,
            toggleCreateModal,
        } = this.props;

        if (showCreateTodoModal) {    
            return <LmcTaskCreateModal />
        }

        return (
            <div style={styles.container}>
                { this.renderHeader() }
                { this.renderTasks() }
            </div>
        );
    }
};

const styles = {
    container: {
        padding: '30px 30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 100,
        maxWidth: 980,
        minHeight: 600,
    },
    title: {
        // fontSize: 20,
        // opacity: 0.8,
    },
    button: {
        fontSize: 16,
        float: 'right',
    },
    dateSelectorContainer: {
        margin: '0 auto',
        paddingTop: 30,
        textAlign: 'center',
    }
};

const comp = refetch((props) => ({
    residentsFetch: `${Keystone.adminPath}/api/reports/residents`,
    fetchDailyTasks: (date) => {
        let url = `${Keystone.adminPath}/api/reports/tasks`;
        if (date) url += `?on=${date.toISOString()}`;
        return {
            tasksFetch: url
        }
    },
}))(LmcTodosScreen);

const mapStateToProps = (state) => ({
    showCreateTodoModal: state.modal.showCreateTodoModal,
});

const mapDispatchToProps = dispatch => ({
    toggleCreateModal: () => dispatch(toggleCreateTodoModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(comp);
