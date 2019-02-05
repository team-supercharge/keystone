import React from 'react'
import { shallow } from 'enzyme'
import LmcTopTipsCard from '../components/LmcTopTipsCard'

describe('LmcTopTipsCard', () => {
    let wrapper
    let videoUrl

    beforeEach(() => {
        videoUrl = 'TestVideo'

        wrapper = shallow(
            <LmcTopTipsCard
                video={videoUrl}
            />
        )
    })

    test('should render correct snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should render correct video', () => {
        const video = wrapper.find('iframe')
        expect(video.props().src).toEqual(videoUrl)
    })
})