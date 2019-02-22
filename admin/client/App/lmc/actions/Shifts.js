import { deleteItem } from '../common/dataService'
import { loadList } from './Data'

export function deleteShift(id) {
    return (dispatch) => {
        return deleteItem(id, 'shifts')
            .then(() => {
                dispatch(loadList('shifts'))
            })
            .catch(err => {
                console.log(err)
            })
    }
}