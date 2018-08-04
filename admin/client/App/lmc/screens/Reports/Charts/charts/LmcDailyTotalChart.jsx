import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import LmcDailyTotalTable from './LmcDailyTotalTable.jsx';
import LmcLogFilter from '../../../../components/LmcLogFilter.jsx';


class LmcDailyTotalChart extends Component {

    constructor (props) {
        super(props);
        this.state = this.getDefaultState();
        this.setDates = this.setDates.bind(this);
    }

    getDefaultState () {
        return {
            to: moment(),
            from: moment().subtract(21, 'days').startOf('day'),
        };
    }

    setDates ({ startDate, endDate }) {
        if (startDate && endDate) {
            this.setState({
                to: moment(endDate).endOf('day'),
                from: moment(startDate).startOf('day'),
            });
        } else if (!endDate && !startDate) {
            this.setState(this.getDefaultState());
        }
    }

    render () {
        const { type, link, title } = this.props;
        const { to, from } = this.state;
        return (
            <div style={styles.container}>
                <div>
                    <h2 style={styles.title}>
                        { title }
                    </h2>
                </div>
                <div style={styles.dateRange}>
                    <LmcLogFilter to={to} from={from} maximumNights={28} blockFuture onNewDates={this.setDates}/>
                </div>
                <LmcDailyTotalTable to={to} from={from} type={type} link={link} />
            </div>
        );
    }
}

const styles = {
    container: {
        padding: '60px 40px',
    },
    title: {
        textAlign: 'center',
        color: '#999',
    },
    dateRange: {
        paddingBottom: 30,
        textAlign: 'center',
    },
};

LmcDailyTotalChart.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default LmcDailyTotalChart;
