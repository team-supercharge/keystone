import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LmcAdvertCard extends Component {
    render () {
        const { url, image } = this.props;
        const defaultImage = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/careoffice-home-screen-advert.png';
        const defaultUrl = 'https://calendly.com/logmycare';
        return (
            <div >
                <h2 className="lmc-card-title" >
                    { TITLE }
                </h2>
                <div className="lmc-card" style={styles.container}>
                    <a href={url || defaultUrl} target="_blank">
                        <img style={{ width: '102%' }} src={image || defaultImage} alt=""/>
                    </a>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        overflow: 'hidden',
        justifyContent: 'center'
    }
}
const TITLE = 'What\'s on offer';
LmcAdvertCard.propTypes = {
    image: PropTypes.string,
    url: PropTypes.string,
};

export default LmcAdvertCard;
