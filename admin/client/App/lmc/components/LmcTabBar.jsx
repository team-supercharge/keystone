import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isBrowser, isTablet } from 'react-device-detect'
import Octicon, { getIconByName } from '@githubprimer/octicons-react'
import { Link } from 'react-router'

export class LmcTabBar extends Component {
    isActive = (url) => {
        const pathname = this.props.location.pathname
        if (pathname) {
            return pathname.match(url) ? true : false
        }
    }

    renderLabel = (item) => {
        const desktopLabel = item.label
        let mobileLabel
        if (item.octicon) {
            mobileLabel = <Octicon icon={getIconByName(item.octicon)} />
        } else if (item.mobileLabel) {
            mobileLabel = item.mobileLabel
        }
        return (isBrowser || isTablet) ? desktopLabel : mobileLabel
    }

    renderItems () {
        const { items, resourceUrl } = this.props
        const baseUrl = `${Keystone.adminPath}/${resourceUrl}`
        const styles = (isBrowser || isTablet) ? desktopStyles : mobileStyles

        return items.map((item, index) => {
            const activeStyles = this.isActive(item.url) ? desktopStyles.activeItem : null
            return (
                <li 
                    className='lmc-secondary-nav-link'
                    key={index}
                    style={{ ...activeStyles, ...styles.item }}
                >
                    <Link 
                        className='lmc-secondary-nav-link'
                        to={`${baseUrl}/${item.url}`}
                    >
                        {this.renderLabel(item)}
                    </Link>
                </li>
            )
        })
    }

    render () {
        const styles = (isBrowser || isTablet) ? desktopStyles : mobileStyles
        return (
            <div style={styles.backgroundContainer}>
                <nav 
                    className='secondary-navbar' 
                    style={styles.navbar}
                >
                    <ul 
                        className="app-nav app-nav--secondary app-nav--left" 
                        style={styles.list}
                    >
                        { this.renderItems() }
                    </ul>
                </nav>
            </div>
        )
    }
}

const desktopStyles = {
    activeItem: {
        borderBottom: '3px solid #e65d78',
    },
    item: {
        boxSizing: 'border-box',
        flex: '1',
        textAlign: 'center',
    },
    navbar: {
        height: 41.5,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 50,
    },
}

const mobileStyles = {
    backgroundContainer: {
        height: 40,
        width: '100%',
    },
    item: {
        boxSizing: 'border-box',
        flex: '1',
        textAlign: 'center',
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    navbar: {
        height: 40,
        backgroundColor: 'white',
        position: 'fixed',
        width: '100%',
        zIndex: 2
    }
}

LmcTabBar.propTypes = {
    resourceUrl: PropTypes.string,
    items: PropTypes.array
}

LmcTabBar.defaultProps = {
    resourceUrl: 'residents',
    items: [{ label: 'Profile', url: 'profile', octicon: 'file' }],
}

const mapStateToProps = (state) => {
    return {
        selectedResident: state.residents.selectedResident,
    }
}

export default connect(mapStateToProps)(LmcTabBar)