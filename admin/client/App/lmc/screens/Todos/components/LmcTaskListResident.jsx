import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import _ from 'lodash';

const PLACEHOLDER_IMAGE = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';

class LmcTaskListResident extends Component {
    render() {
        const { task } = this.props;
        const img_src = _.get(task, 'resident.picture.url') || PLACEHOLDER_IMAGE;
        return (
            <div className={css(classes.resident)}>
                <img src={img_src} alt="resident-profile-pic" className={css(classes.profilePic)}/>
                <span className={css(classes.residentName)}>
                    { task.resident.name.first } { task.resident.name.last }
                    / - { task.status }
                </span>
                
            </div>
        );
    }
}

LmcTaskListResident.propTypes = {
    task: PropTypes.object,
};

const classes = StyleSheet.create({
        resident: {

        },
        residentName: {
            opacity: 0.6,
            fontSize: 15,
            lineHeight: '28px',
            letterSpacing: 0.1,
            padding: 7,
        },
        profilePic: {
            borderRadius: 40,
            height: 27,
            width: 27,
            verticalAlign: 'top',
        }
});

export default LmcTaskListResident;
