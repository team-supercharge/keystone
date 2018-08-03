import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import LmcOverviewTable from './LmcOverviewTable.jsx';
import LmcLogFilter from '../../../../components/LmcLogFilter.jsx';


class LmcFluidsOverview extends Component {

    constructor (props) {
        super(props);
        this.state = this.getDefaultState();
        this.setDates = this.setDates.bind(this);
    }

    getDefaultState () {
        return {
            to: moment(),
            from: moment().subtract(27, 'days').startOf('day'),
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
        const { to, from } = this.state;
        return (
            <div style={styles.container}>
                <div>
                    <h2 style={styles.title}>
                        Fluids Consumed (ml)
                    </h2>
                </div>
                <div style={styles.dateRange}>
                    <LmcLogFilter to={to} from={from} maximumNights={28} blockFuture onNewDates={this.setDates}/>
                </div>
                <LmcOverviewTable to={to} from={from} />
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

LmcFluidsOverview.propTypes = {

};

export default LmcFluidsOverview;
