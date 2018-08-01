import React from 'react';
import { Link } from 'react-router';

class LmcSecondaryNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'charts',
        };
        this.isActive = this.isActive.bind(this);
        this.setCurrent = this.setCurrent.bind(this);
    };

    setCurrent(current) {
        this.setState({ current });
    };

    isActive(value) {
        return this.state.current === value ? 'active' : '';
    }

    render () {
        return (
            <nav className="secondary-navbar" style={styles.nav}>
                <div style={styles.wrapper}>
                    <ul className="app-nav app-nav--secondary app-nav--left">
                        <li className={ this.isActive('charts') }>
                            <Link onClick={ () => this.setCurrent('daily') } to={`${Keystone.adminPath}/reports/charts`}>
                                Resident Charts
                            </Link>
                        </li>
                        <li className={ this.isActive('fluids') }>
                            <Link onClick={ () => this.setCurrent('daily') } to={`${Keystone.adminPath}/reports/overview/fluids`}>
                                Fluids Overview
                            </Link>
                        </li>
                        {/* <li className={ this.isActive('item-dashboard') }>
                            <Link onClick={ () => this.setCurrent('item-dashboard') } to={`${Keystone.adminPath}/reports/item-dashboard`}>
                                Item Dashboard
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </nav>
        );
    };
};

const styles = {
    nav: {
        height: 41
    },
    wrapper: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: 1170
    }
}

export default LmcSecondaryNav;
