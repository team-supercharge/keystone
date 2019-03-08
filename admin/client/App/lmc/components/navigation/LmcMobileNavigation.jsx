import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isBrowser, isTablet } from 'react-device-detect'
import { GlyphButton } from '../../../elemental'
import { Link } from 'react-router'
import Transition from 'react-addons-css-transition-group'
import LmcMobileNavMenu from './LmcMobileNavMenu.jsx'

export default class LmcMobileNavigation extends Component {
    state = {
        menuIsVisible: false
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            menuIsVisible: !prevState.menuIsVisible
        }))
    }

    renderMenu () {
        if (!this.state.menuIsVisible) return null
        return (
            <LmcMobileNavMenu
                location={this.props.location}
                sections={NAV_SECTIONS}
                toggleMenu={this.toggleMenu}
            />
        )
    }

    render () {
        if (isBrowser || isTablet) return null
        const icon = this.state.menuIsVisible ? 'x' : 'three-bars'
        const lmcLogo = `${Keystone.adminPath}/images/lmc-logo-white.svg`

        return (
            <div style={styles.backgroundContainer}>
                <div 
                    className='lmc-theme-gradient' 
                    style={styles.container}
                >
                    <GlyphButton
                        className='lmc-mobile-nav-button'
                        glyph={icon}
                        glyphSize='small'
                        onClick={this.toggleMenu}
                    />
                    <span style={styles.logoContainer}>
                        <img 
                            src={lmcLogo} 
                            width={100}
                            alt="Log my Care" 
                        />
                    </span>
                    <GlyphButton
                        className='lmc-mobile-sign-out-button'
                        glyph='sign-out'
                        glyphSize='small'
                        onClick={() => window.location = `${Keystone.adminPath}/signout`}
                    />
                </div>
                <Transition
                    transitionName="MobileNavigation__menu"
                    transitionEnterTimeout={260}
                    transitionLeaveTimeout={200}
                >
                    { this.renderMenu() }
                </Transition>
            </div>
        )
    }    
}

const NAV_SECTIONS = [
    {
        label: 'Dashboard',
        path: '',
        items: []
    },
    { 
        label: 'Team', 
        path: 'organisation', 
        items: []
    },
    {
        label: 'Residents',
        path: 'residents',
        items: []
    },
    {
        label: 'Logs',
        path: 'logs',
        items: [
            { label: 'Revisions', path: 'log-revisions' },
        ],
    },
    {
        label: 'To-Dos',
        path: 'tasks',
        items: [
            { label: 'All Scheduled', path: 'tasks?filters=%5B%7B%22path%22%3A%22status%22%2C%22inverted%22%3Afalse%2C%22value%22%3A%5B%22pending%22%5D%7D%5D' },
            { label: 'Completed', path: 'tasks?filters=%5B%7B%22path%22%3A%22status%22%2C%22inverted%22%3Afalse%2C%22value%22%3A%5B%22completed%22%2C%22skipped%22%5D%7D%5D' },
            { label: 'Recurring', path: 'recurring-tasks' }
        ]
    }
]

const styles = {
    backgroundContainer: {
        height: 40,
        width: '100%',
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
    container: {
        height: 40,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 10,
        textAlign: 'center'
    },
    logoContainer: {
        position: 'relative',
        top: 6,
    },
}

LmcMobileNavigation.propTypes = {
    location: PropTypes.object.isRequired
}