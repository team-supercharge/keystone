import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LmcIconButton from '../../../../components/LmcIconButton.jsx';
import _ from 'lodash';
import { connect } from 'react-redux';
import { setFormField } from '../../actions';


class LmcCategorySelector extends Component {

    onSelect(id) {
        this.props.setFormField({ key: 'category', value: id });
        this.props.setFormField({ key: 'item', value: null });
        if (this.props.goToNextStep) this.props.goToNextStep();
    }

    render() {
        const { data } = this.props;
        const categories = _.filter(data.categories, d => d.name && !d.name.match(/incident/i));
        return (
            <div style={{ margin: '20px 20px' }}>
                <h2 style={{ textAlign: 'center' }}>
                    Choose a Category
                </h2>
                <div style={{ textAlign: 'center', width: '80%', margin: '40px auto 0' }}>
                    { categories.map(row => (
                        <LmcIconButton
                            key={row.id}
                            icon={_.get(row, 'fields.icon.url')}
                            color={row.fields.color}
                            label={row.name}
                            onSelect={() => this.onSelect(row.id)}
                        />
                    )) }
                </div>
            </div>
        );
    }
}

LmcCategorySelector.propTypes = {
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    formData: state.modal.formData,
})

const mapDispatchToProps = dispatch => ({
	setFormField: (val) => dispatch(setFormField(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LmcCategorySelector);
