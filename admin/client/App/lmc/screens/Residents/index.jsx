import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions/actions'
import { LmcSpinner } from '../../components'
import List from '../../../../utils/List';
import CreateForm from '../../../shared/CreateForm'
import LmcResidentsSidebar from './components/LmcResidentsSidebar.jsx'

export class LmcResidentsScreen extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        currentList: null,
        showCreateModal: false,
        isModalOpen: true,
    }

    onOpenCreateResident = () => {
        this.setState({ 
            showCreateModal: true,
            currentList: new List(Keystone.lists['Resident']),
        });
    }

    onCloseCreateResident = () => {
        this.setState({ isModalOpen: false });
        setTimeout(() => {
            this.setState({ 
                showCreateModal: false, 
                isModalOpen: true 
            });
        });
    }

    onCreateResidentComplete = (resident) => {
        const { fetchResidents, setSelectedResident } = this.props
        this.onCloseCreateResident()
        fetchResidents()
        setSelectedResident(resident.id)
    }

    renderCreateForm = () => {
        const { showCreateModal, isModalOpen, currentList } = this.state;
        return (
            showCreateModal
                ? <div className="lmc-create-form">
                    <CreateForm
                        isOpen={isModalOpen}
                        list={currentList}
                        onCancel={() => this.onCloseCreateResident()}
                        formTitle="Create Resident"
                        onCreate={resident => this.onCreateResidentComplete(resident)}
                    />
                </div> : null
        );
    }

    
    render () {
        const { residents } = this.props;
        return (
            <div>
                { this.renderCreateForm() }
                { residents ? (
                    <LmcResidentsSidebar
                        residents={residents}
                        onCreate={this.onOpenCreateResident}
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchResidents: () => dispatch(ActionCreators.loadList('residents')),
        setSelectedResident: (id) => dispatch(ActionCreators.setSelectedResident(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentsScreen);