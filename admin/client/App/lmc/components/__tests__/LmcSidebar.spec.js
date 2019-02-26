jest.mock('../../../shared/CreateForm')

import React from 'react'
import { shallow } from 'enzyme'
import LmcSidebar from '../LmcSidebar.jsx'

describe('LmcSidebar', () => {
    let wrapper
    let items
    const onCreateMock = jest.fn()
    const setSelectedItemMock = jest.fn()

    beforeEach(() => {
        items = [
            { id: 'testId1', name: { first: 'test', last: 'id1' }, status: 'active' },
            { id: 'testId2', name: { first: 'test', last: 'id2' }, status: 'active' },
            { id: 'testId3', name: { first: 'test', last: 'id3' }, status: 'inactive' },
        ]
        wrapper = shallow(
            <LmcSidebar
                itemLabel='Item'
                listId='Item'
                items={items}
                onCreate={onCreateMock}
                setSelectedItem={setSelectedItemMock}
                selectedItem={items[0].id}
                title='TestTitle'
            />
        )
    })

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders an unordered list', () => {
        expect(wrapper.find('ul').length).toEqual(1)
    })

    it('renders a number of sidebar items based on its active items list', () => {
        expect(wrapper.find('LmcSidebarItem').length).toEqual(2)
    })

    it('renders the sidebar filter', () => {
        expect(wrapper.find('LmcSidebarFilter').length).toEqual(1)
    })

    it('renders a LmcCreateButton with the correct props', () => {
        const button = wrapper.find('LmcCreateButton')

        expect(button.props().listId).toEqual('Item')
        expect(button.props().title).toEqual('Add a new Item')
        expect(button.props().onCreate).toEqual(onCreateMock)
    })
})