// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist App

var SITE = 'https://mpnam.github.io/shared/jaist-mobile/';

/**
 * Get Timetable for Ishikawa Line of Hokutetsu Railroad
 *
 * @module Libs/Services
 * @ngdoc method
 * @name $getIshikawaLineTimeTable
 * @return {Object} 
 */
function getIshikawaLineTimeTable() {
    console.log('[SERVICES]', 'getIshikawaLineTimeTable');
    return fetch(SITE + 'hokutetsu-ishikawa.json').then((response) => response.json()).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        console.log(error);
    });
}

/**
 * Get Timetable for Tsurugi line of Shuttle Bus
 *
 * @module Libs/Services
 * @ngdoc method
 * @name $getShuttleBusTimeTable
 * @return {Object} 
 */
function getShuttleBusTimeTable() {
    console.log('[SERVICES]', 'getShuttleBusTimeTable');
    return fetch(SITE + 'shuttle-tsurugi.json').then((response) => response.json()).then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        console.log(error);
    });
}

export { getIshikawaLineTimeTable, getShuttleBusTimeTable }