import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'

export class LmcTabBar extends Component {
    constructor (props) {
        super(props);
    }

    isActive = (url) => {
        const pathname = this.props.location.pathname
        if (pathname) {
            return pathname.match(url) ? true : false
        }
    }
    
    render () {
        const { items, resourceUrl } = this.props
        const baseUrl = `${Keystone.adminPath}/${resourceUrl}`

        return (
            <nav className='secondary-navbar' style={styles.navbar}>
                <div style={styles.wrapper}>
                    <ul className="app-nav app-nav--secondary app-nav--left">
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
                                        {item.label}
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
                                        {item.label}
                                    </Link>
                                </li>
                        }) }
                    </ul>
                </div>
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
    wrapper: {
        display: 'flex',
    }
}

LmcTabBar.propTypes = {
    resourceUrl: PropTypes.string,
    items: PropTypes.array
}

LmcTabBar.defaultProps = {
    resourceUrl: 'residents',
    items: [{ label: 'Profile', url: 'profile' }],
}

const mapStateToProps = (state) => {
    return {
        selectedResident: state.residents.selectedResident,
    }
}

export default connect(mapStateToProps)(LmcTabBar)