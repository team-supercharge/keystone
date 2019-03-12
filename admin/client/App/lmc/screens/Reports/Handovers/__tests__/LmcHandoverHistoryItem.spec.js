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
            seenBy: ['TestId1', 'TestId2', 'TestId3'],
            createdOn: new Date('1/1/2019').toString(),
            createdBy: {},
            witnessedBy: {}
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

    it('renders an LmcHandoverTitleBar with the correct props', () => {
        const bar = wrapper.find('LmcHandoverTitleBar')
        const { createdOn, createdBy, witnessedBy } = bar.props()
        expect(createdOn).toEqual(handover.createdOn)
        expect(createdBy).toEqual(handover.createdBy)
        expect(witnessedBy).toEqual(handover.witnessedBy)
    })

    it('renders an LmcHandoverResidentItem with the correct props', () => {
       const residentItem = wrapper.find('LmcHandoverResidentItem')
       expect(residentItem.props().data).toEqual(handover.logsByResident[0]) 
    })

    it('renders an LmcHandoverNotes with the correct props', () => {
        const notes = wrapper.find('LmcHandoverNotes')
        expect(notes.props().notes).toEqual(handover.notes)
    })
})