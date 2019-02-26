import React from 'react'
import { shallow } from 'enzyme'
import { LmcResidentToDos } from '../components/LmcResidentToDos.jsx'

describe('LmcResidentToDos', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcResidentToDos />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})