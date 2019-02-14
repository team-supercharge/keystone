import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentDocuments } from '../components/LmcResidentDocuments.jsx'

describe('LmcResidentDocuments', () => {
    let wrapper
    let documents
    const fetchDocuments = jest.fn()

    beforeEach(() => {
        documents = { 'Going to Bed and Sleeping': [{ name: 'TestDocument' }]}
        wrapper = shallow(
            <LmcResidentDocuments 
                documents={documents}
                fetchDocuments={fetchDocuments}
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
            />
        )
        const message = emptyWrapper.find('BlankState')
        expect(message.props().heading).toEqual("You haven't added any documents for this resident")
    })

    it('should display an LmcDocumentItem component with the correct data', () => {
        const documentItem = wrapper.find('LmcDocumentItem').first()
        expect(documentItem.props().data).toEqual(documents['Going to Bed and Sleeping'][0])
    })
})