import { createSelector } from 'reselect'
import _ from 'lodash'
import { getCurrentHandover, getHandoversList, getResidentsList } from './Lists'

export const groupCurrentHandoverLogs = createSelector(
    [ getCurrentHandover, getResidentsList ],
    (handover, residents) => {
        if (!handover || !residents) return null

        const residentsById = _.keyBy(residents, 'id')
        return {
            logsByResident: _(handover.logs)
                .groupBy('resident')
                .map((logs, resident) => ({
                    logs,
                    resident: residentsById[resident]
                }))
                .value(),
            notes: handover.notes
        }
    }
)