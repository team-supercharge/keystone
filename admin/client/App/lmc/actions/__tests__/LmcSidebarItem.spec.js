import React from 'react'
import { shallow } from 'enzyme'
import LmcSidebarItem from '../components/LmcSidebarItem'

describe('LmcSidebarItem', () => {
    let wrapper
    let itemData
    const onClickMock = jest.fn()

    beforeEach(() => {
        itemData = {
            id: 'testId',
            name: 'testName',
            fields: {
                picture: 'testPicture',
            }
        }
        wrapper = shallow(
            <LmcSidebarItem
                itemData={itemData}
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