// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist App

import * as firebase from 'firebase';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAdrk6613XtZ9p4VkQ34RDhKkYloGPlhIs",
  authDomain: "jaistapp.firebaseapp.com",
  databaseURL: "https://jaistapp.firebaseio.com",
  storageBucket: "jaistapp.appspot.com"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
var storageRef = firebase.storage(firebaseApp).refFromURL('gs://jaistapp.appspot.com/');

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
    return storageRef.child('hokutetsu-ishikawa.json').getDownloadURL().then(function(url) {
        return fetch(url).then((response) => response.json()).then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            return error;
        });
    }).catch((error) => {
        return error;
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
    return storageRef.child('shuttle-tsurugi.json').getDownloadURL().then(function(url) {
        return fetch(url).then((response) => response.json()).then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            return error;
        });
    }).catch((error) => {
        return error;
    });
}

export { getIshikawaLineTimeTable, getShuttleBusTimeTable }