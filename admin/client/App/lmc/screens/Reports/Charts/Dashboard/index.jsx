import React from 'react';
import { Link } from 'react-router';

class LmcChartsDashboard extends React.Component {
    render () {
        const { params } = this.props;
        return (
            <div>
                LmcChartsDashboard
                <Link to={`${Keystone.adminPath}/reports/charts/daily/${params.resident_id}`} style={styles.link}>
                    Daily
				</Link>
            </div>
        );
    }
}

const styles = {
    link: {

    }
}

export default LmcChartsDashboard;
