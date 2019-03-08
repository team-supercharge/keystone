import * as GlobalActions from './Global';
import * as DataActions from './Data';
import * as ResidentActions from './Residents';
import * as DocumentActions from './Documents';
import * as UserActions from './Users';
import * as ShiftActions from './Shifts';
import * as HandoverActions from './Handovers';

export const ActionCreators = Object.assign(
    {},
    GlobalActions,
    DataActions,
    ResidentActions,
    DocumentActions,
    UserActions,
    ShiftActions,
    HandoverActions
);
