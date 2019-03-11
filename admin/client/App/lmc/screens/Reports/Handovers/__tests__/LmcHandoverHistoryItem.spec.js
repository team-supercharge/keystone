import React from 'react'
import { shallow } from 'enzyme'
import LmcHandoverHistoryItem from '../components/LmcHandoverHistoryItem.jsx'

describe('LmcHandoverHistoryItem', () => {
    let wrapper
    let handover

    beforeEach(() => {
        handover = { 
            notes: [{ id: 'TestId', note: 'This is a note', createdBy: 'TestCarer' }],
            logsByResident: [
                { 
                    logs: [{ id: 'TestId', description: 'This is a log', createdBy: 'TestCarer' }],
                    resident: { id: 'TestId2', name: 'TestResident', picture: 'TestPicture' }
                }
            ],
            seenBy: ['TestId1', 'TestId2', 'TestId3']
        }
        wrapper = shallow(
            <LmcHandoverHistoryItem
                handover={handover}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})