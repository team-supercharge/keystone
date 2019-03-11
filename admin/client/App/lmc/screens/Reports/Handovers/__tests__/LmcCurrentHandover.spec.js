import React from 'react'
import { shallow } from 'enzyme'
import LmcCurrentHandover from '../components/LmcCurrentHandover.jsx'

describe('LmcCurrentHandover', () => {
    let wrapper
    let logsByResident
    let notes

    beforeEach(() => {
        notes = [
            { id: 'TestId', note: 'This is a note', createdBy: 'TestCarer' }
        ]
        logsByResident = [
            { 
                logs: [{ id: 'TestId', description: 'This is a log', createdBy: 'TestCarer' }],
                resident: { id: 'TestId2', name: 'TestResident', picture: 'TestPicture' }
            }
        ]
        wrapper = shallow(
            <LmcCurrentHandover
                logsByResident={logsByResident}
                notes={notes}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders the correct heading', () => {
        const heading = wrapper.find('h2')
        expect(heading.text()).toEqual('Current Handover')
    })
})