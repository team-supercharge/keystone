import React from 'react';
import _ from 'lodash';
import LmcTour from './LmcTour.jsx';
import moment from 'moment';
import xhr from 'xhr';


class LmcHomeTitle extends React.Component {
    componentDidMount() {
        if (!Keystone.user.firstLogin) {
            xhr({
                url: `${Keystone.adminPath}/api/reports/user/firstlogin`,
                method: 'POST',
                headers: Object.assign({}, Keystone.csrf.header)
            }, (err, resp) => {
                console.log(err, resp);
            });
        }
    }
    render () {
        const { home, residents } = this.props;

        const isNewHome = !Keystone.user.firstLogin
            || moment().diff(Keystone.user.firstLogin, 'days') < DAYS_UNTIL_TOUR_HIDDEN
            || (!residents || !residents.length);
        const user_name = Keystone.user.name && Keystone.user.name.split(' ').length > 1
            ? Keystone.user.name.split(' ')[0]
            : Keystone.user.name;

        const homeName = _.get(home, '0.name');

        return (
            <div style={styles.container}>
                <h2 style={styles.title}>
                    Hey 
                    <span style={styles.bold}> { user_name }</span>
                    , welcome to the Care Office
                    { homeName
                            ? <span> for <span style={styles.bold}>{ homeName }</span></span>
                            : null }!
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
