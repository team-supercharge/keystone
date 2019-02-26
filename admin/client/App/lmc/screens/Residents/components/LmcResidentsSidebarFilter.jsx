import React from 'react'
import PropTypes from 'prop-types'
import { FormInput } from '../../../../elemental'
import Switch from 'react-switch'

const LmcResidentsSidebarFilter = ({ onFormChange, onSwitchChange, isChecked }) => {
    return (
        <div style={styles.filterContainer}>
            <FormInput
                autofocus
                name='nameFilter'
                placeholder="Filter by name"
                style={styles.filter}
                onChange={onFormChange}
            />
            <span style={{ cursor: 'pointer', float: 'right' }} onClick={() => {}}>
                <span 
                    style={{ paddingRight: 8, position: 'relative', top: -5, opacity: 0.6 }}
                    onClick={onSwitchChange}
                >
                    Active residents
                </span>
                    <Switch
                        onChange={onSwitchChange}
                        checked={isChecked}
                        onColor='#e65d78'
                        offColor='#e65d78'
                        handleDiameter={16}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        activeBoxShadow="0px 0px 1px 8px rgba(0, 0, 0, 0.1)"
                        height={20}
                        width={40}
                    />
                <span 
                    style={{ paddingLeft: 8, position: 'relative', top: -5, opacity: 0.6 }}
                    onClick={onSwitchChange}
                >
                    All
                </span>
            </span>
        </div>
    )
}

const styles = {
    filter: {
        borderRadius: '3px',
        height: '40px',
        marginBottom: '15px',
    },
    filterContainer: {
        padding: '10px',
        display: 'block',
        backgroundColor: 'white',
    },
}

LmcResidentsSidebarFilter.propTypes = {
    onFormChange: PropTypes.func.isRequired,
    onSwitchChange: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
}

export default LmcResidentsSidebarFilter