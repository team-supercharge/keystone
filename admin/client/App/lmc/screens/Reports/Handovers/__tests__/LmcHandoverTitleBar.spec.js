import React from 'react'
import { shallow } from 'enzyme'
import LmcHandoverTitleBar from '../components/LmcHandoverTitleBar.jsx'

describe('LmcHandoverTitleBar', () => {
    let wrapper
    let createdOn
    let createdBy
    let witnessedBy
    let onClick = jest.fn()
    global.moment = () => ({ format: () => {} })

    beforeEach(() => {
        createdOn = new Date('1/1/2019').toString()
        createdBy = { name: { first: 'Test', last: 'Carer' }, picture: 'TestPicture' }
        witnessedBy = { name: { first: 'Test2', last: 'Carer2' }, picture: 'TestPicture2' }
        wrapper = shallow(
            <LmcHandoverTitleBar
                createdOn={createdOn}
                createdBy={createdBy}
                witnessedBy={witnessedBy}
                onClick={onClick}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders both carer first names', () => {
        expect(wrapper.text().includes(createdBy.name.first)).toBe(true)
        expect(wrapper.text().includes(witnessedBy.name.first)).toBe(true)
    })

    it('triggers its onClick prop when clicking its main container', () => {
        const container = wrapper.find('div').first()
        container.simulate('click')
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})