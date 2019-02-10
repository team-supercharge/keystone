import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActionCreators } from '../../actions/actions'
import { connect } from 'react-redux'

class LmcResidentsScreen extends Component {
    render() {
        return (
            <div>  
            </div>
        );
    }
}

LmcResidentsScreen.propTypes = {
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        residents: state.data.residents,
        selectedResident: state.residents.selectedResident
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (lists) => dispatch(ActionCreators.initialize()),
        setSelectedResident: (id) => dispatch(ActionCreators.setSelectedResident(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentsScreen);