import React from 'react'
import { shallow } from 'enzyme'
import LmcHandoversHistory from '../components/LmcHandoversHistory.jsx'

describe('LmcHandoversHistory', () => {
    let wrapper
    let handovers

    beforeEach(() => {
        handovers = {
            'Mar 11th': [
            { 
                notes: [{ id: 'TestId', note: 'This is a note', createdBy: 'TestCarer' }],
                logsByResident: [
                    { 
                        logs: [{ id: 'TestId', description: 'This is a log', createdBy: 'TestCarer' }],
                        resident: { id: 'TestId2', name: 'TestResident', picture: 'TestPicture' }
                    }
                ],
                seenBy: ['TestId1', 'TestId2', 'TestId3']
            }
        ]}
            
        wrapper = shallow(
            <LmcHandoversHistory
                handovers={handovers}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})