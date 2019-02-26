import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isBrowser, isTablet } from 'react-device-detect'
import { GlyphButton } from '../../../elemental'
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
        const { sections } = this.props
        if (!this.state.menuIsVisible) return null

        return (
            <LmcMobileNavMenu
                sections={sections}
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
                    { this.renderMenu() }
                </div>
            </div>
        )
    }    
}

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
        textAlign: 'center',
    },
    logoContainer: {
        position: 'relative',
        top: 6,
    }
}

LmcMobileNavigation.propTypes = {
    sections: PropTypes.array.isRequired
}