import React from 'react'
import { shallow } from 'enzyme'
import LmcTour from '../components/LmcTour'

describe('LmcTour', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<LmcTour/>)
    })

    test('should render correct snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
})