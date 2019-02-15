import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'
import { GlyphButton, ResponsiveText } from '../../../../elemental'
import _ from 'lodash'
import LmcSidebarItem from '../../../components/LmcSidebarItem.jsx'
import LmcResidentsSidebarFilter from './LmcResidentsSidebarFilter.jsx'
import LmcCreateButton from '../../../components/LmcCreateButton.jsx'

export class LmcResidentsSidebar extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        nameFilter: '',
        displayActiveResidents: true
    }

    componentDidMount () {
        const { residents, selectedResident, setSelectedResident } = this.props;
        let shownResidents = _.filter(residents, (resident) => !this.calculateHidden(resident))
        if (shownResidents.length && !selectedResident) {
            setSelectedResident(shownResidents[0].id)
        }
    }

    calculateHidden = (resident) => {
        const { first, last } = resident.name
        return (
            !`${first} ${last}`.match(new RegExp(this.state.nameFilter, 'i')) || 
            (this.state.displayActiveResidents && resident.status !== 'active')
        )
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSwitchChange = () => {
        this.setState(prevState => ({ 
            displayActiveResidents: !prevState.displayActiveResidents 
        }))
    }

    render() {
        const { 
            residents, 
            selectedResident, 
            setSelectedResident,
            onCreate,
        } = this.props;

        let shownResidents = _.filter(residents, (resident) => !this.calculateHidden(resident))

        return (
            <div className='lmc-sidebar' style={styles.container}>
                <LmcResidentsSidebarFilter
                    onFormChange={this.handleFormChange}
                    onSwitchChange={this.handleSwitchChange}
                    isChecked={!this.state.displayActiveResidents}
                />
                <LmcCreateButton
                    listId='Resident'
                    title='Add a new Resident'
                    onCreate={onCreate}
                    style={styles.button}
                />
                <ul className='lmc-sidebar-list'>
                        { shownResidents.map((resident, index) => {
                            return (
                                <LmcSidebarItem 
                                    key={index}
                                    itemData={resident}
                                    onClick={() => setSelectedResident(resident.id)}
                                    isSelected={resident.id === selectedResident}
                                />
                            )
                        }) }
                </ul>
            </div>
        )
    }
}

const styles = {
    button: {
        borderRadius: 0,
    },
    container: {
        flex: '1',
        zIndex: '1'
    }
};

LmcResidentsSidebar.propTypes = {
    residents: PropTypes.array,
    selectedResident: PropTypes.string,
    onCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        selectedResident: state.residents.selectedResident,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedResident: (id) => dispatch(ActionCreators.setSelectedResident(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentsSidebar);