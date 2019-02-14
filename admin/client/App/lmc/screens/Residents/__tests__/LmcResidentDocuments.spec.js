import React from 'react'
import { shallow, mount } from 'enzyme'
import { LmcResidentDocuments } from '../components/LmcResidentDocuments.jsx'

describe('LmcResidentDocuments', () => {
    let mountedWrapper
    let wrapper
    let documents
    const fetchDocuments = jest.fn()

    beforeAll(() => {
        documents = { 'Going to Bed and Sleeping': [{ name: 'TestDocument' }]}
        mountedWrapper = mount(
            <LmcResidentDocuments
                documents={documents}
                fetchDocuments={fetchDocuments}
            />
        )
    })

    beforeEach(() => {
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

    it('should fetch its documents when rendered', () => {
        expect(fetchDocuments).toBeCalledTimes(1)
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
})