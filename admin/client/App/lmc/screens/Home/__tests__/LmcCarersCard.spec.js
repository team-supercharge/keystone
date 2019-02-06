import React from 'react'
import { shallow } from 'enzyme'
import LmcCarersCard from '../components/LmcCarersCard'
import MockDate from 'mockdate'

MockDate.set('1/1/2019')

describe('LmcCarersCard', () => {
    let wrapper
    let savedKeystone

    beforeAll(() => {
        savedKeystone = global.Keystone
        global.Keystone = { adminPath: 'TestPath' }
    })

    beforeEach(() => {
        wrapper = shallow((
            <LmcCarersCard
                carers={[{ active: true }, { active: true }]}
                logs={[]}
                onCreate={() => {}}
            />
        ))
    })

    test('should render correct snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    afterAll(() => {
        global.Keystone = savedKeystone
        MockDate.reset()
    })
})