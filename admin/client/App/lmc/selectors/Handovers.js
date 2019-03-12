import { createSelector } from 'reselect'
import _ from 'lodash'
import moment from 'moment'
import { 
    getCurrentHandover,
    getHandoversList, 
    getResidentsList,
    getLogCategories, 
    getLogCategoryItems,
    getUsersList
} from './Lists'

export const formatCurrentHandover = createSelector(
    [ 
        getCurrentHandover, 
        getResidentsList, 
        getLogCategories, 
        getLogCategoryItems,
        getUsersList
    ],
    (handover, residents, categories, categoryItems, users) => {
        if (!handover || 
            !residents || 
            !categories || 
            !categoryItems ||
            !users) return null

        const residentsById = _.keyBy(residents, 'id')
        const logsWithIcons = getLogIcons(handover.logs, categoryItems, categories, users)
        const notesWithCarers = getNoteCarers(handover.notes, users)

        return {
            logsByResident: _(logsWithIcons)
                .groupBy('resident')
                .map((logs, resident) => ({
                    logs,
                    resident: residentsById[resident]
                }))
                .sortBy('resident.name.first')
                .value(),
            notes: notesWithCarers
        }
    }
)

export const formatHandoverHistory = createSelector(
    [ 
        getHandoversList, 
        getResidentsList, 
        getLogCategories, 
        getLogCategoryItems,
        getUsersList
    ],
    (handovers, residents, categories, categoryItems, users) => {
        if (!handovers || 
            !residents || 
            !categories || 
            !categoryItems ||
            !users) return null

        const residentsById = _.keyBy(residents, 'id')

        const formattedHandovers = handovers.map(handover => {
            const logsWithIcons = getLogIcons(handover.logs, categoryItems, categories, users)
            const notesWithCarers = getNoteCarers(handover.notes, users)
            const seenByCarers = handover.seenBy.map(id => _.find(users, { id }))

            return {
                logsByResident: _(logsWithIcons)
                    .groupBy('resident')
                    .map((logs, resident) => ({
                        logs,
                        resident: residentsById[resident]
                    }))
                    .sortBy('resident.name.first')
                    .value(),
                notes: notesWithCarers,
                seenBy: seenByCarers,
                createdOn: handover.createdOn,
                createdBy: _.find(users, { id: handover.createdBy }),
                witnessedBy: _.find(users, { id: handover.witnessedBy })
            }
        })

        const groupedHandovers = _.groupBy(formattedHandovers, (handover) => {
            return moment(handover.createdOn).startOf('day').format('MMM Do')
        })
        return groupedHandovers
    }
)

const getLogIcons = (logs, categoryItems, categories, users) => {
    return logs.map(log => {
        const item = _.find(categoryItems, { id: log.item })
        const category = _.find(categories, { id: log.category })
        const carer = _.find(users, { id: log.loggedBy })
        return { 
            ...log, 
            itemIcon: { url: item.icon }, 
            categoryColor: category.color,
            carerName: `${carer.name.first} ${carer.name.last}`
        }
    })
}

const getNoteCarers = (notes, users) => {
    return notes.map(note => {
        const carer = _.find(users, { id: note.createdBy })
        return {
            ...note,
            carer
        }
    })
}