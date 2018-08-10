import React from 'react';
import { Link } from 'react-router';

class SecondaryNav extends React.Component {
    constructor (props) {
        super(props);
        this.isActive = this.isActive.bind(this);
    };

    isActive (value) {
        const pathname = this.props.location.pathname;
        if (pathname) {
            return pathname.match(value) ? 'active' : '';
        }
    }

    render () {
        const { params } = this.props;
        let chartURL = `${Keystone.adminPath}/reports/charts`;
        if (params && params.resident_id && params.chart_type) {
            chartURL += `/${params.chart_type}/${params.resident_id}`;
        };

        return (
            <nav className="secondary-navbar" style={styles.nav}>
                <div style={styles.wrapper}>
                    <ul className="app-nav app-nav--secondary app-nav--left">
                        <li className={this.isActive('charts')}>
                            <Link to={chartURL}>
                                Resident Charts
                            </Link>
                        </li>
                        <li className={this.isActive('overview/fluids')}>
                            <Link to={`${Keystone.adminPath}/reports/overview/fluids`}>
                                Fluids Overview
                            </Link>
                        </li>
                        <li className={this.isActive('overview/meals')}>
                            <Link to={`${Keystone.adminPath}/reports/overview/meals`}>
                                Food Overview
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

export default SecondaryNav;
