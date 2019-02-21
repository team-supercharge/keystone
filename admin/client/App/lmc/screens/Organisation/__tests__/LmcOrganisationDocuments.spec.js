jest.mock('../../../../shared/CreateForm')

import React from 'react'
import { shallow } from 'enzyme'
import { LmcOrganisationDocuments } from '../components/LmcOrganisationDocuments.jsx'

describe('LmcOrganisationDocuments', () => {
    let wrapper
    let homeDocuments
    const fetchDocumentsMock = jest.fn()
    const deleteDocumentMock = jest.fn()

    beforeEach(() => {
        homeDocuments = { 
            'Policies': [{ name: 'TestDocument' }],
            'Procedures': [{ name: 'TestDocument2' }]
        }

        wrapper = shallow(
            <LmcOrganisationDocuments 
                documents={homeDocuments}
                fetchDocuments={fetchDocumentsMock}
                deleteDocument={deleteDocumentMock}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders an LMC create button with the correct props', () => {
        const button = wrapper.find('LmcCreateButton')
        const { buttonText, listId, title, onCreate } = button.props()

        expect(buttonText).toEqual('Document')
        expect(listId).toEqual('HomeDocument')
        expect(title).toEqual('Add a Document')
        expect(onCreate).toEqual(fetchDocumentsMock)
    })

    it('renders an LMC document list with the correct props', () => {
        const list = wrapper.find('LmcDocumentList')
        const { documents, listId, onDelete } = list.props()

        expect(documents).toEqual(homeDocuments)
        expect(listId).toEqual('home-documents')
        expect(onDelete).toEqual(deleteDocumentMock)
    })

    it('renders a message if there are no documents yet', () => {
        const emptyWrapper = shallow(
            <LmcOrganisationDocuments
                documents={{}}
                fetchDocuments={fetchDocumentsMock}
                deleteDocument={deleteDocumentMock}
            />
        )

        const heading = "You haven't added any documents for your home yet"

        expect(wrapper.find('BlankState').length).toEqual(0)
        expect(emptyWrapper.find('BlankState').length).toEqual(1)
        expect(emptyWrapper.find('BlankState').props().heading).toEqual(heading)
    })
})