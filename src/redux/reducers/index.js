// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile

import { combineReducers } from 'redux';

import routes from './routes';
import timetable from './timetable';
import ishikawaline from './ishikawaline';
import shuttle from './shuttle';
import tsurugi from './tsurugi';


// Each applications state combines all these sub-states.
const reducer = combineReducers({
    routes,
    timetable,
    ishikawaline,
    shuttle,
    tsurugi
});

export default reducer