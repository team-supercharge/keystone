import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LmcHandoverResidentItem from './LmcHandoverResidentItem.jsx'
import LmcHandoverNotes from './LmcHandoverNotes.jsx'
import AnimateHeight from 'react-animate-height'
import { BlankState, GlyphButton } from '../../../../../elemental'
import { isBrowser, isTablet } from 'react-device-detect'

export default class LmcCurrentHandover extends Component {
    state = {
        isShowingContent: true
    }

    toggleContent = () => {
        this.setState(prevState => ({
            isShowingContent: !prevState.isShowingContent
        }))
    }

    renderData () {
        const { logsByResident, notes } = this.props
        const isDesktopStyles = (isBrowser || isTablet)
        const isEmpty = (!logsByResident.length && !notes.length)

        return (
            <AnimateHeight
                duration={ 500 }
                height={ this.state.isShowingContent ? 'auto' : 0 }
            >
                { isEmpty ? (
                    <div style={styles.dataContainer}>
                        <BlankState
                            heading='Nothing to see here!'
                            style={{ width: '100%' }}
                        />
                    </div>
                ) : (
                    <div 
                        style={{ 
                            ...styles.dataContainer,
                            flexDirection: isDesktopStyles ? 'row' : 'column'
                        }}
                    >
                        <div 
                            style={isDesktopStyles ? styles.leftContainer : null}
                        >
                            { logsByResident.map((logGroup, i) => {
                                return (
                                    <div key={i}>
                                        <LmcHandoverResidentItem
                                            data={logGroup}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <div 
                            style={isDesktopStyles ? styles.rightContainer : null}
                        >
                            <LmcHandoverNotes
                                notes={notes}
                            />
                        </div>
                    </div>
                ) }
            </AnimateHeight>
        )
    }

    render () {
        return (
            <div>
                <div style={styles.headingContainer}>
                    <h2 style={styles.heading}>
                        Current Handover
                    </h2>
                    <GlyphButton
                        className='lmc-collapse-button'
                        glyph={this.state.isShowingContent ? 'chevron-up' : 'chevron-down'}
                        onClick={this.toggleContent} 
                    />
                </div>
                <div className='lmc-theme-gradient' style={styles.divider} />
                { this.renderData() }
            </div>
        )
    }
}

const styles = {
    dataContainer: {
        display: 'flex',
        width: '100%'
    },
    divider: {
        height: 2,
        marginBottom: 22,
        width: '100%',
    },
    leftContainer: {
        width: '60%',
        paddingRight: 20
    },
    rightContainer: {
        width: '40%',
        flex: '1'
    },
    heading: {
        marginBottom: '0.3em',
        fontWeight: 300,
        textOverflow: 'ellipsis',
        hyphens: 'auto',
    },
    headingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

LmcCurrentHandover.propTypes = {
    logsByResident: PropTypes.array.isRequired,
    notes: PropTypes.array.isRequired
}