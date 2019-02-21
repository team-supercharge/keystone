import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions/actions'
import { selectList } from '../../../screens/List/actions'
import { LmcSpinner } from '../../components'
import { BlankState } from '../../../elemental'
import LmcSidebar from '../../components/LmcSidebar.jsx'
import LmcTabBar from '../../components/LmcTabBar.jsx'

export class LmcResidentsScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount () {
        const { selectList, fetchResidents } = this.props
        selectList()
        fetchResidents()
    }
    
    onCreateResidentComplete = (resident) => {
        const { fetchResidents, setSelectedResident } = this.props
        fetchResidents()
        setSelectedResident(resident.id)
    }

    render () {
        const { 
            residents, 
            children, 
            location,
            selectedResident,
            setSelectedResident
        } = this.props;
        return (
            <div>
                { residents ? (
                    <div style={styles.mainContainer}>
                        <div style={styles.leftContainer}>
                            <LmcSidebar
                                itemLabel='Resident'
                                listId='Resident'
                                items={residents}
                                onCreate={this.onCreateResidentComplete}
                                selectedItem={selectedResident}
                                setSelectedItem={setSelectedResident}
                                title='Residents'
                                styles={styles.sidebar}                                
                            />
                        </div>
                        <div style={styles.rightContainer}>
                            <LmcTabBar
                                location={location} 
                                items={navbarItems}
                                resourceUrl='residents'    
                            />
                            <div style={styles.childContainer}>
                                <div style={styles.childWidth}>
                                    { !residents.length ? (
                                        <BlankState
                                            heading={NO_RESIDENTS_MESSAGE}
                                            style={styles.noResidentsMessage}
                                        />
                                    ) : children}
                                </div>
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
    childContainer: {
        overflow: 'scroll',
        height: '85vh',
        padding: '50px 20px 0px 20px',
    },
    childWidth: {
        maxWidth: 800,
        margin: '0 auto',
    },
    leftContainer: {
        flex: '1',
        zIndex: '1',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    rightContainer: {
        flex: '3.5',
        background: '#fbfbfb',
        minWidth: 0,
    },
    sidebar: { 
        height: '91.5vh', 
        maxHeight: '91.5vh' 
    },
    noResidentsMessage: {
        padding: 60,
    }
}

LmcResidentsScreen.propTypes = {
    residents: PropTypes.array,
    selectedResident: PropTypes.string,
    selectList: PropTypes.func.isRequired,
    fetchResidents: PropTypes.func.isRequired,
    setSelectedResident: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        residents: state.data.residents,
        selectedResident: state.residents.selectedResident
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