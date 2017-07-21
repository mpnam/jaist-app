// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile
//
// All actions over routing including starting application and navigation.
// See Reducers for more detail about logic over routing application.

import { ROOT_CHANGED } from './types';


/**
 * Initialize application, welcome page
 *
 * @module Redux.Actions.Routes
 * @ngdoc method
 * @name $appInitialized
 * @return {Object} Action
 */
export function appInitialized() {
  return {type: ROOT_CHANGED, root: 'init'};
}

/**
 * Navigate to home page
 *
 * @module Redux.Actions.Routes
 * @ngdoc method
 * @name $navigateToHome
 * @return {Object} Action
 */
export function navigateToHome() {
  return {type: ROOT_CHANGED, root: 'home'};
}