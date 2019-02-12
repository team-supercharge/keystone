import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentsSidebar } from '../components/LmcResidentsSidebar.jsx'

describe('LmcResidentsSidebar', () => {
    let wrapper
    let residents
    const onCreateMock = jest.fn()

    beforeEach(() => {
        residents = [
            { id: 'testId1', name: 'testId2', fields: { status: 'active' } },
            { id: 'testId2', name: 'testId2', fields: { status: 'active' } },
            { id: 'testId3', name: 'testId3', fields: { status: 'inactive' } },
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

    it('triggers its onCreate prop', () => {
        wrapper.find('GlyphButton').simulate('click')
        expect(onCreateMock).toBeCalledTimes(1)
        expect(onCreateMock).toBeCalledWith('Residents')
    })
})