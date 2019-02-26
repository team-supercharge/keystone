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
        const mobileLabel = <Octicon icon={getIconByName(item.octicon)} />
        return (isBrowser || isTablet) ? desktopLabel : mobileLabel
    }

    render () {
        const { items, resourceUrl } = this.props
        const baseUrl = `${Keystone.adminPath}/${resourceUrl}`
        const navbarStyles = (isBrowser || isTablet) ? styles.navbar : mobileStyles.navbar
        const listStyles = (isBrowser || isTablet) ? null : mobileStyles.list

        return (
            <nav className='secondary-navbar' style={navbarStyles}>
                <ul className="app-nav app-nav--secondary app-nav--left" style={listStyles}>
                    { items.map((item, index) => {
                        return this.isActive(item.url)
                            ? <li 
                                className='lmc-secondary-nav-link'
                                key={index}
                                style={{ ...styles.activeItem, ...styles.item }}
                            >
                                <Link 
                                    className='lmc-secondary-nav-link'
                                    to={`${baseUrl}/${item.url}`}
                                >
                                    {this.renderLabel(item)}
                                </Link>
                            </li>
                            : <li 
                                className='lmc-secondary-nav-link'
                                key={index}
                                style={styles.item}>
                                <Link
                                    className='lmc-secondary-nav-link'
                                    to={`${baseUrl}/${item.url}`}
                                >
                                    {this.renderLabel(item)}
                                </Link>
                            </li>
                    }) }
                </ul>
            </nav>
        )
    }
}

const styles = {
    activeItem: {
        borderBottom: '3px solid #e65d78',
    },
    item: {
        boxSizing: 'border-box',
        flex: '1',
        textAlign: 'center',
        padding: '7px 10px 9px 10px',
    },
    navbar: {
        height: '58px',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 50,
    },
}

const mobileStyles = {
    list: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    navbar: {
        height: '58px',
        backgroundColor: 'white',
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