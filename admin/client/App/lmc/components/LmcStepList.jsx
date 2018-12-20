import React from "react";
import { css, StyleSheet } from 'aphrodite/no-important';
import _ from 'lodash';
import { colors } from '../common/constants';
import LmcDot from './LmcDot.jsx';


class LmcStepList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 0,
            maxStep: 0,
            totalSteps: this.props.children.length - 1,
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderBackIcon = this.renderBackIcon.bind(this);
        this.goToNextStep = this.goToNextStep.bind(this);
        this.goToPreviousStep = this.goToPreviousStep.bind(this);
    }

    goToStep(currentStep) {
        const maxStep = currentStep > this.state.maxStep ? currentStep : this.state.maxStep;
        this.setState({ currentStep, maxStep });
    }

    goToPreviousStep() {
        const { currentStep } = this.state;
        this.goToStep(currentStep - 1);
    }

    goToNextStep() {
        const { currentStep } = this.state;
        this.goToStep(currentStep + 1);
    }

    renderHeader() {
        const { onClose, closeLabel } = this.props;
        const { currentStep, totalSteps, maxStep } = this.state;

        const handleClick = (d) => {
            if (d <= maxStep) this.goToStep(d);
        };

        const dots = _.range(0, totalSteps + 1).map(d =>
            <div onClick={() => handleClick(d)}
                style={{ cursor: (d <= maxStep) && 'pointer' }}
                className={css(classes.dot, d === currentStep ? classes.activeDot : null)} />
        );

        return (
            <div className={css(classes.headerContainer)}>
                <div className={css(classes.cancelButton)} onClick={() => onClose()}>
                    <LmcDot label={'X'}
                        selectable
                        color={colors.red}
                        active={true}
                        size={24}
                        fontSize={12} />
                    { closeLabel }
                </div>
                <div className={css(classes.dotConatiner)}>
                    {dots}
                </div>
            </div>
        )
    }
    
    renderBackIcon() {
        const { backIconColor, backIcon, backText } = this.props;
        const { currentStep } = this.state;
        if (!backIcon || currentStep === 0) return <div className={css(classes.selectionContainer)}> </div>
        const iconColor = backIconColor || '#f9f9f9';
        return (
            <div className={css(classes.selectionContainer)}>
                <a className={css(classes.selectionLink)} onClick={this.goToPreviousStep}>
                    <div className={css(classes.iconButton)} style={{ backgroundColor: iconColor}}>
                        <img src={backIcon} className={css(classes.icon)}/>
                    </div>
                    {backText}
                </a>
            </div>
        )
    }

    render() {
        const { currentStep, totalSteps } = this.state;
        const { header, children } = this.props;
        const steps = React.Children.map(children, (child, index) => {
            const isValidated = false;
            return React.cloneElement(child, {
                isActive: index === currentStep,
                displayPrevious: currentStep > 0,
                displayNext: currentStep < totalSteps,
                displaySubmit: currentStep === totalSteps,
                goToPreviousStep: this.goToPreviousStep,
                goToNextStep: this.goToNextStep,
            });
        });

        return (
            <div className={css(classes.container)}>
                { this.renderHeader() }
                { this.renderBackIcon() }
                { header || null }
                { steps || null }
            </div>
        );
    }
}

const classes = StyleSheet.create({
    container: {
        width: '100vw',
        zIndex: 100,
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100vh',
        overflow: 'scroll',
        background: 'white',
    },
    selectionContainer: {
        textAlign: 'center',
        height: 50,
    },
    selectionLink: {
        color: '#c1c1c1',
        fontSize: 15,
        paddingTop: 8,
        letterSpacing: '0.8px',
        fontWeight: 300,
    },
    categorySelection: {
        opacity: 0.8,
        textAlign: 'center',
    },
    iconButton: {
        width: 30,
        height: 30,
        borderRadius: 10,
        margin: '0 auto 5px',
    },
    icon: {
        width: 12,
        marginTop: 6,
    },
    headerContainer: {
        paddingBottom: 50,
        paddingTop: 40,
    },
    cancelButton: {
        marginLeft: 50,
        position: 'relative',
        top: 20,
        width: 200,
        ':hover': {
            opacity: 0.7,
            cursor: 'pointer',
        }
    },
    dotConatiner: {
        textAlign: 'center',
    },
    dot: {
        height: 11,
        width: 11,
        margin: '0 8px',
        backgroundColor: '#d1d3d4',
        borderRadius: '50%',
        display: 'inline-block',
    },
    activeDot: {
        backgroundColor: colors.red,
    },
});

export default LmcStepList;
