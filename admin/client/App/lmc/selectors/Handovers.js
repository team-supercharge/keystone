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
        const logsWithIcons = handover.logs.map(log => {
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
        const notesWithCarers = handover.notes.map(note => {
            const carer = _.find(users, { id: note.createdBy })
            return {
                ...note,
                carer
            }
        })

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
            const logsWithIcons = handover.logs.map(log => {
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
            const notesWithCarers = handover.notes.map(note => {
                const carer = _.find(users, { id: note.createdBy })
                return {
                    ...note,
                    carer
                }
            })
            const seenByCarers = handover.seenBy.map(id => {
                const carer = _.find(users, { id })
                return carer
            })

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
                createdOn: handover.createdOn
            }
        })

        return _.groupBy(formattedHandovers, (handover) => {
            return moment(handover.createdOn).startOf('day').format('MMM Do')
        })
    }
)