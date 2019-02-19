import React from 'react'
import { shallow } from 'enzyme'
import MockDate from 'mockdate'
import LmcDocumentItem from '../components/LmcDocumentItem';

MockDate.set('1/1/2019')

describe('LmcDocumentItem', () => {
    let wrapper
    let data
    let savedKeystone
    const onDelete = jest.fn()

    beforeEach(() => {
        savedKeystone = global.Keystone
        global.Keystone = { adminPath: '/admin' }

        data = {
            name: 'TestDocument',
            pdf: 'TestLink',
            id: 'TestId'
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

    it('displays a link with the data name to open the document in a new tab', () => {
        const link = wrapper.find('a')
        expect(link.props().href).toEqual(data.pdf)
        expect(link.props().children).toEqual(data.name)
        expect(link.props().target).toEqual('_blank')
    })

    it('displays a button to open the document in a new tab', () => {
        const button = wrapper.find('Button').at(1)
        expect(button.props().href).toEqual(data.pdf)
        expect(button.props().target).toEqual('_blank')
        expect(button.props().children).toEqual('View')
    })

    it("has a 'pencil' button to edit the document", () => {
        const editButton = wrapper.find('GlyphButton')
        expect(editButton.props().to).toEqual('/admin/documents/TestId')
        expect(editButton.props().glyph).toEqual('pencil')
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

    afterAll(() => {
        MockDate.clear()
        global.Keystone = savedKeystone
    })
})