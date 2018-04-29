import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LmcAdvertCard extends Component {
    render() {
        const { url, image } = this.props;
        const defaultImage = 'https://s3.eu-west-2.amazonaws.com/lmc-marketing-public/home_page_advert__square.png';
        const defaultUrl = 'https://calendly.com/logmycare';
        return (
            <div style={{ width: '100%', paddingTop: 40 }}>
                <h2 style={{ marginTop: 0 }} className="lmc-card-title">
                    What's on offer
                </h2>
                <a href={url || defaultUrl} target="_blank">
                <img style={{ width: '100%' }} src={image || defaultImage} alt=""/>
                </a>
                
            </div>
        );
    }
}

LmcAdvertCard.propTypes = {

};

export default LmcAdvertCard;