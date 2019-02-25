import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { isBrowser } from 'react-device-detect'
import { Button } from '../../elemental'
import Octicon, { Search } from '@githubprimer/octicons-react'
import LmcSidebarItem from './LmcSidebarItem.jsx'
import LmcSidebarFilter from './LmcSidebarFilter.jsx'
import LmcCreateButton from './LmcCreateButton.jsx'

export default class LmcSidebar extends Component {
    state = {
        nameFilter: '',
        displayActiveItems: true,
        displayNameFilter: false
    }

    componentDidMount () {
        const { items, selectedItem, setSelectedItem } = this.props;
        let shownItems = _.filter(items, (item) => !this.calculateHidden(item))
        if (isBrowser && shownItems.length && !selectedItem) {
            setSelectedItem(shownItems[0].id)
        }
    }

    calculateHidden = (item) => {
        const { first, last } = item.name
        const isActive = (item.active || item.status === 'active')
        return (
            !`${first} ${last}`.match(new RegExp(this.state.nameFilter, 'i')) || 
            (this.state.displayActiveItems && !isActive)
        )
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSwitchChange = () => {
        this.setState(prevState => ({
            displayActiveItems: !prevState.displayActiveItems 
        }))
    }

    handleFilterToggle = () => {
        this.setState(prevState => ({
            nameFilter: '', 
            displayNameFilter: !prevState.displayNameFilter
        }))
    }

    renderHeader() {
        const { title } = this.props
        const activeStyles = this.state.displayNameFilter ? localStyles.activeButton : null

        return (
            <div style={localStyles.header}>
                <span style={localStyles.title}>
                    { title }
                </span>
                <Button
			        className='lmc-filter-button'
                    color='default'
                    style={{ ...activeStyles, ...localStyles.filterButton}}
                    onClick={this.handleFilterToggle}
                >
                    <Octicon icon={Search} />
                </Button>
            </div>
        )
    }

    render() {
        const { 
            itemLabel,
            listId,
            items, 
            selectedItem, 
            setSelectedItem,
            onCreate,
            styles
        } = this.props;
        
        let shownItems = _.filter(items, (item) => !this.calculateHidden(item))

        return (
            <div className='lmc-sidebar' style={styles}>
                { this.renderHeader() }
                <LmcSidebarFilter
                    onFormChange={this.handleFormChange}
                    onSwitchChange={this.handleSwitchChange}
                    isChecked={!this.state.displayActiveItems}
                    isShowingNameFilter={this.state.displayNameFilter}
                />
                <LmcCreateButton
                    buttonText={itemLabel}
                    listId={listId}
                    title={`Add a new ${itemLabel}`}
                    onCreate={onCreate}
                    style={localStyles.button}
                />
                <ul className='lmc-sidebar-list'>
                        { shownItems.map((item, index) => {
                            return (
                                <LmcSidebarItem 
                                    key={index}
                                    itemData={item}
                                    onClick={() => setSelectedItem(item.id)}
                                    isSelected={item.id === selectedItem}
                                />
                            )
                        }) }
                </ul>
            </div>
        )
    }
}

const localStyles = {
    activeButton: {
        background: '#dddddd',
        color: '#e85b78',
    },
    button: {
        borderRadius: 0,
        minHeight: 35,
    },
    filterButton: {
        padding: '0px 12px 0px 10px',
        marginLeft: 10,
        position: 'relative',
        bottom: 3,
    },
    header: {
        backgroundColor: '#f7f7f7',
        padding: '50px 0px 5px 15px',
        display: 'inline-block',
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
    }
};

LmcSidebar.propTypes = {
    itemLabel: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    items: PropTypes.array,
    onCreate: PropTypes.func.isRequired,
    selectedItem: PropTypes.string,
    setSelectedItem: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    styles: PropTypes.object
};