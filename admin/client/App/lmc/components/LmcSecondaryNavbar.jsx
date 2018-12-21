


import React from "react";
// import PropTypes from 'PropTypes';
import { css, StyleSheet } from 'aphrodite/no-important';
import { Link } from 'react-router';

class LmcSecondaryNavbar extends React.Component {

    isActive (value) {
        const pathname = this.props.location.pathname;
        if (pathname) {
            return pathname.match(value) ? 'active' : '';
        }
    }

    render() {
        const { tabs } = this.props;
        const Tabs = tabs.map(tab => (
            <li className={this.isActive(tab.path)}>
                <Link to={`${Keystone.adminPath}/${tab.path}`}>
                    {tab.label}
                </Link>
            </li>
        ));

        return (
            <nav style={{ height: 41 }} className='secondary-navbar'>
                <div className={css(classes.wrapper)} >
                    <ul className="app-nav app-nav--secondary app-nav--left">
                        { Tabs }
                    </ul>
                </div>
            </nav>
        );
    }
}

// LmcSecondaryNavbar.propTypes = {
//     tabs: propTypes:
// }

const classes = StyleSheet.create({
    container: {
        padding: '0.1em 0 0',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 1270,
    },
    nav: {
        height: 41,
    },
    wrapper: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: 1170,
    },
});

export default LmcSecondaryNavbar;
