import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import LmcResidentListItem from '../../../components/LmcResidentListItem.jsx';


class LmcBirthdaysCard extends Component {
    constructor (props) {
        super(props);
        this.getBirthdays = this.getBirthdays.bind(this);
    }

    renderBirthdays (birthdays) {
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
            };
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
                                link={d => `${Keystone.adminPath}/residents/${d}`} />
                        )) }
                    </div>
                </div>
            </div>
        );
    }

    getBirthdays (residents) {
        return _.chain(residents)
            .filter({ status: 'active' })
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

    daysUntil (date) {
        const birthday = moment(date);
        const today = moment().format('YYYY-MM-DD');
        const age = moment(today).diff(birthday, 'years');
        const nextBirthday = moment(birthday).add(age, 'years');

        if (nextBirthday.isSame(today)) {
            return {
                nextBirthday: nextBirthday.diff(today, 'days'),
                age,
            };
        } else {
            /* add one more year in case the birthday has already passed
            to calculate date till next one. */
            return {
                nextBirthday: moment(birthday).add(age + 1, 'years').diff(today, 'days'),
                age: age + 1,
            };
        }
    }

    render () {
        const { residents } = this.props;
        const birthdays = this.getBirthdays(residents);
        return (
            <div>
                { birthdays && birthdays.length
                    ? this.renderBirthdays(birthdays)
                    : null }
            </div>
        );
    }
}

LmcBirthdaysCard.propTypes = {
    residents: PropTypes.array.isRequired,
};

const TITLE = 'Birthdays';

export default LmcBirthdaysCard;
