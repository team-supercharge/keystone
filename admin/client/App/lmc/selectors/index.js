import * as ResidentSelectors from './Residents'
import * as DocumentSelectors from './Documents'
import * as OrganisationSelectors from './Organisation'
import * as HandoverSelectors from './Handovers'

const Selectors = Object.assign(
    {},
    ResidentSelectors,
    DocumentSelectors,
    OrganisationSelectors,
    HandoverSelectors
)

export default Selectors