import { connect } from 'react-refetch';
import React, { Component } from 'react';
import LmcPdfExport from '../../../components/LmcPdfExport.jsx';
import {
    GlyphButton,
    BlankState
} from '../../../../elemental';
import { Link } from 'react-router';


const BackButton = ({ params }) => {
    return (<GlyphButton
        component={Link}
        glyph="chevron-left"
        position="left"
        to={`${Keystone.adminPath}/reports/charts/dashboard/${params.resident_id}`}
        variant="link">
        Dashboard
    </GlyphButton>);
};

export default function withMockData(WrappedComponent, config) {

    class MockDataWrapper extends Component {
        render() {
            const { mockDataFetch } = this.props;

            if (mockDataFetch.fulfilled && mockDataFetch.value.results) {
                return (
                    <div>
                        <div className="Toolbar">
                            <BackButton params={this.props.params} />
                            {mockDataFetch.fulfilled
                                ? <LmcPdfExport logs={mockDataFetch.value.results} resident={this.props.resident} {...config.pdfExport} />
                                : null}
                        </div>
                        <WrappedComponent logs={mockDataFetch.value.results} />
                    </div>
                );
            }

            if (mockDataFetch.pending) {
                return (
                    <p>loading...</p>
                );
            }

            return (
                <p>error?</p>
            )
        }
    };

    return connect(({ params }) => ({
        mockDataFetch: `${Keystone.adminPath}/api/reports/charts/${params.chart_type}/${params.resident_id}?mock=1`,
    }))(MockDataWrapper);
};