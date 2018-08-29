import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LmcResidentSelector extends Component {
    render() {
        return (
            <div style={{ margin: '20px 20px' }}>
                <h2 style={{ textAlign: 'center' }}>
                    Choose a Category
                </h2>
                <div style={{ textAlign: 'center', width: '80%', margin: '40px auto 0' }}>
                    { data.map(row => (
                        <LmcIconButton
                            key={row.id}
                            icon={_.get(row, 'fields.icon.url')}
                            color={row.fields.color}
                            label={row.name}
                            onSelect={() => onSelect(row)}
                        />
                    )) }
                </div>
            </div>
        );
    }
}

LmcResidentSelector.propTypes = {

};

export default LmcResidentSelector;
