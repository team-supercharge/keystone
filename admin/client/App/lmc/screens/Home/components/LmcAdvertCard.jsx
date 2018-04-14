import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LmcAdvertCard extends Component {
    render() {
        return (
            <div style={{ width: '100%', paddingTop: 40 }}>
                <img style={{ width: '100%' }} src="https://s3.eu-west-2.amazonaws.com/lmc-marketing-public/home_page_advert.png" alt=""/>
            </div>
        );
    }
}

LmcAdvertCard.propTypes = {

};

export default LmcAdvertCard;