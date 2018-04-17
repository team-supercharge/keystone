import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LmcAdvertCard extends Component {
    render() {
        return (
            <div style={{ width: '100%', paddingTop: 40 }}>
                <h2 style={{ marginTop: 0 }} className="lmc-card-title">
                    What's on offer
                </h2>
                <a href="https://calendly.com/logmycare" target="_blank">
                <img style={{ width: '100%' }} src="https://s3.eu-west-2.amazonaws.com/lmc-marketing-public/home_page_advert.png" alt=""/>
                </a>
                
            </div>
        );
    }
}

LmcAdvertCard.propTypes = {

};

export default LmcAdvertCard;