import React from 'react'
import { shallow } from 'enzyme'
import LmcSidebarFilter from '../LmcSidebarFilter.jsx'

describe('LmcSidebarFilter', () => {
    let wrapper
    const onFormMock = jest.fn()
    const onSwitchMock = jest.fn()

    beforeEach(() => {
        wrapper = shallow(
            <LmcSidebarFilter
                onFormChange={onFormMock}
                onSwitchChange={onSwitchMock}
                isChecked={true}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('triggers its form change function', () => {
        wrapper.find('FormInput').simulate('change')
        expect(onFormMock).toBeCalledTimes(1)
    })

    it('triggers its switch change function', () => {
        wrapper.find('ReactSwitch').simulate('change')
        expect(onSwitchMock).toBeCalledTimes(1)
    })
})