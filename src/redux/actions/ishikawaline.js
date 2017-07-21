// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile

import { FETCH_ISHIKAWALINE } from './types';


/**
 * Store ishikawa lines timetable into application's state
 *
 * @module Redux.Actions.IshikawaLine
 * @ngdoc method
 * @name $fetchIshikawaLine
 * @param  {String} [author] name of the author who created data
 * @param  {String} [createdDate] date information of the data
 * @param  {Array} [stations] 
 * @return {Action}
 */
export function fetchIshikawaLine(author, createdDate, stations) {
    return {
        type: FETCH_ISHIKAWALINE,
        Author: author,
        CreatedDate: createdDate,
        Stations: stations,
    };
}