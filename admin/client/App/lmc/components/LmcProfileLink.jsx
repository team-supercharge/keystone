
import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/actions';

export class LmcProfileLink extends Component {
    formatName = (name) => {
        let n = name.split(' ');
        n = (n.length > 1)
            ? `${ n[0] } ${ n[1][0] }`
            : name;
        if (n.length > 9) n = n.substr(0, 7) + '..';
        return n;
    }

    handleClick = (id) => {
        const { list, setSelectedResident, setSelectedUser} = this.props
        if (list === 'residents') {
            setSelectedResident(id)
        } 
        if (list === 'organisation') {
            setSelectedUser(id)
        }
    }

    render () {
        const { 
            picture, 
            name, 
            list, 
            id
        } = this.props

        return (
            <Link 
                key={id}
                to={`${Keystone.adminPath}/${list}`}
                onClick={() => this.handleClick(id)}
                alt={name}
                className="lmc-profile-link">
                <div className="lmc-profile-picture" style={{ background: `url(${picture || PLACEHOLDER_IMAGE})` }}></div>
                <p style={{ fontSize: 11, color: 'black', opacity: 0.5 }}>
                    { this.formatName(name) }
                </p>
            </Link>
        )
    } 
}

const PLACEHOLDER_IMAGE = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/profile_pic_placeholder.png';

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedResident: (id) => dispatch(ActionCreators.setSelectedResident(id)),
        setSelectedUser: (id) => dispatch(ActionCreators.setSelectedUser(id))
    }
}

export default connect(null, mapDispatchToProps)(LmcProfileLink);
