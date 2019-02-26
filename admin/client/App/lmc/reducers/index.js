import * as dataReducer from "./Data";
import * as globalReducer from './Global';
import * as residentsReducer from './Residents'

export default Object.assign(
    {},
    dataReducer,
    globalReducer,
    residentsReducer
);