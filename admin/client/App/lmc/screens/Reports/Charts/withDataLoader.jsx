import { connect } from 'react-refetch';
import React, { Component } from 'react';
import LmcLoadingScreen from '../../../components/LmcLoadingScreen.jsx';
import {
    Button,
    BlankState,
} from '../../../../elemental';
import _ from 'lodash';


export default function withDataLoader (WrappedComponent, { enableMockData, errorMessage, url }) {
    class LmcDataLoader extends Component {
        render () {
            const { dataFetch, triggerMockFetch, mockDataFetch } = this.props;

            if (dataFetch.pending || (mockDataFetch && mockDataFetch.pending)) {
                return <LmcLoadingScreen />;
            }

            if (dataFetch.fulfilled) {
                const results = dataFetch.value.results;
                if (enableMockData
                    && (_.isArray(results))
                    && !(results.length > 0)
                ) {
                    if (mockDataFetch && mockDataFetch.fulfilled) {
                        return <WrappedComponent data={mockDataFetch.value.results} {...this.props} />;
                    } else {
                        return (
                            <BlankState heading={'You haven\'t added any logs yet'} style={{ marginTop: 40 }} >
                                <Button onClick={() => triggerMockFetch()}>
                                    Show sample chart
                                </Button>
                            </BlankState>
                        );
                    }
                } else {
                    return <WrappedComponent data={dataFetch.value.results} {...this.props} />;
                }
            }

            if (dataFetch.rejected) {
                return <BlankState heading={dataFetch.reason || errorMessage || 'Oops.. Something went wrong'} style={styles.blankSlate} />;
            }

            return <BlankState heading={errorMessage || 'Oops.. Something went wrong'} style={styles.blankSlate} />;
        }
    }

    return connect((props) => ({
        dataFetch: url(props),
        triggerMockFetch: () => {
            return {
                mockDataFetch: `${url(props)}?mock=1`,
            };
        },
    }))(LmcDataLoader);
};

const styles = {
    blankSlate: {
        paddingTop: 40,
    },
};
