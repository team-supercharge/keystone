import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LmcAdvertCard extends Component {
    render() {
        const { url, image } = this.props;
        const defaultImage = 'https://s3.eu-west-2.amazonaws.com/lmc-marketing-public/home_page_advert__square.png';
        const defaultUrl = 'https://calendly.com/logmycare';
        return (
            <div>
                <h2 className="lmc-card-title">
                    { TITLE }
                </h2>
                <div className="lmc-card">
                    <a href={url || defaultUrl} target="_blank">
                        <img style={{ width: '100%' }} src={image || defaultImage} alt=""/>
                    </a>
                </div>
            </div>
        );
    }
}
const TITLE = 'What\'s on offer';
LmcAdvertCard.propTypes = {
    image: PropTypes.string,
    url: PropTypes.string,
};

export default LmcAdvertCard;
