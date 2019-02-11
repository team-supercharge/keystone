import React from 'react'
import PropTypes from 'prop-types'

const PLACEHOLDER_IMAGE = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';

const LmcResidentsSidebarItem = ({ resident, onClick, isSelected }) => {
    const img = Object.entries(resident.fields.picture).length ? resident.fields.picture : PLACEHOLDER_IMAGE
    const chosenImgStyle = isSelected ? styles.selectedImg : styles.regularImg
    const chosenStyle = isSelected ? styles.selected : styles.regular
    const chosenTextStyle = isSelected ? styles.selectedText : styles.regularText
    const imgBackground = {
        background: `url(${img})`
    }

    return (
        <li
            id={resident.id}
            onClick={onClick}
            style={{ ...styles.item, ...chosenStyle }}
        >
            <div>
                <span className='lmc-profile-picture__small' style={{ ...chosenImgStyle, ...styles.image, ...imgBackground }} />                
                <span style={{ ...chosenTextStyle, ...styles.nameText }}>{resident.name}</span>
            </div>
        </li>
    )
}

const styles = {
    image: {
        float: 'left',
        marginTop: '4px',
    },
    item : {
        listStyleType: 'none',
        height: '50px',
        display: 'flex',
		padding: '3px 0 3px 6px',
    },
    nameText: {
        marginLeft: '15px',
        position: 'relative',
        top: '12px',
        cursor: 'pointer',
    },
    selected: {
        background: '#f1f1f1',
		fontSize: 14,
		boxSizing: 'border-box',
		borderLeft: '3px solid #e65d78',
    },
    selectedImg: {
        marginLeft: '3px',
    },
    selectedText: {
        color: '#e65d78',
    },
    regular: {
        background: '#fafafa',
    },
    regularImg: {
        marginLeft: '6px',
    }
}

LmcResidentsSidebarItem.propTypes = {
    resident: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
}

export default LmcResidentsSidebarItem