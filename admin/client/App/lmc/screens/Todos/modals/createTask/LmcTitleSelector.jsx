import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { GlyphButton } from '../../../../../elemental';
import { colors } from '../../../../common/constants';
import { setFormField } from '../../actions';

class LmcTitleSelector extends Component {

    constructor(props) {
        super(props);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.state = {
            validate: false,
        }
    }

    handleTitleChange(event) {
        this.props.setFormField({ key: 'title', value: event.target.value });
    }

    handleDescChange(event) {
        this.props.setFormField({ key: 'description', value: event.target.value });
    }

    isInputValid() {

    }

    componentDidMount() {
        const { title, description } = this.props.formData;
        if (!title) this.refs.title.select();
        else if (!description) this.refs.desc.select();
    }

    onKeyPress(e) {
        // on enter
        if (e.keyCode === 13 && this.props.goToNextStep) {
            this.props.goToNextStep();
        }
    }

    render() {
        const { title, description } = this.props.formData;
        const TITLE_LABEL = 'Title';
        const DESC_LABEL = 'Description';
        const HELP_TEXT = 'This text will be visible to your carers in the Carer App';
        return (
            <div className={css(classes.container)}>
                <div className={css(classes.formField)}>
                    <label for="form-title" className={css(classes.label)}>
                        {TITLE_LABEL}
                    </label>
                    <input type="text"
                        value={title}
                        ref='title'
                        id="form-title"
                        className="LmcFormInput"
                        onKeyDown={this.onKeyPress}
                        onChange={this.handleTitleChange}
                    />
                </div>
                <div className={css(classes.formField)}>
                    <label for="form-description" className={css(classes.label)}>
                        {DESC_LABEL}
                    </label>
                    <textarea
                        ref='desc'
                        // rows="4"
                        style={{ height: 100, minWidth: 400, maxWidth: 400 }}
                        id="form-description"
                        value={description}
                        className="LmcFormInput"
                        onKeyDown={this.onKeyPress}
                        onChange={this.handleDescChange}
                    />
                </div>
                <p className={css(classes.helpText)}>
                    {HELP_TEXT}
                </p>
            </div>
        );
    }
}

LmcTitleSelector.propTypes = {
    onSelect: PropTypes.func,
};

const classes = StyleSheet.create({
    container: {
        maxWidth: 400,
        margin: '40px auto',
    },
    label: {
        textAlign: 'left',
        fontWeight: 'bold',
    },
    formField: {
        paddingTop: 15,
    },
    nextButton: {
        marginTop: 60,
        marginBottom: 40,
    },
    helpText: {
        fontSize: 12,
        color: colors.bw60,
    },
});



const mapStateToProps = (state) => ({
    formData: state.modal.formData,
})

const mapDispatchToProps = dispatch => ({
	setFormField: (val) => dispatch(setFormField(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LmcTitleSelector);
