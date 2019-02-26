import { createSelector } from 'reselect'
import _ from 'lodash'
import { getSelectedResident, getDocumentsList, getHomeDocumentsList } from './Lists'

export const getSelectedResidentDocuments = createSelector(
    [ getDocumentsList, getSelectedResident ],
    (documents, id) => { return _
        .chain(documents)
        .filter({ 'resident': id })
        .groupBy('categoryName')
        .value()
    }
)

export const groupHomeDocuments = createSelector(
    [ getHomeDocumentsList ],
    (documents) => { return _
        .chain(documents)
        .groupBy('categoryName')
        .value()
    }
)

