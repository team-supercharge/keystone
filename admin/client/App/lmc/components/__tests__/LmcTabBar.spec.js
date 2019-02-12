import React from 'react'
import { shallow } from 'enzyme'
import { LmcTabBar } from '../LmcTabBar.jsx'
import { Link } from 'react-router'

describe('LmcResidentsNavbar', () => {
    let wrapper
    let items
    let resourceUrl
    let location
    let savedKeystone

    beforeAll(() => {
        savedKeystone = global.Keystone
        global.Keystone = {
            adminPath: '/admin'
        }
        location = {
            pathname: 'testPathname'
        }
        items = [
            { label: 'label1', url: 'url1' },
            { label: 'label2', url: 'url2' }
        ]
        resourceUrl = 'testResourceUrl'
    })

    beforeEach(() => {
        wrapper = shallow(
            <LmcTabBar
                location={location}
                items={items}
                resourceUrl={resourceUrl}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders a navigation element', () => {
        expect(wrapper.find('nav').length).toEqual(1)
    })

    it('renders an unordered list', () => {
        expect(wrapper.find('ul').length).toEqual(1)
    })

    it('renders links to the correct urls', () => {
        const firstLink = wrapper.find(Link).first()
        const secondLink = wrapper.find(Link).at(1)

        expect(firstLink.props().to).toEqual('/admin/testResourceUrl/url1')
        expect(secondLink.props().to).toEqual('/admin/testResourceUrl/url2')
    })

    afterAll(() => {
        global.Keystone = savedKeystone
    })
})