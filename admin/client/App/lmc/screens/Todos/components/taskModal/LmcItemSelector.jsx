import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LmcIconButton from '../LmcIconButton.jsx';
import _ from 'lodash';

class LmcItemSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, category, onSelect } = this.props;
        return (
            <div style={{ margin: '20px 20px' }}>
                <h2 style={{ textAlign: 'center' }}>
                    Choose an Item
                </h2>
                <div style={{ textAlign: 'center', width: '80%', margin: '40px auto 30px' }}>
                    { data.map(row => (
                        <LmcIconButton
                            key={row.id}
                            icon={_.get(row, 'fields.icon.url') || _.get(row, 'fields.category.fields.icon.url')}
                            color={row.fields.color || _.get(row, 'fields.categoryData.fields.color')}
                            label={row.name}
                            onSelect={() => onSelect(row)}
                        />
                    )) }
                </div>
                <div style={{ textAlign: 'center', paddingTop: 30 }}>
                    <h3>
                        + Add Custom
                    </h3>
                </div>
            </div>
        );
    }
}

LmcItemSelector.propTypes = {

};

export default LmcItemSelector;
