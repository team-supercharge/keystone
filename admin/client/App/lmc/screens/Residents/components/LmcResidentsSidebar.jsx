import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'
import { FormInput } from '../../../../elemental'
import Switch from 'react-switch'
import _ from 'lodash'
import LmcResidentsSidebarItem from './LmcResidentsSidebarItem.jsx'
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
        const { residents, setSelectedResident } = this.props;
        let shownResidents = _.filter(residents, (resident) => !this.calculateHidden(resident))
        if (shownResidents.length) {
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
            setSelectedResident 
        } = this.props;

        let shownResidents = _.filter(residents, (resident) => !this.calculateHidden(resident))

        return (
            <div className='lmc-box-shadow__right' style={styles.container}>
                <LmcResidentsSidebarFilter
                    onFormChange={this.handleFormChange}
                    onSwitchChange={this.handleSwitchChange}
                    isChecked={!this.state.displayActiveResidents}
                />
                <ul style={styles.list}>
                    { shownResidents.map((resident, index) => {
                            return (
                                <LmcResidentsSidebarItem 
                                    key={index}
                                    resident={resident}
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
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '20vw',
        height: '100vh',
    },
    list: {
        padding: 0,
        margin: 0,
    }
};

LmcResidentsSidebar.propTypes = {
    residents: PropTypes.array,
    selectedResident: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        selectedResident: state.residents.selectedResident,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedResident: (id) => dispatch(ActionCreators.setSelectedResident(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentsSidebar);