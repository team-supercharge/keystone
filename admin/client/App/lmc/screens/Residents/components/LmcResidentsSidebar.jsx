import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActionCreators } from '../../../actions/actions'
import LmcResidentsSidebarItem from './LmcResidentsSidebarItem.jsx'

export class LmcResidentsSidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { 
            residents, 
            selectedResident, 
            initialSelectedResident, 
            setSelectedResident 
        } = this.props;

        let currentResident = selectedResident || initialSelectedResident.id

        return (
            <div className='lmc-box-shadow__right' style={styles.container}>
                <ul style={styles.list}>
                    { residents.map((resident, index) => {
                            return (
                                <LmcResidentsSidebarItem 
                                    key={index}
                                    resident={resident}
                                    onClick={() => setSelectedResident(resident.id)}
                                    isSelected={resident.id === currentResident}
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
        zIndex: '-1',
    },
    list: {
        padding: 0,
        margin: 0,
    }
};

LmcResidentsSidebar.propTypes = {
    residents: PropTypes.array,
    initialSelectedResident: PropTypes.object,
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