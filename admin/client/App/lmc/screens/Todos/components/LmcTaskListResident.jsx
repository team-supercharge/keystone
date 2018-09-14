import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import _ from 'lodash';
import { colors, images } from '../../../common/constants';


class LmcTaskListResident extends Component {
    render() {
        const { task, resident, index, total } = this.props;
        const img_src = resident.picture || images.profile_placeholder;
        const list_image = ((index + 1) === total)
            ? images.list_bullet_last
            : images.list_bullet;

        return (
            <div className={css(classes.resident)}>
                <img className={css(classes.listImg)} src={list_image} />
                <img className={css(classes.profilePic)} src={img_src} />
                {/* <div className={css(classes.profilePic)} style={{ background: `url(${img_src})` }}></div> */}
                <span className={css(classes.residentName)}>
                    { task.resident.name.first } { task.resident.name.last }
                    {/* / - { task.status } */}
                    
                </span>
                { task.status === 'completed'
                    ? <img src={images.green_tick} className={css(classes.tickImg)} />
                    : null }
            </div>
        );
    }
}

LmcTaskListResident.propTypes = {
    task: PropTypes.object,
    resident: PropTypes.object,
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
        listImg: {
            float: 'left',
            marginRight: 10,
            marginLeft: 20,
            height: 28,
            width: 30,
        },
        tickImg: {
            height: 15,
            width: 15,
            marginLeft: 5,
            marginBottom: 2,
        },
        profilePic: {
            float: 'left',
            borderRadius: 40,
            overflow: 'hidden',
            // backgroundColor: '#f1f1f1',
            height: 27,
            width: 27,
            verticalAlign: 'top',
        }
});

export default LmcTaskListResident;
