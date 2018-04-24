import React from 'react';
import _ from 'lodash';

class LmcHomeTitle extends React.Component {
    render () {
        const { home, residents } = this.props;
        const isNewHome = home && (!residents || !residents.length);
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
                { isNewHome ? 
                    <p>
                        This is where you can set up your Residents, manage their To-Do’s and invite your team to download the Carer App.
                        Once set up from here, the information will be shown in the app and your carers can start logging care. 
                        
                        To get started for the first time, you need to start adding your care team...
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

export default LmcHomeTitle;
