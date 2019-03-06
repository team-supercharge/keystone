import React from 'react'
import { shallow } from 'enzyme'
import { LmcDataSource } from '../components/LmcDataSource.jsx'

describe('LmcDataSource', () => {
    let wrapper
    beforeEach(() => {
        const wrapper = shallow(
            <LmcDataSource
                dataFetch={{ fulfilled: true }}
                renderSuccess={() => ( <div id="res"></div> )}
            />
        );
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
})