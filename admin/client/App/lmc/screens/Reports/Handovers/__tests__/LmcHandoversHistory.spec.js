import React from 'react'
import { shallow } from 'enzyme'
import LmcHandoversHistory from '../components/LmcHandoversHistory.jsx'

describe('LmcHandoversHistory', () => {
    let wrapper
    let handovers

    beforeEach(() => {
        handovers = [
            { id: 'TestId', createdBy: 'TestCarer', witnessedBy: 'TestCarer2' }
        ]
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