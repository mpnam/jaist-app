// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile

import { ROOT_CHANGED } from '../actions/types';


const initialState = {
    root: undefined
};

/**
 * Routes
 *
 * @module Redux.Reducers.Routes
 * @ngdoc method
 * @name $routes
 * @param  {Object} [state] state
 * @param  {Action} [action] action
 * @return {Object} New state
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case ROOT_CHANGED:
          return {
              ...state,
              root: action.root
          };
        default:
          return state;
    }
}