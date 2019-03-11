import React from 'react'
import { shallow } from 'enzyme'
import LmcCurrentHandover from '../components/LmcCurrentHandover.jsx'

describe('LmcCurrentHandover', () => {
    let wrapper
    let logs
    let notes

    beforeEach(() => {
        notes = [
            { id: 'TestId', note: 'This is a note', createdBy: 'TestCarer' }
        ]
        logs = [
            { id: 'TestId', description: 'This is a log', createdBy: 'TestCarer' }
        ]
        wrapper = shallow(
            <LmcCurrentHandover
                logs={logs}
                notes={notes}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})