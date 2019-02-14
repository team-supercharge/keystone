import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '../../../utils/List'
import CreateForm from '../../shared/CreateForm'
import { GlyphButton, ResponsiveText } from '../../elemental'

export default class LmcCreateButton extends Component {
    state = {
        currentList: null,
        isModalOpen: true,
        showCreateModal: false
    }

    onOpenCreateModal = () => {
        this.setState({ 
            showCreateModal: true,
            currentList: new List(Keystone.lists[this.props.listId]),
        })
    }

    onCloseCreateModal = () => {
        this.setState({ isModalOpen: false });
        setTimeout(() => {
            this.setState({ 
                showCreateModal: false, 
                isModalOpen: true 
            })
        })
    }

    onCreateItemComplete = (item) => {
        this.onCloseCreateModal()
        this.props.onCreate(item)
    }

    renderCreateForm = () => {
        const { showCreateModal, isModalOpen, currentList } = this.state;
        return (
            showCreateModal
                ? <div className="lmc-create-form">
                    <CreateForm
                        isOpen={isModalOpen}
                        list={currentList}
                        onCancel={this.onCloseCreateModal}
                        formTitle={this.props.title}
                        onCreate={this.onCreateItemComplete}
                    />
                </div> : null
        )
    }

    render () {
        const { listId, style } = this.props
        const buttonText = `Add a ${listId}`
        return (
            <section>
                { this.renderCreateForm() }
                <GlyphButton
                    block
                    color='success'
                    glyph='plus'
                    position='left'
                    title={buttonText}
                    onClick={this.onOpenCreateModal}
                    style={style}
                >
                    <ResponsiveText
                        visibleSM={buttonText}
                        visibleMD={buttonText}
                        visibleLG={buttonText}
                     />
                </GlyphButton>
            </section>
        )
    }
}

LmcCreateButton.propTypes = {
    listId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onCreate: PropTypes.func,
    styles: PropTypes.object,
}