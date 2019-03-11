import React from 'react'
import { shallow } from 'enzyme'
import LmcHandoverResidentItem from '../components/LmcHandoverResidentItem.jsx'

describe('LmcHandoverResidentItem', () => {
    let wrapper
    let data

    beforeEach(() => {
        data = { 
            logs: [{ id: 'TestId', description: 'This is a log', createdBy: 'TestCarer' }],
            resident: { id: 'TestId2', preferredName: 'Testy', name: { first: 'Test' , last: 'Name' }, picture: 'TestPicture' }
        }

        wrapper = shallow(
            <LmcHandoverResidentItem
                data={data}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders the resident name and preferred name', () => {
        const nameText = 'Testy (Test Name)'
        expect(wrapper.text().includes(nameText)).toBe(true)
    })

    it('renders an LmcTimelineRow with the correct log', () => {
        const row = wrapper.find('LmcTimelineRow')
        expect(row.props().log).toEqual(data.logs[0])
    })
})