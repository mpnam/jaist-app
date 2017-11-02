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

/**
 * Get Timetable for Ishikawa Line of Hokutetsu Railroad
 *
 * @module Libs/Services
 * @ngdoc method
 * @name $getIshikawaLineTimeTable
 * @return {Object} 
 */
function getIshikawaLineTimeTable() {
    var ishikawaline = firebase.storage(firebaseApp).refFromURL('gs://jaistapp.appspot.com/hokutetsu-ishikawa.json');
    return ishikawaline.getDownloadURL().then(function(url) {
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
    var shuttleBus = firebase.storage(firebaseApp).refFromURL('gs://jaistapp.appspot.com/shuttle-tsurugi.json');
    return shuttleBus.getDownloadURL().then(function(url) {
        return fetch(url).then((response) => response.json()).then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            return error;
        });
    }).catch((error) => {
        return error;
    });
}

function checkUpdate(currentCreatedDate) {
    return firebaseApp.database().ref("CreatedDate").once('value').then(function(snapshot) {
        console.log('teteteteetee', snapshot.val());
        return (currentCreatedDate != snapshot.val());
    }).catch((error) => {
        return false;
    });
}

export { getIshikawaLineTimeTable, getShuttleBusTimeTable, checkUpdate }