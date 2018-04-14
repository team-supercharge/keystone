import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LmcTopTipsCard extends Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <div>
                <h2 style={{ marginTop: 0 }} className="lmc-card-title">
                    Top Tips
                </h2>
                <div className='videoWrapper'>
                    <iframe 
                        style={{ border: 'none' }} 
                        width="320" 
                        height="180" 
                        ref="iframe"
                        src="https://www.youtube.com/embed/6Z5FE0pjn5k" 
                        frameBorder="0" 
                        allowFullScreen="true">
                    </iframe>
                </div>
            </div>
        );
    }
}

LmcTopTipsCard.propTypes = {

};

export default LmcTopTipsCard;