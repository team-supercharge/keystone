import { deleteItem } from '../common/dataService'
import { loadList } from './Data'

export function deleteDocument(id, listId) {
    return (dispatch) => {
        return deleteItem(id, listId)
            .then(() => {
                dispatch(loadList(listId))
            })
            .catch(err => {
                console.log(err)
            })
    }
}