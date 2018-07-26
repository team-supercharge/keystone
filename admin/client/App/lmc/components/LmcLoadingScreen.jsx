import React, { Component } from 'react';
import Spinner from '../../elemental/Spinner';

class LmcLoadingScreen extends Component {
    render() {
        return (
            <div style={styles.container}>
                <Spinner />
            </div>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        textAlign: 'center',
        paddingTop: 100,
        color: '#b7b7b7',
    }
}

export default LmcLoadingScreen;
