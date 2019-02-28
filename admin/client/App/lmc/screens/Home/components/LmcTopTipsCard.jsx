import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LmcTopTipsCard extends Component {
    shouldComponentUpdate () {
        return false;
    }
    render () {
        const { video } = this.props;
        const defaultVideo = 'https://www.youtube.com/embed/sYB5GpaU6RE?rel=0&amp;controls=1&amp;showinfo=0';
        return (
            <div>
                <h2 className="lmc-card-title">
                    { TITLE }
                </h2>
                <div className="lmc-card" style={styles.card}>
                    {/* <div className="lmc-card-body"> */}
                        <div className="videoWrapper">
                            <iframe
                                style={styles.video}
                                ref="iframe"
                                src={video || defaultVideo}
                                frameBorder="0"
                                allowFullScreen />
                        </div>
                    {/* </div> */}
                    
                </div>
            </div>
            // <div>
            //     <h2 style={{ marginTop: 0 }} className="lmc-card-title">
            //         Top Tips
            //     </h2>
            // </div>
        );
    }
}
const styles = {
    card: {
        minHeight: 258,
        maxHeight: 260,
        borderRadius: 5,
        overflow: 'hidden',
    },
    video: {
        border: 'none', 
        maxHeight: 260
    }
};

const TITLE = 'Top Tips';

LmcTopTipsCard.propTypes = {
    video: PropTypes.string.isRequired,
};

export default LmcTopTipsCard;
