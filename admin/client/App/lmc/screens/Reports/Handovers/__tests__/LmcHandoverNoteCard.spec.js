import React from 'react'
import { shallow } from 'enzyme'
import LmcHandoverNoteCard from '../components/LmcHandoverNoteCard.jsx'

describe('LmcHandoverNoteCard', () => {
    let wrapper
    let note

    beforeEach(() => {
        note = { 
            id: 'id', 
            carer: { name: { first: 'Test', last: 'Carer' }, picture: 'TestPicture' }, 
            createdOn: new Date('1/1/2019') 
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
})
