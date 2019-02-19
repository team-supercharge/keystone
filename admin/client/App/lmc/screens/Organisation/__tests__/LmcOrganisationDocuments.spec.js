import React from 'react'
import { shallow } from 'enzyme'
import { LmcOrganisationDocuments } from '../components/LmcOrganisationDocuments.jsx'

describe('LmcOrganisationDocuments', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <LmcOrganisationDocuments />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})