// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile

import { FETCH_SHUTTLE } from './types';


/**
 * Store shuttle bus timetable into application's state (for tsurugi line)
 *
 * @module Redux.Actions.Shuttle
 * @ngdoc method
 * @name $fetchShuttleBus
 * @param  {String} [author] name of the author who created data
 * @param  {String} [createdDate] date information of the data
 * @param  {Array} [stations] 
 * @return {Action}
 */
export function fetchShuttleBus(author, createdDate, stations) {
    return {
        type: FETCH_SHUTTLE,
        Author: author,
        CreatedDate: createdDate,
        Stations: stations,
    };
}