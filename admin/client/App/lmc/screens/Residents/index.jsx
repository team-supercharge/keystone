import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions/actions'
import { selectList } from '../../../screens/List/actions'
import { LmcSpinner } from '../../components'
import { BlankState } from '../../../elemental'
import List from '../../../../utils/List'
import CreateForm from '../../../shared/CreateForm'
import LmcResidentsSidebar from './components/LmcResidentsSidebar.jsx'
import LmcTabBar from '../../components/LmcTabBar.jsx'

export class LmcResidentsScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount () {
        this.props.selectList()
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
        })
    }

    onCloseCreateResident = () => {
        this.setState({ isModalOpen: false });
        setTimeout(() => {
            this.setState({ 
                showCreateModal: false, 
                isModalOpen: true 
            })
        })
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
        )
    }
    
    render () {
        const { residents, children, location } = this.props;
        return (
            <div>
                { this.renderCreateForm() }
                { residents ? (
                    <div style={styles.mainContainer}>
                        <LmcResidentsSidebar
                            residents={residents}
                            onCreate={this.onOpenCreateResident}
                        />
                        <div style={styles.rightContainer}>
                            <LmcTabBar
                                location={location} 
                                items={navbarItems}
                                resourceUrl='residents'    
                            />
                            <div>
                                { !residents.length ? (
                                    <BlankState
                                        heading={NO_RESIDENTS_MESSAGE}
                                        style={styles.noResidentsMessage}
                                    />
                                ) : children}
                            </div>
                        </div>
                    </div>
                ) : <LmcSpinner /> }
            </div>
        )
    }
}

const navbarItems = [
    { label: 'Profile', url: 'profile' },
    { label: 'Daily report', url: 'daily-report' },
    { label: 'Charts', url: 'charts' },
    { label: 'To-Dos', url: 'to-do' },
    { label: 'Documents', url: 'documents' }
]

const NO_RESIDENTS_MESSAGE = "You haven't added any residents yet"

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    rightContainer: {
        flex: '4',
        background: '#fbfbfb'
    },
    noResidentsMessage: {
        margin: 50,
        padding: 60,
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
        selectList: () => dispatch(selectList('residents')),
        fetchResidents: () => dispatch(ActionCreators.loadList('residents')),
        setSelectedResident: (id) => dispatch(ActionCreators.setSelectedResident(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentsScreen)