jest.mock('../../../../shared/CreateForm')

import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentsScreen } from '../index.jsx'

describe('LmcResidentsScreen', () => {
    let wrapper
    let residents
    const fetchResidentsAndSelectMock = jest.fn()
    const selectListMock = jest.fn()
    const setSelectedResidentMock = jest.fn()

    beforeEach(() => {
        residents = [
            { id: 'testId1', name: 'testName1' },
            { id: 'testId2', name: 'testName2' },
        ]

        wrapper = shallow(
            <LmcResidentsScreen
                fetchResidentsAndSelect={fetchResidentsAndSelectMock}
                residents={residents}
                selectedResident={residents[0].id}
                selectList={selectListMock}
                setSelectedResident={setSelectedResidentMock}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders an LmcSidebar', () => {
        expect(wrapper.find('LmcSidebar').length).toEqual(1)
    })

    it('renders a spinner if no data is loaded', () => {
        const loadingWrapper = shallow(
            <LmcResidentsScreen
                fetchResidentsAndSelect={fetchResidentsAndSelectMock}
                residents={null}
                selectedResident={null}
                selectList={selectListMock}
                setSelectedResident={setSelectedResidentMock}
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
                fetchResidentsAndSelect={fetchResidentsAndSelectMock}
                residents={[]}
                selectedResident={null}
                selectList={selectListMock}
                setSelectedResident={setSelectedResidentMock}
            />
        )
        expect(emptyWrapper.find('BlankState').length).toEqual(1)
    })
})