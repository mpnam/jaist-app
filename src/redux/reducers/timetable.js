// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile

import { FETCH_TIMETABLE } from '../actions/types';

// example of a state
const initialState = {
    Station: 'tsurugi',
    Direction: 'nomachi',
    Weekdays: [
        { Hour: '5', Minutes: ['45'] },
        { Hour: '6', Minutes: ['20', '41'] },
        { Hour: '7', Minutes: ['00', '20', '40'] },
        { Hour: '8', Minutes: ['20'] },
    ],
    Holidays: [
        { Hour: '5', Minutes: ['45'] },
        { Hour: '6', Minutes: ['20'] },
        { Hour: '7', Minutes: ['00', '40'] },
        { Hour: '8', Minutes: ['20'] },
    ]
};

/**
 * Timetable
 *
 * @module Redux.Reducers.Timetable
 * @ngdoc method
 * @name $timetable
 * @param  {Object} [state] state
 * @param  {Action} [action] action
 * @return {Object} New state
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TIMETABLE:
          return {
              ...state,
              Station: action.Station,
              Direction: action.Direction,
              Weekdays: action.Weekdays,
              Holidays: action.Holidays
          };
        default:
          return state;
    }
}