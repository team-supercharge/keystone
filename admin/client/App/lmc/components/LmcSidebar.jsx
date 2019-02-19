import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import LmcSidebarItem from './LmcSidebarItem.jsx'
import LmcSidebarFilter from './LmcSidebarFilter.jsx'
import LmcCreateButton from './LmcCreateButton.jsx'

export default class LmcSidebar extends Component {
    state = {
        nameFilter: '',
        displayActiveItems: true
    }

    componentDidMount () {
        const { items, selectedItem, setSelectedItem } = this.props;
        let shownItems = _.filter(items, (item) => !this.calculateHidden(item))
        if (shownItems.length && !selectedItem) {
            setSelectedItem(shownItems[0].id)
        }
    }

    calculateHidden = (item) => {
        const { first, last } = item.name
        return (
            !`${first} ${last}`.match(new RegExp(this.state.nameFilter, 'i')) || 
            (this.state.displayActiveItems && item.status !== 'active')
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

    renderTitle() {
        const { title } = this.props
        if (!title) return null

        return (
            <div style={styles.titleContainer}>
                <span style={styles.title}>
                    { title }
                </span>
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
        } = this.props;
        
        let shownItems = _.filter(items, (item) => !this.calculateHidden(item))

        return (
            <div className='lmc-sidebar'>
                { this.renderTitle() }
                <LmcSidebarFilter
                    onFormChange={this.handleFormChange}
                    onSwitchChange={this.handleSwitchChange}
                    isChecked={!this.state.displayActiveItems}
                />
                <LmcCreateButton
                    buttonText={itemLabel}
                    listId={listId}
                    title={`Add a new ${itemLabel}`}
                    onCreate={onCreate}
                    style={styles.button}
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

const styles = {
    button: {
        borderRadius: 0,
    },
    titleContainer: {
        backgroundColor: 'white',
        padding: '50px 0px 20px 0px',
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
    }
};

LmcSidebar.propTypes = {
    itemLabel: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    items: PropTypes.array,
    onCreate: PropTypes.func.isRequired,
    selectedItem: PropTypes.string,
    setSelectedItem: PropTypes.func.isRequired,
    title: PropTypes.string,
};