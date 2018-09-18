// Inspired by: https://hackernoon.com/how-to-build-a-stepper-with-compound-components-6a49d90950ba

import React from "react";
import { css, StyleSheet } from 'aphrodite/no-important';
import { GlyphButton } from '../../elemental';


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
      showNextButton
    //   children,
    } = this.props;
    console.log()

    if (isActive === false) return null;
    return (
      <div>
        {React.createElement(component, { data, goToPreviousStep, goToNextStep })}
        <div>
            {/* <Previous
            isActive={displayPrevious}
            goToPreviousStep={() => goToPreviousStep()}
            /> */}
            <Next
                isActive={showNextButton && displayNext}
                goToNextStep={() => goToNextStep()}
            />
            <Submit isActive={displaySubmit} />
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
            <GlyphButton
                onClick={() => this.props.goToNextStep()}
                glyph="chevron-left"
                color="success"
                position="center">
                Next Step
            </GlyphButton>
        </div>
    );
  }
}

class Previous extends React.Component {

  render() {
    const { isActive } = this.props;
    if (!isActive) return null;

    return (
      <button onClick={() => this.props.goToPreviousStep()}>
        Previous Step
      </button>
    );
  }
}

class Submit extends React.Component {

  render() {
    const { isActive } = this.props;
    // const isValid = valid
    if (!isActive) return null;

    return (
      <button type="submit">
        Save
      </button>
    );
  }
}

const classes = StyleSheet.create({
    nextButton: {
        textAlign: 'center',
    }
});

export default LmcStep;
