import * as ResidentSelectors from './Residents'
import * as DocumentSelectors from './Documents'
import * as OrganisationSelectors from './Organisation'

const Selectors = Object.assign(
    {},
    ResidentSelectors,
    DocumentSelectors,
    OrganisationSelectors
)

export default Selectors