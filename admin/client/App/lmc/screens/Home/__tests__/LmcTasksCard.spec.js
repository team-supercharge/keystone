import React from 'react'
import { shallow } from 'enzyme'
import MockDate from 'mockdate'
import LmcTasksCard from '../components/LmcTasksCard'

MockDate.set('1/1/2019')

describe('LmcTasksCard', () => {
    let wrapper
    let savedKeystone
    let onCreate
    let logs
    let tasks

    beforeAll(() => {
        savedKeystone = global.Keystone
        global.Keystone = { adminPath: 'TestPath' }
        onCreate = jest.fn()
    })

    beforeEach(() => {
        logs = [{}, {}, {}]
        tasks = {
            completed: 1,
            overdue: 1,
            pending: 1
        }

        wrapper = shallow(
            <LmcTasksCard
                logs={logs}
                tasks={tasks}
                onCreate={onCreate}
            />
        )
    })

    test('should render correct snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('onCreate has correct functionality', () => {
        wrapper.find('GlyphButton').simulate('click')
        expect(onCreate.mock.calls.length).toBe(1)
    })

    afterAll(() => {
        global.Keystone = savedKeystone
        MockDate.reset()
    })
})