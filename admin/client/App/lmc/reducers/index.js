import { combineReducers } from "redux";
import * as taskReducer from "./Tasks";
import * as residentReducer from "./Residents";
import * as globalReducer from './Global';

export default Object.assign(
    {},
    taskReducer,
    residentReducer,
    globalReducer,
);