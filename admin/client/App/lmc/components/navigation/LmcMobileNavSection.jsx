import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

export default class LmcMobileNavSection extends Component {
    isActive = (url) => {
        const pathname = this.props.location.pathname
        if (pathname) {
            return pathname.match(url) ? true : false
        }
    }

	renderLists () {
        const { items, onClick } = this.props
		if (!items || !items.length) return null

		return items.map(item => {
			const url = `${Keystone.adminPath}/${item.path}`
            const className = this.isActive(item.path) 
                ? 'MobileNavigation__list-item is-active' 
                : 'MobileNavigation__list-item'

			return (
                <Link
                    className={className}
                    to={url}
                    onClick={onClick}
                    tabIndex="-1"
                >
                    {item.label}
                </Link>
			)
		})
    }
    
	render () {
        const { className, label, onClick, url } = this.props
		return (
			<div className={className}>
				<Link
					className="MobileNavigation__section-item"
					to={url}
					tabIndex="-1"
					onClick={onClick}
				>
					{label}
				</Link>
                <div className="MobileNavigation__lists">
				    { this.renderLists() }
                </div>
			</div>
		)
	}
}

LmcMobileNavSection.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    items: PropTypes.array,
}