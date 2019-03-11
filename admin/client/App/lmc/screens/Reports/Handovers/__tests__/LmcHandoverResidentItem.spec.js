import React from 'react'
import { shallow } from 'enzyme'
import LmcHandoverResidentItem from '../components/LmcHandoverResidentItem.jsx'

describe('LmcHandoverResidentItem', () => {
    let wrapper
    let data

    beforeEach(() => {
        data = { 
            logs: [{ id: 'TestId', description: 'This is a log', createdBy: 'TestCarer' }],
            resident: { id: 'TestId2', name: 'TestResident', picture: 'TestPicture' }
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
})