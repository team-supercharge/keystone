import React from 'react'
import { shallow } from 'enzyme'
import MockDate from 'mockdate'
import LmcHomeTitle from '../components/LmcHomeTitle'

MockDate.set('1/1/2019')

describe('LmcHomeTitle', () => {
    let wrapper

    beforeAll(() => {
        global.Keystone = { 
            user: { 
                firstLogin: new Date('1/1/2019') 
            } 
        } 
    })

    beforeEach(() => {
        wrapper = shallow(
            <LmcHomeTitle
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