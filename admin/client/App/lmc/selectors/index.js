import * as ResidentSelectors from './Residents'
import * as DocumentSelectors from './Documents'

const Selectors = Object.assign(
    {},
    ResidentSelectors,
    DocumentSelectors
)

export default Selectors