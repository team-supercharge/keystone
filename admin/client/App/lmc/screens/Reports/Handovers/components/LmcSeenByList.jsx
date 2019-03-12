import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

export class LmcSeenByList extends Component {
    state = {
        isExpanded: false
    }

    toggleExpand = () => {
        this.setState(prevState => ({ 
            isExpanded: !prevState.isExpanded 
        }));
    }

    renderPicture = (carer) => {
        return (
            <div 
                key={carer.id} 
                style={styles.rows}
            >
                <div 
                    className='lmc-profile-picture__handover__small' 
                    style={{
                        ...styles.image,
                        background: `url(${carer.picture || PLACEHOLDER_IMAGE})`
                    }}
                />
                <span 
                    style={this.state.isExpanded 
                        ? styles.textColumn 
                        : styles.textRow}
                >
                    {carer.name.first} {carer.name.last}
                </span>
            </div>
        )
    }

    render () {
        const { seenBy } = this.props;
        const { isExpanded } = this.state;
        
        if (!seenBy || !seenBy.length) return null

        return (
            <div style={styles.mainContainer}>
                <div 
                    style={{
                        ...styles.containerSeenBy, 
                        flexDirection: 'row' 
                    }} 
                    onClick={() => this.toggleExpand()}
                >
                    <span style={styles.seen}>
                        Seen by
                    </span>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: isExpanded ? 'column' : 'row',
                            flexWrap: 'wrap',
                        }}
                    >
                        { seenBy.map(carer => {
                            return (
                                <div 
                                    key={carer.id}
                                    style={isExpanded 
                                        ? styles.imageContainerColumn 
                                        : null }
                                >
                                    { this.renderPicture(carer) }
                                </div>
                            )
                        }) }
                    </div>
                </div>
            </div>
        );  
    }
}

const styles = {
    containerSeenBy: {
        display: 'flex',
        cursor: 'pointer',
        padding: '20px 0px 20px 0px'
    },
    seen: {
        paddingTop: 8,
        opacity: 0.8,
        fontSize: 12,
        marginRight: 10,
        flexShrink: 0,
    },
    imageContainerColumn: {
        padding: '0px 4px 2px 0px'
    },
    image: {
        marginRight: 2,
    },
    rows: {
        display: 'flex',
        flexDirection: 'row',
    },
    textRow: {
        display: 'none',
    },
    textColumn: {
        fontSize: 12,
        opacity: 0.6,
        padding: '8px 0px 0px 10px'
    }
}

const PLACEHOLDER_IMAGE = 'https://s3.eu-west-2.amazonaws.com/lmc-data-production/public/profile_pic_placeholder.png';

LmcSeenByList.propTypes = {
    carers: PropTypes.array,
    seenBy: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        carers: state.data.carers
    }
}   

export default connect(mapStateToProps, null)(LmcSeenByList)