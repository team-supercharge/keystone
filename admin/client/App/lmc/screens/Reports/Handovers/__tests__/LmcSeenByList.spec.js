import React from 'react'
import { shallow } from 'enzyme'
import { LmcSeenByList } from '../components/LmcSeenByList.jsx'

describe('LmcSeenByList', () => {
    let wrapper
    let carers

    beforeEach(() => {
        carers = [
            { id: 'id1', name: { first: 'test', last: 'carer' }},
            { id: 'id2', name: { first: 'test', last: 'carer2' }},
            { id: 'id3', name: { first: 'test', last: 'carer3' }}
        ]
        wrapper = shallow(
            <LmcSeenByList 
                carers={carers}
                seenBy={carers}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})