import * as dataReducer from "./Data";
import * as globalReducer from './Global';
import * as residentsReducer from './Residents';
import * as usersReducer from './Users';

export default Object.assign(
    {},
    dataReducer,
    globalReducer,
    residentsReducer,
    usersReducer
);