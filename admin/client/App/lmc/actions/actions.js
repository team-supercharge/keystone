import * as GlobalActions from './Global';
import * as DataActions from './Data';
import * as ResidentActions from './Residents';
import * as DocumentActions from './Documents';
import * as UserActions from './Users';

export const ActionCreators = Object.assign(
    {},
    GlobalActions,
    DataActions,
    ResidentActions,
    DocumentActions,
    UserActions
);
