import React from 'react';
import { Link } from 'react-router';


class LmcAdminReportView extends React.Component {

    constructor (props) {
        super(props);
        this.renderNav = this.renderNav.bind(this);
        this.isActive = this.isActive.bind(this);
    };

    componentWillMount () {
		// When we directly navigate to a list without coming from another client
		// side routed page before, we need to initialize the list and parse
		// possibly specified query parameters
        // this.props.dispatch(function selectList () {
        //     return (dispatch, getState) => {
        //         dispatch({
        //             type: 'SELECT_LIST',
        //             id: 'reports',
        //         });
        //     };
        // });
    }

    isActive (value) {
        const pathname = this.props.location.pathname;
        if (pathname) {
            return pathname.match(value) ? 'active' : '';
        }
    }

    renderNav () {    
        return (
            <nav className="secondary-navbar" style={styles.nav}>
                <div style={styles.wrapper}>
                    <ul className="app-nav app-nav--secondary app-nav--left">
                        <li className={this.isActive('admin-reports/dashboard')}>
                            <Link to={`${Keystone.adminPath}/admin-reports/dashboard`}>
                                Dashboard
                            </Link>
                        </li>
                        <li className={this.isActive('admin-reports/home')}>
                            <Link to={`${Keystone.adminPath}/admin-reports/home`}>
                                By Home
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    };

    render () {
        return (
            <div>
                { this.renderNav() }
                <div style={styles.container}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

const styles = {
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
};

export default LmcAdminReportView