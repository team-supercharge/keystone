import React from 'react'
import PropTypes from 'prop-types'
import LmcTimelineRow from '../../../../components/LmcTimelineRow.jsx'

const LmcHandoverResidentItem = ({ data }) => {
    const { logs, resident } = data
    const chosenName = resident.preferredName || resident.name.first
    
    return (
        <div>
            <div style={styles.residentContainer}>
                <div 
                    className="lmc-profile-picture__handover" 
                    style={{
                        background: `url(${resident.picture || PLACEHOLDER_IMAGE})` 
                    }} 
                />
                <span style={styles.residentName}>
                    <span style={styles.preferredName}>{chosenName}</span> ({ `${resident.name.first} ${resident.name.last}` })
                </span>
            </div>
            <ul style={styles.logContainer}>
                { logs.map((log, i) => {
                    return (
                        <LmcTimelineRow
                            key={log.id}
                            log={log}
                            index={i}
                            total={logs.length}
                        /> 
                    )
                })}
            </ul>
        </div>
        
    )
}

const PLACEHOLDER_IMAGE = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/profile_pic_placeholder.png';

const styles = {
    logContainer: {
		listStyleType: 'none',
        paddingLeft: 0,
        paddingBottom: 0,
        position: 'relative',
        top: 20,
        left: 50
    },
    residentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    residentName: {
        fontSize: 16,
        position: 'relative',
        top: 12,
        left: 20
    },
    preferredName: {
        fontWeight: 600
    }
}
LmcHandoverResidentItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default LmcHandoverResidentItem