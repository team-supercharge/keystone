import { createSelector } from 'reselect'
import _ from 'lodash'
import { getSelectedResident, getResidentsList } from './Lists'

export const getSelectedResidentProfile = createSelector(
    [ getSelectedResident, getResidentsList ],
    (id, residents) => _.find(residents, { id }),
)