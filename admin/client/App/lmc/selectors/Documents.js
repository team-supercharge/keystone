import { createSelector } from 'reselect'
import _ from 'lodash'
import { getSelectedResident, getDocumentsList } from './Lists'

export const getSelectedResidentDocuments = createSelector(
    [ getDocumentsList, getSelectedResident ],
    (documents, id) => { return _
        .chain(documents)
        .filter({ 'resident': id })
        .groupBy('categoryName')
        .value()
    }
)