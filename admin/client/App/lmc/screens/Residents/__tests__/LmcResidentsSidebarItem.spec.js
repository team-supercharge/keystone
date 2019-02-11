import React from 'react'
import { shallow } from 'enzyme'
import LmcResidentsSidebarItem from '../components/LmcResidentsSidebarItem'

describe('LmcResidentsSidebarItem', () => {
    let wrapper
    let resident
    const onClickMock = jest.fn()

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
                onClick={onClickMock}
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

    it('triggers its onClick prop', () => {
        wrapper.find('li').first().simulate('click')
        expect(onClickMock).toBeCalledTimes(1)
    })
})