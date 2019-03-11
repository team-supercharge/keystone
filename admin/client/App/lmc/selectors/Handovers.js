import { createSelector } from 'reselect'
import _ from 'lodash'
import { 
    getCurrentHandover, 
    getResidentsList,
    getLogCategories, 
    getLogCategoryItems 
} from './Lists'

export const groupCurrentHandoverLogs = createSelector(
    [ 
        getCurrentHandover, 
        getResidentsList, 
        getLogCategories, 
        getLogCategoryItems 
    ],
    (handover, residents, categories, categoryItems) => {
        if (!handover || !residents || !categories || !categoryItems) return null

        const residentsById = _.keyBy(residents, 'id')
        const logsWithIcons = handover.logs.map(log => {
            const item = _.find(categoryItems, { id: log.item })
            const category = _.find(categories, { id: log.category })
            return { 
                ...log, 
                itemIcon: { url: item.icon }, 
                categoryColor: category.color 
            }
        })
        
        return {
            logsByResident: _(logsWithIcons)
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