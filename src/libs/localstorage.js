// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist App

import { AsyncStorage } from 'react-native';


export const saveIshikawaLine = (state) => {
    try {
        AsyncStorage.setItem('ishikawaline', JSON.stringify(state));
    } catch (err) {
        console.log('[LOCALSTORAGE] saveIshikawaLine', err);
    }
}

export const saveShuttleBus = (state) => {
    try {
        AsyncStorage.setItem('shuttlebus', JSON.stringify(state));
    } catch (err) {
        console.log('[LOCALSTORAGE] saveShuttleBus', err);
    }
}