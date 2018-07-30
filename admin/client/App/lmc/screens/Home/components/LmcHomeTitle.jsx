import React from 'react';
import _ from 'lodash';
import LmcTour from './LmcTour.jsx';
import moment from 'moment';
import xhr from 'xhr';


class LmcHomeTitle extends React.Component {
    constructor(props) {
        super(props);
        this.renderHello = this.renderHello.bind(this);
    }
    componentDidMount() {
        if (!Keystone.user.firstLogin) {
            Keystone.user.firstLogin = moment(); // avoid it being triggered every time you log in.
            xhr({
                url: `${Keystone.adminPath}/api/reports/user/firstlogin`,
                method: 'POST',
                headers: Object.assign({}, Keystone.csrf.header),
            }, (err, resp) => {
                console.log(err, resp);
            });
        }
    }

    renderBirthdays(residents) {
        if (residents.length === 1) {
            const age = moment().diff(residents[0].dateOfBirth, 'years');
            return (
                <span>
                    don't forget to say happy birthday to <strong>{residents[0].name}</strong>! He's turning {age}!
                </span>
            )
        } else {
            const names = residents.reduce((prev, next, index) => {
                if (index === (residents.length - 1)) {
                    return `${prev} and ${next.name}`;
                } else if (prev !== '') {
                    return `${prev}, ${next.name}`;
                } else {
                    return next.name;
                }
            }, '');

            return (
                <span>
                    don't forget to say happy birthday to {names}!
                </span>
            )
        }
    }

    renderHello() {
        const homeName = _.get(this.props.home, '0.name');
        return (
           <span>
                welcome to the Care Office
                { homeName
                        ? <span> for <span style={styles.bold}>{ homeName }</span></span>
                        : null }!
           </span>
        )
    }
    render () {
        const { residents } = this.props;

        const birthdayBoysNGirls = _.sortBy(residents.filter(res => {
            return res.dateOfBirth && (moment(res.dateOfBirth).format('MM/DD') === moment().format('MM/DD'));
        }), 'name');

        const isNewHome = !Keystone.user.firstLogin
            || moment().diff(Keystone.user.firstLogin, 'days') < DAYS_UNTIL_TOUR_HIDDEN
            || (!residents || !residents.length);

        const user_name = Keystone.user.name && Keystone.user.name.split(' ').length > 1
            ? Keystone.user.name.split(' ')[0]
            : Keystone.user.name;

        return (
            <div style={styles.container}>
                <h2 style={styles.title}>
                    <span style={styles.bold}>
                        Hey { user_name }
                    </span>, {
                        birthdayBoysNGirls.length
                            ? this.renderBirthdays(birthdayBoysNGirls)
                            : this.renderHello()
                    }
                </h2>
                { isNewHome
                    ? <p>
                        This is where you manage your team, residents and the care provided in your home.​ To help you get started we’ve come up with a quick tour. This shouldn’t take more than a few minutes and at the end you’ll be a Rockstar when it comes to using it.​
                        <br/>
                        <LmcTour forceOpen={!Keystone.user.firstLogin}/>
                    </p>
                    : null
                }
            </div>
        );
    }
};

const styles = {
    container: {
        padding: 0,
    },
    title: {
        fontSize: 20,
        color: '#e65d79',
    },
    bold: {
        fontWeight: 'bold',
    }
}

const DAYS_UNTIL_TOUR_HIDDEN = 7;

export default LmcHomeTitle;
