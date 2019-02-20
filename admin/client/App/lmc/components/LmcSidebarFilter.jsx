import React from 'react'
import PropTypes from 'prop-types'
import { FormInput } from '../../elemental'
import Switch from 'react-switch'

const LmcSidebarFilter = ({ onFormChange, onSwitchChange, isChecked, isShowingNameFilter }) => {
    return (
        <div style={styles.filterContainer}>
            { isShowingNameFilter ? (
                <div style={styles.nameFilterContainer}>
                    <FormInput
                        autofocus
                        name='nameFilter'
                        placeholder='Filter by name'
                        style={styles.filter}
                        onChange={onFormChange}
                    />
                </div>
            ) : null }
            <span style={styles.switch} onClick={() => {}}>
                <span 
                    style={{ paddingRight: 8, position: 'relative', top: -5, opacity: 0.6 }}
                    onClick={onSwitchChange}
                >
                    Active
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
                        width={50}
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
        display: 'block',
        backgroundColor: '#f7f7f7',
    },
    nameFilterContainer: {
        padding: '3px 14px 3px 14px',
    },
    switch: { 
        cursor: 'pointer', 
        float: 'left',
        padding: '0px 0px 46px 17px'
    }
}

LmcSidebarFilter.propTypes = {
    item: PropTypes.string,
    onFormChange: PropTypes.func.isRequired,
    onSwitchChange: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    isShowingNameFilter: PropTypes.bool.isRequired,
}

export default LmcSidebarFilter