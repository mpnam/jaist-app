// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile

import { FETCH_TSURUGI } from './types';


/**
 * Time table to display (for tsurugi line)
 *
 * @module Redux.Actions.Tsurugi
 * @ngdoc method
 * @name $fetchTsurugi
 * @param  {String} [station] timetable at bus stop
 * @param  {String} [direction] direction to tsurugi or jaist
 * @param  {Array} [weekdays] for weekdays
 * @param  {Array} [holidays] for holidays
 * @return {Action}
 */
export function fetchTsurugi(station, direction, weekdays, holidays) {
    return {
        type: FETCH_TSURUGI,
        Station: station,
        Direction: direction,
        Weekdays: weekdays,
        Holidays: holidays
    };
}