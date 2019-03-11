import React from 'react'
import { shallow } from 'enzyme'
import LmcHandoverNotes from '../components/LmcHandoverNotes.jsx'

describe('LmcHandoverNotes', () => {
    let wrapper
    let notes

    beforeEach(() => {
        notes = [
            { id: 'id', createdBy: 'TestCarer', createdOn: new Date('1/1/2019') },
            { id: 'id2', createdBy: 'TestCarer2', createdOn: new Date('1/1/2019') }
        ]
        wrapper = shallow(
            <LmcHandoverNotes
                notes={notes}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders an LmcHandoverNoteCard for each note', () => {
        const firstNote = wrapper.find('LmcHandoverNoteCard').first()
        expect(wrapper.find('LmcHandoverNoteCard').length).toEqual(notes.length)
        expect(firstNote.props().note).toEqual(notes[0])
    })
})