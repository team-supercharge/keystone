import { createSelector } from 'reselect'
import _ from 'lodash'
import { getSelectedUser, getUsersList } from './Lists'

export const getSelectedUserProfile = createSelector(
    [ getSelectedUser, getUsersList ],
    (id, users) => _.find(users, { id }),
)
