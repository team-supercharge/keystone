import React from 'react'
import { shallow } from 'enzyme'
import LmcDocumentList from '../LmcDocumentList.jsx'

describe('LmcDocumentList', () => {
    let wrapper
    let documents
    const onDeleteMock = jest.fn()

    beforeEach(() => {
        documents = { 
            'CategoryName1': [{ name: 'TestDocument' }],
            'CategoryName2': [{ name: 'TestDocument2' }]
        }

        wrapper = shallow(
            <LmcDocumentList
                documents={documents}
                listId='testId'
                onDelete={onDeleteMock}
            />
        )
    })

    it('renders correctlty', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders the correct number of LmcDocumentItems', () => {
        expect(wrapper.find('LmcDocumentItem').length).toEqual(2)
    })

    it('renders the category names as headings', () => {
        const heading1 = wrapper.find('h2').first()
        const heading2 = wrapper.find('h2').at(1)

        expect(heading1.text()).toEqual('CategoryName1')
        expect(heading2.text()).toEqual('CategoryName2')
    })
})