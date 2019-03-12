import React from 'react'
import { shallow } from 'enzyme'
import LmcHandoverNoteCard from '../components/LmcHandoverNoteCard.jsx'
import moment from 'moment'

describe('LmcHandoverNoteCard', () => {
    let wrapper
    let note

    beforeEach(() => {
        note = { 
            id: 'id', 
            carer: { name: { first: 'Test', last: 'Carer' }, picture: 'TestPicture' }, 
            createdOn: new Date('1/1/2019'),
            note: 'Lorem ipsum'
        }

        wrapper = shallow(
            <LmcHandoverNoteCard
                note={note}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders the carer\'s first name', () => {
        const name = note.carer.name
        expect(wrapper.text().includes(name.first)).toBe(true)
        expect(wrapper.text().includes(name.last)).toBe(false)
    })

    it('renders the note content', () => {
        expect(wrapper.text().includes(note.note)).toBe(true)
    })

    it('renders the date in the correct format', () => {
        const formattedDate = moment(note.createdOn).format('HH:mm ddd')
        expect(wrapper.text().includes(formattedDate)).toBe(true)
    })
})
