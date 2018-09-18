import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'; // https://react-select.com/props
// https://github.com/JedWatson/react-select/blob/v1.x/examples/src/components/CustomComponents.js 
import _ from 'lodash';
import Switch from "react-switch";
import { css, StyleSheet } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { setFormField } from '../actions';


const SelectionComponent = (option) => {
    const rows = option.values.map(row => (
        <span>
            { row.name }
        </span>
    ))
    return (
        <span>
            { rows }
        </span>
    )
}

const OptionComponent = ({ option, onSelect }) => {
    return (
        <div onClick={() => onSelect(option)}>
            { option.name }
        </div>
    )
}

const ToggleButton = ({ title, hideOffLabel=false, offLabel, onLabel, value, onChange, offColor='#cacaca', onColor='#b3d78b' }) => {
    // https://www.npmjs.com/package/react-switch
    const noop = () => {};
    return (
        <div style={{ width: 350, margin: '0 auto' }}>
            {title
                ? <p className={css(classes.questionLabel)}>
                    {title}
                </p>
                : null}
            <br />
            <span style={{ cursor: 'pointer' }} onClick={onChange || noop}>
                <span style={{ paddingRight: 8, position: 'relative', top: -10, opacity: value && hideOffLabel ? 0 : 0.6 }}>
                    {offLabel}
                </span>
                <Switch
                    onChange={noop}
                    checked={value}
                    onColor={onColor}
                    offColor={offColor}
                    // onHandleColor="#cacaca"
                    // offHandleColor="#cacaca"
                    handleDiameter={22}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={28}
                    width={52}
                    id="log-switch"
                />
                <span style={{ paddingLeft: 8, position: 'relative', top: -10, opacity: value || !hideOffLabel ? 0.6 : 0 }}>
                    {onLabel}
                </span>
            </span>
        </div>
    )
}

const LmcSelector = ({ value, onAssignAll, options, onChange, placeholder='Select...' }) => {
    return (
        <div>
            <div style={{ textAlign: 'right', paddingBottom: 5, }}>
                <a onClick={onAssignAll}>Assign All</a>
            </div>
            <Select
                multi
                simpleValue
                // valueComponent={SelectionComponent}
                // optionComponent={OptionComponent}
                closeOnSelect={false}
                value={value}
                placeholder={placeholder}
                labelKey="name"
                valueKey="id"
                options={options}
                onChange={onChange}
            />
        </div>
    )
}

class LmcResidentSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carersSelection: [],
            residentsSelection: [],
            taskType: true, // true = resident, false = home
        }
        this.handleResidentsChange = this.handleResidentsChange.bind(this);
        this.handleCarersChange = this.handleCarersChange.bind(this);
        this.toggleWitness = this.toggleWitness.bind(this);
        this.toggleQuickLog = this.toggleQuickLog.bind(this);
        this.toggleTaskType = this.toggleTaskType.bind(this);
        this.assignAllResidents = this.assignAllResidents.bind(this);
        this.assignAllCarers = this.assignAllCarers.bind(this);
    }

    handleResidentsChange(residentsSelection) {
        this.setState({ residentsSelection });
    }

    handleCarersChange(carersSelection) {
        this.setState({ carersSelection });
    }
    assignAllCarers() {
        this.setState({
            carersSelection: _.sortBy(this.props.carers, 'name'),
        })
    }
    assignAllResidents() {
        this.setState({
            residentsSelection: _.sortBy(this.props.residents, 'name'),
        })
    }

    toggleWitness() {
        this.setState({
            requireWitness: !this.state.requireWitness,
        })
    }

    toggleQuickLog() {
        this.setState({
            requireQuickLog: !this.state.requireQuickLog,
        })
    }

    toggleTaskType() {
        this.setState({
            carersSelection: [],
            residentsSelection: [],
            taskType: !this.state.taskType,
        })
    }

    render() {
        const { residents, carers } = this.props;
        const {
            residentsSelection,
            carersSelection,
            requireWitness,
            taskType,
            requireQuickLog,
        } = this.state;
        // console.log(residents, carers)
        // console.log('_.sortBy(carers, \'name\')', _.sortBy(carers, 'name'))
        const _carers = _.sortBy(carers, 'name');
        const _residents = _.sortBy(residents, 'name');
        return (
            <div style={{ margin: '20px 20px', textAlign: 'center' }}>
                <h2 style={{ textAlign: 'center' }}>
                    Who's it for
                </h2>
                <ToggleButton
                    onChange={this.toggleTaskType}
                    offLabel='Carers'
                    onLabel='Residents'
                    onColor='#cacaca'
                    value={taskType}
                />
                <div className={css(classes.selectContainer)}>
                    { taskType
                        ? <LmcSelector placeholder='Select Residents...'
                            options={_residents}
                            onAssignAll={this.assignAllResidents}
                            value={residentsSelection}
                            onChange={(val) => this.handleResidentsChange(val)}
                        />
                        : <LmcSelector placeholder='Select Carers...'
                            options={_carers}
                            onAssignAll={this.assignAllCarers}
                            value={carersSelection}
                            onChange={(val) => this.handleCarersChange(val)}
                        />
                    }
                </div>
{/*                 
                <div className={css(classes.selectContainer)}>
                    <Select
                        multi
                        simpleValue
                        // valueComponent={SelectionComponent}
                        // optionComponent={OptionComponent}
                        closeOnSelect={false}
                        value={residents}
                        placeholder={taskType ? 'Select Residents...' : 'Select Carers...'}
                        labelKey="name"
                        valueKey="id"
                        options={_.sortBy(data.results, 'name')}
                        onChange={(res) => this.handleChange(res)}
                    />
                </div> */}
                <div>
                    <ToggleButton
                        title='Require a second signature?'
                        onChange={this.toggleWitness}
                        offLabel='No'
                        onLabel='Yes'
                        hideOffLabel
                        value={requireWitness}
                    />
                </div>
                <div>
                    <ToggleButton
                        title='Require carer to add a Quick-log after completing?'
                        onChange={this.toggleQuickLog}
                        offLabel='No'
                        onLabel='Yes'
                        hideOffLabel
                        value={requireQuickLog}
                    />
                </div>
            </div>
        );
    }
}

LmcResidentSelector.propTypes = {
    data: PropTypes.array.isRequired,
};

const classes = StyleSheet.create({
    questionLabel: {
        fontWeight: 'bold',
        margin: '50px 0 0 0',
        lineHeight: 0,
    },
    selectContainer: {
        maxWidth: 640,
        margin: '20px auto 0 auto',
        textAlign: 'left'
    }
});

const mapStateToProps = (state) => ({
    formData: state.modal.formData,
})

const mapDispatchToProps = dispatch => ({
	setFormField: (val) => dispatch(setFormField(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LmcResidentSelector);
