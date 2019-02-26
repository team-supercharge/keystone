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
                isShowingNameFilter={true}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('does not render a name filter if isShowingNameFilter is false', () => {
        const secondWrapper = shallow(
            <LmcSidebarFilter
                onFormChange={onFormMock}
                onSwitchChange={onSwitchMock}
                isChecked={true}
                isShowingNameFilter={false}
            />
        )
        expect(wrapper.find('FormInput').length).toEqual(1)
        expect(secondWrapper.find('FormInput').length).toEqual(0)
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