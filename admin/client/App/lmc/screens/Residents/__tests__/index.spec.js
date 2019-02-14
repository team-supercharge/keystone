import React from 'react'
import { shallow } from 'enzyme'
import proxyquire from 'proxyquire'
// import { LmcResidentsScreen } from '../index.jsx'

// proxyquire.noCallThru()

// const CreateForm = () => <div></div>

// const { LmcResidentsScreen } = proxyquire('../index.jsx', {
//     '../../../shared/CreateForm': CreateForm,
// })

describe.skip('LmcResidentsScreen', () => {
    let wrapper
    let residents

    beforeEach(() => {
        residents = [
            { id: 'testId1', name: 'testName1' },
            { id: 'testId2', name: 'testName2' },
        ]

        wrapper = shallow(
            <LmcResidentsScreen
                residents={residents}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders the LmcResidentsSidebar', () => {
        expect(wrapper.find('Connect(LmcResidentsSidebar)').length).toEqual(1)
    })

    it('renders a spinner if no data is loaded', () => {
        const loadingWrapper = shallow(
            <LmcResidentsScreen
                residents={null}
            />
        )
        expect(wrapper.find('LmcSpinner').length).toEqual(0)
        expect(loadingWrapper.find('Connect(LmcResidentsSidebar)').length).toEqual(0)
        expect(loadingWrapper.find('BlankState').length).toEqual(0)
        expect(loadingWrapper.find('LmcSpinner').length).toEqual(1)
    })

    it('renders a message if data is successfully loaded, but there are no residents', () => {
        const emptyWrapper = shallow(
            <LmcResidentsScreen
                residents={[]}
            />
        )
        expect(emptyWrapper.find('BlankState').length).toEqual(1)
    })
})