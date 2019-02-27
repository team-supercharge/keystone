import React from 'react'
import { shallow } from 'enzyme'
import MockDate from 'mockdate'
import LmcIncidentsCard from '../components/LmcIncidentsCard'

MockDate.set('1/1/2019')

describe('LmcIncidentsCard', () => {
    let wrapper

    beforeAll(() => {
        global.Keystone = { adminPath: 'TestPath' }
    })

    beforeEach(() => {
        wrapper = shallow(
            <LmcIncidentsCard
                logs={[]}
                residents={[]}
            />
        )
    })

    test('should render correct snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    
    afterAll(() => {
        MockDate.reset()
    })
})