import React from 'react'
import { shallow } from 'enzyme'
import LmcResidentsSidebarItem from '../components/LmcResidentsSidebarItem'

describe('LmcResidentsSidebarItem', () => {
    let wrapper
    let resident

    beforeEach(() => {
        resident = {
            id: 'testId',
            name: 'testName',
            fields: {
                picture: 'testPicture',
            }
        }
        wrapper = shallow(
            <LmcResidentsSidebarItem
                resident={resident}
                onClick={() => {}}
                isSelected={true}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders a list item', () => {
        expect(wrapper.find('li').length).toEqual(1)
    })
})