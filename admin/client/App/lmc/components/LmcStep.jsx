// Inspired by: https://hackernoon.com/how-to-build-a-stepper-with-compound-components-6a49d90950ba

import React from "react";
import { css, StyleSheet } from 'aphrodite/no-important';
import { GlyphButton } from '../../elemental';
import LmcButton from './LmcButton.jsx';

class LmcStep extends React.Component {

  render() {
    const {
      isActive,
      displayPrevious,
      displayNext,
      displaySubmit,
      component,
      goToPreviousStep,
      goToNextStep,
      data,
      showNextButton,
      onSubmit,
    //   children,
    } = this.props;

    if (isActive === false) return null;

    return (
      <div>
        <div className={css(classes.formContainer)}>
            {React.createElement(component, { data, goToPreviousStep, goToNextStep })}
        </div>
        <div>
            {/* <Previous
            isActive={displayPrevious}
            goToPreviousStep={() => goToPreviousStep()}
            /> */}
            <Next
                isActive={showNextButton && displayNext}
                goToNextStep={() => goToNextStep()}
            />
            <Submit
                isActive={displaySubmit}
                onSubmit={onSubmit}
            />
        </div>
      </div>
    );
  }
}

class Next extends React.Component {
  render() {
    const { isActive, showNextButton } = this.props;
    if (!isActive) return null;

    return (
        <div className={css(classes.nextButton)}>
            <LmcButton
                onClick={this.props.goToNextStep}
                color="green"
                position="center"
                glyph="chevron-left"
            >
                Next Step
            </LmcButton>
        </div>
    );
  }
}

class Previous extends React.Component {
    render() {
        const { isActive } = this.props;
        if (!isActive) return null;

        return (
            <LmcButton
                onClick={this.props.goToPrevStep}
                color="green"
                position="center"
                glyph="chevron-left"
            >
                Previous Step
            </LmcButton>
        );
    }
}

class Submit extends React.Component {
    render() {
        const { isActive, onSubmit } = this.props;
        if (!isActive) return null;

        return (
            <div className={css(classes.nextButton)}>
                <LmcButton
                    onClick={onSubmit}
                    color="green"
                    position="center"
                    glyph="chevron-left"
                >
                    Add this ToDo
                </LmcButton>
            </div>
        );
    }
}

const classes = StyleSheet.create({
    formContainer: {
        paddingBottom: 30,
    },
    nextButton: {
        textAlign: 'center',
    }
});

export default LmcStep;
