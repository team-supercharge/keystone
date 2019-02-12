import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'
import { GlyphButton, ResponsiveText } from '../../../../elemental'
import _ from 'lodash'
import LmcSidebarItem from '../../../components/LmcSidebarItem.jsx'
import LmcResidentsSidebarFilter from './LmcResidentsSidebarFilter.jsx'

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
        return (
            !resident.name.match(new RegExp(this.state.nameFilter, 'i')) || 
            (this.state.displayActiveResidents && resident.fields.status !== 'active')
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
                <GlyphButton
                    block
                    color='success'
                    glyph='plus'
                    position='left'
                    title={ADD_RESIDENTS_BUTTON_TEXT}
                    onClick={() => onCreate('Residents')}
                    style={styles.button}
                >
                    <ResponsiveText
                        visibleSM={ADD_RESIDENTS_BUTTON_TEXT}
                        visibleMD={ADD_RESIDENTS_BUTTON_TEXT}
                        visibleLG={ADD_RESIDENTS_BUTTON_TEXT}
                     />
                </GlyphButton>
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

const ADD_RESIDENTS_BUTTON_TEXT = 'Add a Resident';

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