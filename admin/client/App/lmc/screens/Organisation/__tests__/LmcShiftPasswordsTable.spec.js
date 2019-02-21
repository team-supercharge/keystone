import React from 'react'
import { shallow } from 'enzyme'
import LmcShiftPasswordsTable from '../components/LmcShiftPasswordsTable.jsx'

describe('LmcShiftPasswordsTable', () => {
    let wrapper
    let shifts

    beforeEach(() => {
        shifts = [
            { id: 'testId1', title: 'testShift1', password: 'testPassword1' },
            { id: 'testId2', title: 'testShift2', password: 'testPassword2' }
        ]

        wrapper = shallow(
            <LmcShiftPasswordsTable
                shifts={shifts}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders a table', () => {
        expect(wrapper.find('table').length).toEqual(1)
    })

    it('shows a message + link to support article for no shifts', () => {
        const emptyWrapper = shallow(
            <LmcShiftPasswordsTable
                shifts={undefined}
            />
        )

        const blankTile = emptyWrapper.find('BlankState')
        expect(blankTile.props().heading).toEqual("You haven't added any shift passwords yet")

        const link = emptyWrapper.find('a')
        const supportLink = 'https://support.logmycare.co.uk/the-care-office/finishing-your-essential-setup/how-do-i-set-up-a-shift-password'
        expect(link.props().href).toEqual(supportLink)
    })
})