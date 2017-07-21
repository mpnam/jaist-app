// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile

import { FETCH_ISHIKAWALINE } from '../actions/types';

// example of a state
const initialState = {
    Author: 'mpnam1991@gmail.com',
    CreatedDate: "06/01/2017",
    Stations: []
};

/**
 * IshikawaLine
 *
 * @module Redux.Reducers.IshikawaLine
 * @ngdoc method
 * @name $ishikawaline
 * @param  {Object} [state] state
 * @param  {Action} [action] action
 * @return {Object} New state
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ISHIKAWALINE:
          return {
              ...state,
              Author: action.Author,
              CreatedDate: action.CreatedDate,
              Stations: action.Stations,
          };
        default:
          return state;
    }
}