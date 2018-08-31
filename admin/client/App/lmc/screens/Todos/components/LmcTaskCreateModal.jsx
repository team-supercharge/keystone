import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import { connect, PromiseState } from 'react-refetch';
import _ from 'lodash';

import {
    BlankState,
} from '../../../../elemental';
import LmcResidentSelector from './LmcResidentSelector.jsx';
import LmcTimeSelector from './LmcTimeSelector.jsx';
import LmcItemSelector from './LmcItemSelector.jsx';
import LmcCategorySelector from './LmcCategorySelector.jsx';
import LmcLoadingScreen from '../../../components/LmcLoadingScreen.jsx';
import { LmcDot } from '../../../components';


class LmcTaskCreateModal extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            currentStep: 0,//
            category: null,
            item: null,
            recurrance: null,
            type: 'resident',
            residents: null,
            witness: null,
            quickLog: null,
            quickLogItem: null,
        }
        this.renderForm = this.renderForm.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderSelection = this.renderSelection.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    nextStep() {
        this.setState({ currentStep: this.state.currentStep + 1 });
    }

    prevStep() {
        this.setState({ currentStep: this.state.currentStep - 1 });
    }

    filterData(home, categories, allItems, category) {
        const { group } = home.results[0];
        const categoryId = category && category.id;
        const items = _.chain(allItems.results)
            .filter({ fields: { category: categoryId }})
            .cloneDeep()
            .map(item => {
                item.fields.categoryData = _.find(categories.results, { id: item.fields.category });
                return item;
            })
            .value();

        return {
            items,
            categories: _.filter(categories.results, { fields: { group }}),
        }
    }

    formatName(name) {
        return (name.split('/')[1] || name).replace(/^\s/, '');
    }

    renderForm() {
        const {
            currentStep,
            category,
            item,
        } = this.state;

        const {
            categoryFetch,
            homeFetch,
            itemFetch,
            residentsFetch,
            carersFetch,
        } = this.props;

        const allFetches = PromiseState.all([homeFetch, categoryFetch, itemFetch, residentsFetch, carersFetch]);
        if (allFetches.pending) return <LmcLoadingScreen />;
        if (!allFetches.fulfilled) return <BlankState heading={'Oops.. Something went wrong'} />;

        const { items, categories } = this.filterData(homeFetch.value, categoryFetch.value, itemFetch.value, category);

        switch (currentStep) {
        case 0:
            return <LmcCategorySelector
                data={categories}
                onSelect={category => {
                    this.setState({ category });
                    this.nextStep();
                }} />;
        case 1:
            return <LmcItemSelector
                data={items}
                onSelect={_item => {
                    this.setState({ item: _item });
                    this.nextStep();
                }} />
        case 2:
            return <LmcTimeSelector
                onSelect={recurrence => {
                    this.setState({ recurrence });
                    this.nextStep();
                }}
            />;
        case 3:
            return <LmcResidentSelector
                residents={residentsFetch.value.results}
                carers={carersFetch.value.results}
                onComplete={({ residents, requireSignature }) => {
                    this.setState({ residents, requireSignature });
                    this.submit(); // Complete
                }}
            />;
        default:
            return null;
        };
    }

    submit() {

    }

    renderCategoryIcon(icon, color) {
        return (
            <div className={css(classes.iconButton)} style={{ backgroundColor: color || '#f9f9f9' }}>
                <img src={icon} alt="" className={css(classes.icon)}/>
            </div>
        )
    }

    renderHeader() {
        const { onClose } = this.props;
        const { currentStep } = this.state;

        const handleClick = (d) => {
            if (d < currentStep) {
                this.setState({ currentStep: d });
            }
        };

        const dots = [0, 1, 2, 3].map(d =>
            <div onClick={() => handleClick(d)}
                style={{ cursor: d < currentStep && 'pointer' }}
                className={css(classes.dot, d === currentStep ? classes.activeDot : null)} />
        );
        return (
            <div className={css(classes.headerContainer)}>
                <div className={css(classes.cancelButton)} onClick={onClose}>
                    <LmcDot label={'X'}
                        selectable
                        color={'#e85b77'}
                        active={true}
                        size={24}
                        fontSize={12} />
                    Add ToDo
                </div>
                <div className={css(classes.dotConatiner)}>
                    {dots}
                </div>
            </div>
        )
    }

    renderSelection() {
        const { onClose } = this.props;
        const { category, item } = this.state;

        if (item) {
            return (
                <div className={css(classes.selectionContainer)}>
                    <a className={css(classes.selectionLink)} onClick={() => this.setState({ currentStep: 1, item: null })}>
                        {this.renderCategoryIcon(item.fields.icon.url, category.fields.color)}
                        {this.formatName(category.name)} / {this.formatName(item.name)}
                    </a>
                </div>
            )
        }

        if (category) {
            return (
                <div className={css(classes.selectionContainer)}>
                    <a className={css(classes.selectionLink)} onClick={() => this.setState({ currentStep: 0, item: null, category: null })}>
                        {this.renderCategoryIcon(category.fields.icon.url, category.fields.color)}
                        {this.formatName(category.name)}
                    </a>
                </div>
            )
        }

        return <div className={css(classes.selectionContainer)}> </div>
    }

    render() {
        return (
            <div className={css(classes.container)}>
                { this.renderHeader() }
                { this.renderSelection() }
                { this.renderForm() }
            </div>
        );
    }
}

LmcTaskCreateModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

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
        backgroundColor: '#e85b77',
    },
    icon: {
        width: 12,
        // height: 14,
        marginTop: 6,
    }
});

export default connect((props) => ({
    homeFetch: `${Keystone.adminPath}/api/homes`,
    categoryFetch: `${Keystone.adminPath}/api/log-categories`,
    residentsFetch: `${Keystone.adminPath}/api/reports/residents`,
    carersFetch: `${Keystone.adminPath}/api/reports/users`,
    itemFetch: `${Keystone.adminPath}/api/log-category-items`,
}))(LmcTaskCreateModal);
