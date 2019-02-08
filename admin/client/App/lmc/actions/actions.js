import * as TaskActions from './Tasks';
import * as GlobalActions from './Global';
import * as DataActions from './Data';
import * as ResidentActions from './Residents';

export const ActionCreators = Object.assign(
    {},
    GlobalActions,
    DataActions,
    ResidentActions,
);
