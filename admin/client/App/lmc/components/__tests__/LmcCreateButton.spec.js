jest.mock('../../../shared/CreateForm')
jest.mock('../../../../utils/List')

import React from 'react'
import { shallow } from 'enzyme'
import LmcCreateButton from '../LmcCreateButton.jsx'

describe('LmcCreateButton', () => {
    let wrapper
    let listId
    let title
    let buttonText
    let styles
    const savedKeystone = global.Keystone
    const onCreate = jest.fn()

    beforeAll(() => {
        global.Keystone = { lists: { 'Resident': 'Resident' } }
    })

    beforeEach(() => {
        listId = 'TestList'
        title = 'TestTitle'
        buttonText = 'TestItem'
        styles = {
            button: {
                width: 200
            }
        }

        wrapper = shallow(
            <LmcCreateButton
                listId={listId}
                title={title}
                buttonText={buttonText}
                onCreate={onCreate}
                style={styles.button}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders the correct button', () => {
        const button = wrapper.find('GlyphButton')
        expect(button.props().title).toEqual('Add a TestItem')
        expect(button.props().style).toEqual(styles.button)
    })

    it('renders a CreateForm when the button is pressed', () => {
        const button = wrapper.find('GlyphButton')
        expect(wrapper.find('CreateForm').length).toEqual(0)

        button.simulate('click')
        expect(wrapper.find('CreateForm').length).toEqual(1)
    })

    afterEach(() => {
        onCreate.mockClear()
    })
    
    afterAll(() => {
        global.Keystone = savedKeystone
    })
})