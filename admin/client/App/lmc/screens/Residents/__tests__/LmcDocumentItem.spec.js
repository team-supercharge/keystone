import React from 'react'
import { shallow } from 'enzyme'
import LmcDocumentItem from '../components/LmcDocumentItem';

describe('LmcDocumentItem', () => {
    let wrapper
    let data
    const onDelete = jest.fn()

    beforeEach(() => {
        data = {
            name: 'TestDocument',
            pdf: 'TestLink'
        }
        wrapper = shallow(
            <LmcDocumentItem
                data={data}
                onDelete={onDelete}
            />
        )
    })

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders a list item', () => {
        expect(wrapper.find('li').length).toEqual(1)
    })

    it('renders the data name in a span', () => {
        expect(wrapper.find('span').props().children).toEqual(data.name)
    })

    it('displays a link to open the document in a new tab', () => {
        const link = wrapper.find('a')
        expect(link.props().href).toEqual(data.pdf)
        expect(link.props().target).toEqual('_blank')
        expect(link.props().children).toEqual('View')
    })

    it('has a confirmation dialog to delete the data', () => {
        const dialog = wrapper.find('ConfirmationDialog')
        expect(dialog.props().confirmationType).toEqual('danger')
        expect(dialog.props().confirmationLabel).toEqual('Delete')
    })

    it('executes its onDelete function when confirming the delete dialog', () => {
        const dialog = wrapper.find('ConfirmationDialog')
        dialog.props().onConfirmation()
        expect(onDelete).toBeCalledTimes(1)
    })

    afterEach(() => {
        onDelete.mockClear()
    })
})