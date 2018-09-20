import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LmcIconButton from '../../../../components/LmcIconButton.jsx';
import _ from 'lodash';
import { connect } from 'react-redux';
import { setFormField } from '../../actions';


class LmcItemSelector extends Component {
    constructor(props) {
        super(props);
    }

    onSelect(itemId, title) {
        if (itemId) this.props.setFormField({ key: 'item', value: itemId });
        this.props.setFormField({ key: 'title', value: title });
        this.props.setFormField({ key: 'description', value: null });
        if (this.props.goToNextStep) this.props.goToNextStep();
    }

    render() {
        const { data: { items } } = this.props;
        return (
            <div style={{ margin: '20px 20px' }}>
                <h2 style={{ textAlign: 'center' }}>
                    Choose an Item
                </h2>
                <div style={{ textAlign: 'center', width: '80%', margin: '40px auto 30px' }}>
                    { items.map(row => (
                        <LmcIconButton
                            key={row.id}
                            icon={_.get(row, 'fields.icon.url') || _.get(row, 'fields.category.fields.icon.url')}
                            color={row.fields.color || _.get(row, 'fields.categoryData.fields.color')}
                            label={row.name}
                            onSelect={() => this.onSelect(row.id, row.name.split('/ ').slice(-1)[0])}
                        />
                    )) }
                </div>
                <div style={{ textAlign: 'center', paddingTop: 30 }}>
                    <h3 onClick={() => this.onSelect()}>
                        + Add Custom
                    </h3>
                </div>
            </div>
        );
    }
}

LmcItemSelector.propTypes = {
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    formData: state.modal.formData,
})

const mapDispatchToProps = dispatch => ({
	setFormField: (val) => dispatch(setFormField(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LmcItemSelector);
