// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile

import { FETCH_TSURUGI } from '../actions/types';

// example of a state
const initialState = {
    Station: 'jaist',
    Direction: 'tsurugi',
    Weekdays: [
        { Hour: '6', Minutes: ['40'] },
        { Hour: '7', Minutes: ['20'] },
        { Hour: '8', Minutes: ['00', '40'] },
        { Hour: '9', Minutes: ['15', '55'] },     
    ],
    Holidays: [
        { Hour: '6', Minutes: [] },
        { Hour: '7', Minutes: ['20'] },
        { Hour: '8', Minutes: ['00', '40'] },
        { Hour: '9', Minutes: ['15', '55'] },      
    ]
};

/**
 * Timetable
 *
 * @module Redux.Reducers.Tsurugi
 * @ngdoc method
 * @name $tsurugi
 * @param  {Object} [state] state
 * @param  {Action} [action] action
 * @return {Object} New state
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TSURUGI:
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