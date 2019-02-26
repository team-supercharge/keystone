jest.mock('../../../../shared/CreateForm')

import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentsSidebar } from '../components/LmcResidentsSidebar.jsx'

describe('LmcResidentsSidebar', () => {
    let wrapper
    let residents
    const onCreateMock = jest.fn()

    beforeEach(() => {
        residents = [
            { id: 'testId1', name: { first: 'test', last: 'id1' }, status: 'active' },
            { id: 'testId2', name: { first: 'test', last: 'id2' }, status: 'active' },
            { id: 'testId3', name: { first: 'test', last: 'id3' }, status: 'inactive' },
        ]
        wrapper = shallow(
            <LmcResidentsSidebar
                residents={residents}
                selectedResident={residents[0].id}
                onCreate={onCreateMock}
            />
        )
    })

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders an unordered list', () => {
        expect(wrapper.find('ul').length).toEqual(1)
    })

    it('renders a number of sidebar items based on its active residents list', () => {
        expect(wrapper.find('LmcSidebarItem').length).toEqual(2)
    })

    it('renders the sidebar filter', () => {
        expect(wrapper.find('LmcResidentsSidebarFilter').length).toEqual(1)
    })

    it('renders a LmcCreateButton with the correct props', () => {
        const button = wrapper.find('LmcCreateButton')

        expect(button.props().listId).toEqual('Resident')
        expect(button.props().title).toEqual('Add a new Resident')
        expect(button.props().onCreate).toEqual(onCreateMock)
    })
})