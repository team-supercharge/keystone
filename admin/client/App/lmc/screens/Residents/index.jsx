import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions/actions'
import { selectList } from '../../../screens/List/actions'
import { LmcSpinner } from '../../components'
import { BlankState } from '../../../elemental'
import LmcResidentsSidebar from './components/LmcResidentsSidebar.jsx'
import LmcTabBar from '../../components/LmcTabBar.jsx'

export class LmcResidentsScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount () {
        this.props.selectList()
    }

    onCreateResidentComplete = (resident) => {
        const { fetchResidents, setSelectedResident } = this.props
        fetchResidents()
        setSelectedResident(resident.id)
    }

    render () {
        const { residents, children, location } = this.props;
        return (
            <div>
                { residents ? (
                    <div style={styles.mainContainer}>
                        <LmcResidentsSidebar
                            residents={residents}
                            onCreate={this.onCreateResidentComplete}
                        />
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
    },
    childWidth: {
        maxWidth: 800,
        margin: '0 auto',
        padding: '50px 0px 0px 0px',
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    rightContainer: {
        flex: '3.5',
        background: '#fbfbfb',
    },
    noResidentsMessage: {
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