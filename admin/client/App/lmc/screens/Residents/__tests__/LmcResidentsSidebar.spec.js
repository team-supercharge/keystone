import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentsSidebar } from '../components/LmcResidentsSidebar.jsx'

describe('LmcResidentsSidebar', () => {
    let wrapper
    let residents

    beforeEach(() => {
        residents = [
            { id: 'testId1', name: 'testId2' },
            { id: 'testId2', name: 'testId2' },
            { id: 'testId3', name: 'testId3' },
        ]
        wrapper = shallow(
            <LmcResidentsSidebar
                residents={residents}
                initialSelectedResident={residents[0]}
            />
        )
    })

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders an unordered list', () => {
        expect(wrapper.find('ul').length).toEqual(1)
    })

    it('renders a number of sidebar items based on its residents list', () => {
        expect(wrapper.find('LmcResidentsSidebarItem').length).toEqual(residents.length)
    })
})