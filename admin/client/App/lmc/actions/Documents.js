import { deleteItem } from '../common/dataService'
import { loadList } from './Data'

export function deleteDocument(id) {
    return (dispatch) => {
        const url = 'documents'
        return deleteItem(id, url)
            .then(() => {
                dispatch(loadList('documents'))
            })
            .catch(err => {
                console.log(err)
            })
    }
}