import React, { Component } from 'react';
import introJs from 'intro.js';
import {
    ResponsiveText,
    GlyphButton,
} from '../../../../elemental';

class LmcTour extends Component {

    startTour() {
        this.props.onStart();
        introJs()
            .setOption('exitOnOverlayClick', true)
            .setOption('scrollToElement', true)
            .setOption('hideNext', true)
            .setOption('disableInteraction', true)
            .onskip(function () {
                console.log('onbeforeexit')
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-step-dashboard')[0],
                intro: TOUR_HELLO,
                position: 'top',
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-step-residents')[0],
                intro: TOUR_RESIDENTS,
                position: 'right',
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-step-add-residents')[0],
                intro: TOUR_ADD_RESIDENTS,
                position: 'right',
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-step-carers')[0],
                intro: TOUR_CARERS,
                position: 'top',
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-step-add-carers')[0],
                intro: TOUR_CARERS_INVITE,
                position: 'top',
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-step-incidents')[0],
                intro: TOUR_INCIDENTS,
                position: 'left',
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-step-tasks')[0],
                intro: TOUR_TASKS,
                position: 'left',
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-step-tasks-info')[0],
                intro: TOUR_TASKS_INFO,
                position: 'top',
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-step-advert')[0],
                intro: TOUR_ADVERT,
                position: 'left',
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-step-navbar')[0],
                intro: TOUR_NAVBAR,
                position: 'bottom',
            })
            .addStep({
                element: document.querySelectorAll('#intro-js-done')[0],
                intro: TOUR_DONE,
                hideNext: true,
                position: 'top',
            })
            .start();
    }

    componentWillUnmount() {
        introJs().exit();
    }

    render() {
        return (
            <div style={{ paddingTop: 20, width: 200 }}>
                <GlyphButton
                    block
                    color="success"
                    glyph="play"
                    onClick={this.startTour.bind(this)}
                    position="left"
                    title={`Start Tour`}
                >
                    <ResponsiveText
                        visibleSM="Start Tour"
                        visibleMD="Start Tour"
                        visibleLG={`Start Tour`}
                    />
                </GlyphButton>
            </div>
        );
    }
}

const TOUR_HELLO = 'On the home page you\'ll see a snapshot of what has been happening over the last day and can perform some quick actions.';
const TOUR_RESIDENTS = 'Up here you\'ll see your active residents, these are those that are currently in your home';
const TOUR_ADD_RESIDENTS = 'The first step is to add your residents and assign them to your care team. This information then gets sent to the Carer App and allows carers to record care on the go.'
const TOUR_CARERS = 'Down here you can see who from your care team has been online and logged care today.';
const TOUR_CARERS_INVITE = 'You can also invite other members of your team to join you in Log my Care.';
const TOUR_INCIDENTS = 'Next is your incidents list. This gets populated when your carers record an incident log on the Carer App and lets you know what you need to deal with.';
const TOUR_TASKS = 'The last section shows you the status of today’s To-Do\'s and Logs. This is where your scheduled care tasks and ad-hoc quick-logs recorded by your care team show up. ';
const TOUR_TASKS_INFO = 'You can instantly see how many To-Do\'s are overdue, pending and have been completed today.';
const TOUR_ADVERT = 'On the right you can see our tips and tricks videos to help you make the most of Log my Care along with our latest offers.';
const TOUR_NAVBAR = 'Along the top you\'ll see menu options for all features, including how to access our help centre.';
const TOUR_DONE = 'That\'s it - you\'ve finished the walkthrough of the Care Office!';


export default LmcTour;
