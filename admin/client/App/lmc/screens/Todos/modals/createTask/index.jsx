import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as refetch, PromiseState } from 'react-refetch';
import { connect } from 'react-redux';
import _ from 'lodash';

import LmcResidentSelector from './LmcResidentSelector.jsx';
import LmcTimeSelector from './LmcTimeSelector.jsx';
import LmcItemSelector from './LmcItemSelector.jsx';
import LmcTitleSelector from './LmcTitleSelector.jsx';
import LmcCategorySelector from './LmcCategorySelector.jsx';

import { BlankState } from '../../../../../elemental';
import { colors } from '../../../../common/constants';
import {
    LmcLoadingScreen,
    LmcStepList,
    LmcStep,
} from '../../../../components';
import {
    clearAllFormFields,
    submitForm,
    toggleCreateTodoModal,
} from '../../actions';

/**
 * After POST, Keystone will sent GET requests with ?basic param to every resident... why?
 */
class LmcTaskCreateModal extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.getSelectionSummary = this.getSelectionSummary.bind(this);
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

    renderCategoryIcon(icon, color) {
        return (
            <div className={css(classes.iconButton)} style={{ backgroundColor: color || '#f9f9f9' }}>
                <img src={icon} alt="" className={css(classes.icon)}/>
            </div>
        )
    }

    onClose() {
        this.props.clearAllFormFields();
        // this.props.toggleCreateModal();
    }

    getSelectionSummary() {

        const {
            formData: {
                category,
                item,
                title,
                recurrance
            },
            categoryFetch,
            itemFetch,
        } = this.props;

        let backIconColor;
        let backIcon;
        let backText;

        if (category) {
            const categoryData = _.find(categoryFetch.value.results, { id: category });
            backIconColor = categoryData.fields.color
            backIcon = categoryData.fields.icon.url;
            const categoryName = backText = this.formatName(categoryData.fields.name);
            
            if (item) {
                const itemData = _.find(itemFetch.value.results, { id: item });
                if (itemData.fields.icon.url) backIcon = itemData.fields.icon.url;
                backText = `${backText} / ${this.formatName(itemData.fields.name)}`;
            }

            if (title) {
                backText = `${categoryName} / ${title}`;
            }
        }

        return { backText, backIconColor, backIcon };
    }

    render() {
        const {
            formData: { category, item, title, recurrance },
            categoryFetch,
            homeFetch,
            itemFetch,
            residentsFetch,
            carersFetch,
        } = this.props;

        const allFetches = PromiseState.all([homeFetch, categoryFetch, itemFetch, residentsFetch, carersFetch]);
        if (allFetches.pending) return <LmcLoadingScreen />;
        if (!allFetches.fulfilled) return <BlankState heading={'Oops.. Something went wrong'} />;
        const { items, categories } = this.filterData(homeFetch.value, categoryFetch.value, itemFetch.value, category && category);
        const residents = residentsFetch.value.results;
        const carers = carersFetch.value.results;
        const { backIconColor, backIcon, backText } = this.getSelectionSummary();

        return (
            <LmcStepList
                onClose={this.onClose}
                backIconColor={backIconColor}
                backIcon={backIcon}
                backText={backText}
                closeLabel="Add To-Do"
            >   
                <LmcStep component={LmcCategorySelector} data={{ categories }} />
                <LmcStep component={LmcItemSelector} data={{ items }} />
                <LmcStep component={LmcTitleSelector} showNextButton />
                <LmcStep component={LmcTimeSelector} showNextButton />
                <LmcStep component={LmcResidentSelector} data={{residents, carers}} onSubmit={this.props.submitForm} />
            </LmcStepList>
        );
    }
}

/**
 * A bit of a hack until we've fully moved over to Redux
 * Use react-referch for the Data loading
 * Use Redux for the modal state
 */

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
});

const mapDispatchToProps = dispatch => ({
	clearAllFormFields: () => dispatch(clearAllFormFields()),
    submitForm: () => dispatch(submitForm()),
    toggleCreateModal: () => dispatch(toggleCreateTodoModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(LmcModalWithDataSource);
