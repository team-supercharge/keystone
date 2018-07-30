import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import LmcResidentListItem from '../../../components/LmcResidentListItem.jsx';


class LmcBirthdaysCard extends Component {
    constructor(props) {
        super(props);
        this.getBirthdays = this.getBirthdays.bind(this);
    }

    renderBirthdays(birthdays) {
        let data = birthdays.map(({ id, name, picture, nextBirthday, age }) => {
            let reminderText;
            if (nextBirthday === 0) {
                reminderText = 'today!';
            } else if (nextBirthday === 1) {
                reminderText = 'tomorrow';
            } else if (nextBirthday < 6) {
                reminderText = `this coming ${moment().add(nextBirthday, 'days').format('dddd')}`;
            } else {
                reminderText = `on ${moment().add(nextBirthday, 'days').format('dddd Do MMM')}`;
            };

            return {
                name: `${age} years old ${reminderText}`,
                subheading: `${name}`,
                id,
                picture,
            }
        });

        return (
            <div>
                <h2 className="lmc-card-title">
                    { TITLE }
                </h2>
                <div className="lmc-card">
                    <div className="lmc-card-body">
                        { data.map(resident => (
                            <LmcResidentListItem
                                key={resident.id}
                                data={resident}
                                link={d => `${Keystone.adminPath}/reports/charts/dashboard/${d}`} />
                        )) }
                    </div>
                </div>
            </div>
        )
    }

    getBirthdays(residents) {
        return _.chain(residents)
            .cloneDeep()
            .forEach(res => {
                const { age, nextBirthday } = this.daysUntil(res.dateOfBirth);
                res.age = age;
                res.nextBirthday = nextBirthday;
            })
            .sortBy('nextBirthday')
            .filter(({ nextBirthday }) => nextBirthday < 120)
            .take(6)
            .value();
    }

    daysUntil(date) {
        const birthday = moment(date);
        const today = moment().format('YYYY-MM-DD');
        const age = moment(today).diff(birthday, 'years');
        const nextBirthday = moment(birthday).add(age, 'years');

        if (nextBirthday.isSame(today)) {
            return {
                nextBirthday: nextBirthday.diff(today, 'days'),
                age
            }
        } else {
            /* add one more year in case the birthday has already passed
            to calculate date till next one. */
            return {
                nextBirthday: moment(birthday).add(age + 1, 'years').diff(today, 'days'),
                age: age + 1,
            }
        }
    }

    render() {
        const { residents } = this.props;
        const birthdays = this.getBirthdays(residents);
        console.log(residents, birthdays);
        return (
            <div>
                { birthdays && birthdays.length
                    ? this.renderBirthdays(birthdays)
                    : null }
            </div>
        );
    }
}

const styles = {
    title: {
        opacity: 0.8,
    },
    dot: {
        left: -20,
        top: -18,
        width: 42,
        height: 42,
        border: '3px solid rgba(0,0,0,0)',
        borderRadius: 24,
        backgroundColor: '#e4e4e4',
        alignItems: 'center',
    },
    iconStyle: {
        backgroundSize: '14px !important',
        backgroundPosition: 'center center !important',
    }
}

LmcBirthdaysCard.propTypes = {
    residents: PropTypes.array.isRequired,
};


const PROFILE_PLACEHOLDER = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';
const ROW_PLACEHOLDER = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092142/profile_row_placeholder.png';
const TITLE = 'Upcoming Birthdays';

export default LmcBirthdaysCard;
