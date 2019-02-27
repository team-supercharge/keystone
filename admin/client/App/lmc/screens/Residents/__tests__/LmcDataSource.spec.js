import React from 'react'
import { shallow } from 'enzyme'
import { LmcDataSource } from '../components/LmcDataSource.jsx'

describe('LmcDataSource', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(
            <LmcDataSource />
        )
    })

    it('renders correctly', () => {
        const wrapper = shallow(
            <LmcDataSource
                dataFetch={{ fulfilled: true }}
                renderSuccess={() => ( <div id="res"></div> )}
            />
        );
        expect(wrapper).toMatchSnapshot()
    })
})