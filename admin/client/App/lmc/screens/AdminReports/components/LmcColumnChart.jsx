import React from 'react';
import _ from 'lodash';
import { connect } from 'react-refetch';
import moment from 'moment';
// import LmcHighcharts from '../Reports/Charts/charts/LmcHighcharts.jsx';
const ReactHighcharts = require('react-highcharts');

class LmcColumnChart extends React.Component {
    getChartConfig(props) {
        const {
            series,
            title,
            height,
        } = props;

        const oneDay = 3600 * 1000 * 24;
        return {
            chart: {
                type: 'area',
                backgroundColor: 'none',
                borderWidth: 0,
                height: height || 300,
            },
            credits: {
                enabled: false,
            },
            title: {
                text: title,
            },
            xAxis: {
                type: 'datetime',
                // ceiling: Date.parse(moment().toString()),
                // minPadding: 0.07,
                // maxPadding: 0.07,
                // minTickInterval: 5 * oneDay,
                labels: {
                    format: '{value:%e %b}',
                },
                title: {
                    style: {
                        fontSize: '15px',
                        fontWeight: 'bold',
                    },
                    text: 'Date',
                },
            },
            yAxis: {
                min: 0,
                // allowDecimals: yAllowDecimals,
                title: {
                    text: 'Count',
                    style: {
                        fontSize: '15px',
                        fontWeight: 'bold',
                    },
                },
            },
            plotOptions: {
                column: {
                    borderWidth: 0,
                    // maxPointWidth: 50,
                    // minPointWidth: 0.5,
                    // pointWodth: oneDay,
                    stacking: 'normal',
                    pointRange: oneDay,
                    pointPadding: 0,
                },
            },
            legend: {
                enabled: false,
            },
            series,
        };
    }

    render () {
        const config = this.getChartConfig(this.props);
        return (
            <div className="row" style={styles.mainContainer}>
                <ReactHighcharts config={config} />
            </div>
        );
    }
}

LmcColumnChart.propTypes = {

};

const styles = {
    mainContainer: {

    },
};

export default LmcColumnChart;
