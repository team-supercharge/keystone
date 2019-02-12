import React from 'react'
import PropTypes from 'prop-types'

const PLACEHOLDER_IMAGE = 'https://s3-eu-west-2.amazonaws.com/lmc-marketing-public/wp-content/uploads/2018/04/12092141/profile_pic_placeholder.png';

const LmcSidebarItem = ({ itemData, onClick, isSelected }) => {
    const img = Object.entries(itemData.fields.picture).length ? itemData.fields.picture : PLACEHOLDER_IMAGE
    const chosenImgStyle = isSelected ? styles.selectedImg : styles.regularImg
    const chosenStyle = isSelected ? styles.selected : styles.regular
    const chosenTextStyle = isSelected ? styles.selectedText : styles.regularText
    const imgBackground = {
        background: `url(${img})`
    }

    return (
        <li
            id={itemData.id}
            onClick={onClick}
            style={{ ...styles.item, ...chosenStyle }}
        >
            <div style={styles.container}>
                <span className='lmc-profile-picture__small' style={{ ...chosenImgStyle, ...styles.image, ...imgBackground }} />                
                <div style={{ ...chosenTextStyle, ...styles.nameText }}>
                    {itemData.name}
                </div>
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
		padding: '3px 0 3px 6px',
    },
    nameText: {
        cursor: 'pointer',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '12px 10px 0px 15px',
        minWidth: '0px',
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

LmcSidebarItem.propTypes = {
    itemData: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
}

export default LmcSidebarItem