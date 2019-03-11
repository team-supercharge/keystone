import React from 'react'
import { shallow } from 'enzyme'
import { LmcHandoversDashboard } from '../LmcHandoversDashboard.jsx'

describe('LmcHandoversDashboard', () => {
    let wrapper
    let currentHandover
    let handoverHistory
    const fetchCurrentHandover = jest.fn()
    global.Keystone = { 
        adminPath: '/admin', 
        user: { features: { handovers: true } } 
    }

    beforeEach(() => {
        handoverHistory = [
            { id: 'TestId', createdBy: 'TestCarer', witnessedBy: 'TestCarer2' }
        ]
        currentHandover = {
            logs: [{ id: 'TestId', note: 'This is a note', createdBy: 'TestCarer' }],
            notes: [{ id: 'TestId', description: 'This is a log', createdBy: 'TestCarer' }]
        }

        wrapper = shallow(
            <LmcHandoversDashboard 
                handoverHistory={handoverHistory}
                currentHandover={currentHandover}
                fetchCurrentHandover={fetchCurrentHandover}
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
                currentHandover={{ logs: [], notes: [] }}
                fetchCurrentHandover={fetchCurrentHandover}
            />)
        
        expect(wrapper.find('BlankState').length).toEqual(0)
        expect(emptyWrapper.find('BlankState').length).toEqual(1)
    })

    it('renders the current handover and handover history', () => {
        expect(wrapper.find('LmcCurrentHandover').length).toEqual(1)
        expect(wrapper.find('LmcHandoversHistory').length).toEqual(1)
    })
})