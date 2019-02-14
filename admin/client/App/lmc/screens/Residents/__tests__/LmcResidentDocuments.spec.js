jest.mock('../../../../shared/CreateForm')

import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentDocuments } from '../components/LmcResidentDocuments.jsx'

describe('LmcResidentDocuments', () => {
    let wrapper
    let documents
    const deleteDocument = jest.fn()
    const fetchDocuments = jest.fn()

    beforeEach(() => {
        documents = { 'Going to Bed and Sleeping': [{ name: 'TestDocument' }]}
        wrapper = shallow(
            <LmcResidentDocuments 
                documents={documents}
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

    it('should display an LmcDocumentItem component with the correct data', () => {
        const documentItem = wrapper.find('LmcDocumentItem').first()
        expect(documentItem.props().data).toEqual(documents['Going to Bed and Sleeping'][0])

        documentItem.props().onDelete()
        expect(deleteDocument).toBeCalledTimes(1)
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