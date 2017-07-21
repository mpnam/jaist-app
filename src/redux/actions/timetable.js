// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile

import { FETCH_TIMETABLE } from './types';


/**
 * Time table to display
 *
 * @module Redux.Actions.Timetable
 * @ngdoc method
 * @name $fetchTimetable
 * @param  {String} [station] timetable at station
 * @param  {String} [direction] direction to tsurugi or nomachi
 * @param  {Array} [weekdays] for weekdays
 * @param  {Array} [holidays] for holidays
 * @return {Action}
 */
export function fetchTimetable(station, direction, weekdays, holidays) {
    return {
        type: FETCH_TIMETABLE,
        Station: station,
        Direction: direction,
        Weekdays: weekdays,
        Holidays: holidays
    };
}