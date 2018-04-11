import React from 'react';


class LmcHomeTitle extends React.Component {
    render () {
        const { home } = this.props;
        return (
            <div style={styles.container}>
                <h2 style={styles.title}>
                    Hey 
                    <span style={styles.bold}> {Keystone.user.name}</span>
                    , welcome to the Care Office
                    {
                        home && home.name ?
                            <span> for <span style={styles.bold}>{ home.name }</span></span> 
                            : null
                    }
                    !
                </h2>
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
