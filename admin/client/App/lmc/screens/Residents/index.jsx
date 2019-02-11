import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { LmcSpinner } from '../../components'
import LmcResidentsSidebar from './components/LmcResidentsSidebar.jsx'

export class LmcResidentsScreen extends Component {
    constructor(props) {
        super(props)
    }
    
    render () {
        const { residents } = this.props;
        return (
            <div>
                { this.props.residents ? (
                    <LmcResidentsSidebar
                        residents={residents}
                    />
                ) : <LmcSpinner /> }
            </div>
        );
    }
}

LmcResidentsScreen.propTypes = {
    residents: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        residents: state.data.residents,
    };
};

export default connect(mapStateToProps)(LmcResidentsScreen);