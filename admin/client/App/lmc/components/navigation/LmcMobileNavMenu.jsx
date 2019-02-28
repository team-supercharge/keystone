import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LmcMobileNavSection from './LmcMobileNavSection.jsx'

export default class LmcMobileNavMenu extends Component {
    isActive = (url) => {
        const pathname = this.props.location.pathname
        if (!url) {
            return pathname === `${Keystone.adminPath}/` ? true : false
        }
        if (pathname && url) {
            return pathname.match(url) ? true : false
        }
    }

    render () {
        const { sections, toggleMenu, location } = this.props
        if (!sections || !sections.length) return null

        return (
            <nav className="MobileNavigation__menu">
                <div className="MobileNavigation__sections">
                    { sections.map((section, i) => {
                        const url = `${Keystone.adminPath}/${section.path}`
                        const className = this.isActive(section.path) 
                            ? 'MobileNavigation__section is-active' 
                            : 'MobileNavigation__section'

                        return (
                            <LmcMobileNavSection
                                key={i}
                                className={className}
                                url={url}
                                items={section.items}
                                label={section.label}
                                location={location}
                                onClick={toggleMenu}
                            />
                        )
                    }) }
                </div>
            </nav>
        )
    }
}

LmcMobileNavMenu.propTypes = {
    location: PropTypes.object.isRequired,
    sections: PropTypes.array.isRequired
}