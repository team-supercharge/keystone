import React from 'react'
import { shallow } from 'enzyme'
import LmcResidentsSidebarFilter from '../components/LmcResidentsSidebarFilter.jsx'

describe('LmcResidentsSidebarFilter', () => {
    let wrapper
    let onFormMock = jest.fn()
    let onSwitchMock = jest.fn()

    beforeEach(() => {
        wrapper = shallow(
            <LmcResidentsSidebarFilter
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