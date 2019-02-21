jest.mock('../../../../shared/CreateForm')

import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentDocuments } from '../components/LmcResidentDocuments.jsx'

describe('LmcResidentDocuments', () => {
    let wrapper
    let residentDocuments
    const deleteDocument = jest.fn()
    const fetchDocuments = jest.fn()

    beforeEach(() => {
        residentDocuments = { 'Going to Bed and Sleeping': [{ name: 'TestDocument' }]}
        wrapper = shallow(
            <LmcResidentDocuments 
                documents={residentDocuments}
                fetchDocuments={fetchDocuments}
                deleteDocument={deleteDocument}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should display a message if no documents are present', () => {
        const emptyWrapper = shallow(
            <LmcResidentDocuments
                documents={{}}
                fetchDocuments={fetchDocuments}
                deleteDocument={deleteDocument}
            />
        )
        const message = emptyWrapper.find('BlankState')
        expect(message.props().heading).toEqual("You haven't added any documents for this resident")
    })

    it('renders an LmcDocumentList with the correct props', () => {
        const list = wrapper.find('LmcDocumentList')
        const { documents, listId, onDelete } = list.props()

        expect(documents).toEqual(residentDocuments)
        expect(listId).toEqual('documents')
        expect(onDelete).toEqual(deleteDocument)
    })

    it('renders a LmcCreateButton with the correct props', () => {
        const button = wrapper.find('LmcCreateButton')

        expect(button.props().listId).toEqual('Document')
        expect(button.props().title).toEqual('Add a Document')
        expect(button.props().onCreate).toEqual(fetchDocuments)
    })

    afterEach(() => {
        fetchDocuments.mockClear()
        deleteDocument.mockClear()
    })
})