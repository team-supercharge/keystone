import React from 'react'
import { shallow } from 'enzyme'
import { LmcHandoversDashboard } from '../LmcHandoversDashboard.jsx'

describe('LmcHandoversDashboard', () => {
    let wrapper
    let currentHandoverNotes
    let currentHandoverLogs
    let handoverHistory
    const fetchCurrentHandoverLogs = jest.fn()
    const fetchCurrentHandoverNotes = jest.fn()
    global.Keystone = { 
        adminPath: '/admin', 
        user: { features: { handovers: true } } 
    }

    beforeEach(() => {
        handoverHistory = [
            { id: 'TestId', createdBy: 'TestCarer', witnessedBy: 'TestCarer2' }
        ]
        currentHandoverNotes = [
            { id: 'TestId', note: 'This is a note', createdBy: 'TestCarer' }
        ]
        currentHandoverLogs = [
            { id: 'TestId', description: 'This is a log', createdBy: 'TestCarer' }
        ]

        wrapper = shallow(
            <LmcHandoversDashboard 
                handoverHistory={handoverHistory}
                currentHandoverLogs={currentHandoverLogs}
                currentHandoverNotes={currentHandoverNotes}
                fetchCurrentHandoverLogs={fetchCurrentHandoverLogs}
                fetchCurrentHandoverNotes={fetchCurrentHandoverNotes}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders a BlankState if there is no data to show', () => {
        const emptyWrapper = shallow(
            <LmcHandoversDashboard 
                handoverHistory={[]}
                currentHandoverLogs={[]}
                currentHandoverNotes={[]}
                fetchCurrentHandoverLogs={fetchCurrentHandoverLogs}
                fetchCurrentHandoverNotes={fetchCurrentHandoverNotes}
            />)
        
        expect(wrapper.find('BlankState').length).toEqual(0)
        expect(emptyWrapper.find('BlankState').length).toEqual(1)
    })

    it('renders the current handover and handover history', () => {
        expect(wrapper.find('LmcCurrentHandover').length).toEqual(1)
        expect(wrapper.find('LmcHandoversHistory').length).toEqual(1)
    })
})