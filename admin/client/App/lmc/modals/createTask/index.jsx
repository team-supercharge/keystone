import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';
import { connect as refetch, PromiseState } from 'react-refetch';
import { connect } from 'react-redux';
import _ from 'lodash';

import LmcResidentSelector from './LmcResidentSelector.jsx';
import LmcTimeSelector from './LmcTimeSelector.jsx';
import LmcItemSelector from './LmcItemSelector.jsx';
import LmcTitleSelector from './LmcTitleSelector.jsx';
import LmcCategorySelector from './LmcCategorySelector.jsx';

import { BlankState } from '../../../elemental';
import { colors } from '../../common/constants';
import {
    LmcLoadingScreen,
    LmcStepList,
    LmcStep,
} from '../../components';
import {
    setFormField,
    clearAllFormFields,
} from '../actions';

/**
 * After POST, Keystone will sent GET requests with ?basic param to every resident... why?
 */
class LmcTaskCreateModal extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.renderSelection = this.renderSelection.bind(this);
    }

    filterData(home, categories, allItems, category) {
        const { group } = home.results[0];
        const items = _.chain(allItems.results)
            .filter({ fields: { category }})
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

    onSubmit() {

    }

    renderCategoryIcon(icon, color) {
        return (
            <div className={css(classes.iconButton)} style={{ backgroundColor: color || '#f9f9f9' }}>
                <img src={icon} alt="" className={css(classes.icon)}/>
            </div>
        )
    }

    handleItemBackClick() {
        this.props.setFormField({ key: 'item', value: null });
        this.props.prevStep();
    }

    handleCategoryBackClick() {
        this.props.setFormField({ key: 'item', value: null });
        this.props.setFormField({ key: 'category', value: null });
        this.props.prevStep();
    }

    onClose() {
        this.props.clearAllFormFields();
        this.props.onClose();
    }

    renderSelection() {
        const { categoryFetch, itemFetch, formData: { category, item, title, recurrance } } = this.props;
        if (category) {
            const categoryData = _.find(categoryFetch.value.results, { id: category });
            if (item) {
                const itemData = _.find(itemFetch.value.results, { id: item });
                if (title) {
                    if (recurrance) {

                    }
                }

                return (
                    <div className={css(classes.selectionContainer)}>
                        <a className={css(classes.selectionLink)} onClick={this.handleItemBackClick.bind(this)}>
                            {this.renderCategoryIcon(itemData.fields.icon.url, categoryData.fields.color)}
                            {this.formatName(categoryData.name)} / {this.formatName(itemData.name)}
                        </a>
                    </div>
                )
            }

            return (
                <div className={css(classes.selectionContainer)}>
                    <a className={css(classes.selectionLink)} onClick={this.handleCategoryBackClick.bind(this)}>
                        {this.renderCategoryIcon(categoryData.fields.icon.url, categoryData.fields.color)}
                        {this.formatName(categoryData.name)}
                    </a>
                </div>
            )
        }

        return <div className={css(classes.selectionContainer)}> </div>
    }

    render() {
        const {
            formData: { category, item },
            categoryFetch,
            homeFetch,
            itemFetch,
            currentStep,
            residentsFetch,
            carersFetch,
        } = this.props;

        const allFetches = PromiseState.all([homeFetch, categoryFetch, itemFetch, residentsFetch, carersFetch]);
        if (allFetches.pending) return <LmcLoadingScreen />;
        if (!allFetches.fulfilled) return <BlankState heading={'Oops.. Something went wrong'} />;
        const { items, categories } = this.filterData(homeFetch.value, categoryFetch.value, itemFetch.value, category && category);
        const residents = residentsFetch.value.results;
        const carers = carersFetch.value.results;

        return (
            <LmcStepList
                closeLabel="Add To-Do"
                onClose={this.onClose}
                header={this.renderSelection()}
            >
                <LmcStep test component={LmcCategorySelector} data={{ categories }} />
                <LmcStep component={LmcItemSelector} data={{ items }} />
                <LmcStep component={LmcTitleSelector} showNextButton />
                <LmcStep component={LmcTimeSelector} showNextButton />
                <LmcStep component={LmcResidentSelector} data={{residents, carers}} onSubmit={this.onSubmit} />
            </LmcStepList>
        );
    }
}

LmcTaskCreateModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

const classes = StyleSheet.create({
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
    }
});


// For fetching data
const mapFetchToProps = () => ({
    homeFetch: `${Keystone.adminPath}/api/homes`,
    categoryFetch: `${Keystone.adminPath}/api/log-categories`,
    residentsFetch: `${Keystone.adminPath}/api/reports/residents`,
    carersFetch: `${Keystone.adminPath}/api/reports/users`,
    itemFetch: `${Keystone.adminPath}/api/log-category-items`,
});

const LmcModalWithDataSource = refetch(mapFetchToProps)(LmcTaskCreateModal);

const mapStateToProps = (state) => ({
    formData: state.modal.formData,
    currentStep: state.modal.currentStep,
});

const mapDispatchToProps = dispatch => ({
	setFormField: (val) => dispatch(setFormField(val)),
	clearAllFormFields: () => dispatch(clearAllFormFields()),
	setStep: (index) => dispatch(setStep(index)),
	nextStep: () => dispatch(nextStep()),
	prevStep: () => dispatch(prevStep()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LmcModalWithDataSource);


/*
switch (currentStep) {
case 0:
    return ( { onSelect={category => {
        this.props.setFormField({ key: 'category', value: category });
        this.props.nextStep();
    }} } )
    case 1:
    return <LmcItemSelector
        data={items}
        onSelect={(item, title) => {
            if (item) {
                this.props.setFormField({ key: 'item', value: item });
                this.props.setFormField({ key: 'title', value: title });
            }
            this.props.nextStep();
        }} />
case 2:
    return <LmcTitleSelector onSelect={this.props.nextStep} />;
case 3:
    return <LmcTimeSelector
        onSelect={(recurrence) => {
            // this.setState({ recurrence });
            this.props.nextStep();
        }}
    />;
case 4:
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
};*/