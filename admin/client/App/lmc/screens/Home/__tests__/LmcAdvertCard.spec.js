import React from 'react'
import { shallow } from 'enzyme'
import LmcAdvertCard from '../components/LmcAdvertCard'

describe('LmcAdvertCard', () => {
    let wrapper
    let url
    let img

    beforeEach(() => {
        url = 'TestUrl'
        img = 'TestImage'

        wrapper = shallow((
            <LmcAdvertCard
                url={url}
                image={img}
            />
        ));
    })
    test('should render correct snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('should have correct link', () => {
        const link = wrapper.find('a')
        expect(link.props().href).toEqual(url)
    })

    test('should have correct image', () => {
        const image = wrapper.find('img')
        expect(image.props().src).toEqual(img)
    })
})