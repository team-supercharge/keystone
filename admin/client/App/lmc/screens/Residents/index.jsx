import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions/actions'
import { isBrowser, isTablet } from 'react-device-detect'
import { LmcSpinner } from '../../components'
import { BlankState, GlyphButton } from '../../../elemental'
import LmcSidebar from '../../components/LmcSidebar.jsx'
import LmcTabBar from '../../components/LmcTabBar.jsx'

export class LmcResidentsScreen extends Component {
    componentDidMount () {
        if (isBrowser || isTablet) {
            this.props.fetchResidentsAndSelect()
        } else {
            this.props.fetchResidents()
        }
    }
    
    onCreateResidentComplete = (resident) => {
        const { fetchResidents, setSelectedResident } = this.props
        fetchResidents()
        setSelectedResident(resident.id)
    }

    renderDesktop = () => {
        const { 
            residents, 
            children, 
            location,
            selectedResident,
            setSelectedResident
        } = this.props;
        return (
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
        )
    }

    renderMobile = () => {
        const { 
            residents, 
            children, 
            location,
            selectedResident,
            setSelectedResident
        } = this.props;

        return !selectedResident ? (
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
        ) : (
            <div style={styles.mobileContainer}>
                <LmcTabBar
                    location={location} 
                    items={navbarItems}
                    resourceUrl='residents'    
                />
                <div style={styles.mobileChildContainer}>
                    <GlyphButton
                        glyph="chevron-left"
                        position="left"
                        style={styles.mobileBackLink}
                        onClick={() => setSelectedResident(null)}
                        variant="link"
                    >
                        Back
                    </GlyphButton>
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
        )
    }

    render () {
        const chosenRender = 
            (isBrowser || isTablet) ? this.renderDesktop : this.renderMobile
        return this.props.residents ? chosenRender() : <LmcSpinner />
    }
}

const navbarItems = [
    { label: 'Profile', url: 'profile', octicon: 'person' },
    // Removing these until these components are completed
    // { label: 'Daily Logs', url: 'daily-report', octicon: 'calendar' },
    // { label: 'Charts', url: 'charts', octicon: 'graph' },
    // { label: 'To-Dos', url: 'to-do', octicon: 'checklist' },
    { label: 'Documents', url: 'documents', octicon: 'file' }
]

const NO_RESIDENTS_MESSAGE = "You haven't added any residents yet"

const styles = {
    backLink: {
        paddingLeft: 0,
        paddingRight: 0,
        position: 'relative',
        bottom: 40,
        right: 10,
    },
    childContainer: {
        overflowY: 'scroll',
        height: '86vh',
        width: '100%',
        padding: '50px 20px 0px 20px',
    },
    childWidth: {
        maxWidth: 1000,
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
    mobileBackLink: {
        paddingLeft: 0,
        paddingRight: 0,
        position: 'relative',
        bottom: 10,
        right: 10,
    },
    mobileChildContainer: {
        overflowY: 'scroll',
        height: '86vh',
        width: '100%',
        padding: '20px 20px 0px 20px',
    },
    mobileContainer: {
        background: '#fbfbfb',
        minWidth: 0,
        wordWrap: 'break-word',
    },
    rightContainer: {
        flex: '3.5',
        background: '#fbfbfb',
        minWidth: 0,
        wordWrap: 'break-word',
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
    fetchResidentsAndSelect: PropTypes.func.isRequired,
    setSelectedResident: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        residents: state.data.residents,
        selectedResident: state.residents.selectedResident,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchResidentsAndSelect: () => dispatch(ActionCreators.fetchResidents()),
        fetchResidents: () => dispatch(ActionCreators.loadList('residents')),
        setSelectedResident: (id) => dispatch(ActionCreators.setSelectedResident(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentsScreen)