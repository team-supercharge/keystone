import { createSelector } from 'reselect'
import _ from 'lodash'

export const getSelectedResident = state => state.residents.selectedResident
export const getResidentsList = state => state.data.residents

export const getSelectedResidentProfile = createSelector(
    [ getSelectedResident, getResidentsList ],
    (id, residents) => _.find(residents, { id }),
)