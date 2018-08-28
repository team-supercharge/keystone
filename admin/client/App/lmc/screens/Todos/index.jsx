import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import {
    LmcSingleDateSelector,
    LmcTaskList,
} from './components';
import LmcLoadingScreen from '../../components/LmcLoadingScreen.jsx';
import {
    GlyphButton,
    BlankState,
} from '../../../elemental';
import moment from 'moment';


class LmcTodosView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment(),
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    openCreateModal() {
        console.log("openCreateModal");
    }

    renderHeader() {
        const { date } = this.state;
        return (
            <div>
                <div>
                    <span style={styles.title}>
                        Scheduled ToDo's
                    </span>
                    <GlyphButton
                        style={styles.button}
                        onClick={this.openCreateModal}
                        glyph="plus"
                        position="right">
                        Add ToDo
                    </GlyphButton>
                </div>
                
                <div style={styles.dateSelectorContainer}>
                    <LmcSingleDateSelector date={date} onChange={this.onDateChange} />
                </div>
            </div>
        )
    }

    renderTasks() {
        const { tasksFetch } = this.props;
        if (tasksFetch.pending) {
            return <LmcLoadingScreen />
        }
        if (tasksFetch.rejected) {
            console.log(tasksFetch.reason)
            return <BlankState heading={tasksFetch.reason || 'Oops. Unable to load tasks...'} />
        }
        if (tasksFetch.value && (!tasksFetch.value.results || !tasksFetch.value.results.length)) {
            return <BlankState heading={'No tasks on this date'} />
        }

        return <LmcTaskList data={tasksFetch.value.results} />
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
        const { tasksFetch } = this.props;
        if (!tasksFetch) {
            return <LmcLoadingScreen />
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
        padding: '20px 30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        // maxWidth: 1070,
        maxWidth: 1180,
    },
    title: {
        fontSize: 20,
        opacity: 0.8,
    },
    button: {
        float: 'right',
    },
    dateSelectorContainer: {
        margin: '0 auto',
        padding: 30,
        textAlign: 'center',
    }
};



export default connect((props) => ({
    fetchDailyTasks: (date) => {
        let url = `${Keystone.adminPath}/api/reports/tasks`;
        if (date) url += `?on=${date.format()}`;
        return {
            tasksFetch: url
        }
    },
}))(LmcTodosView);