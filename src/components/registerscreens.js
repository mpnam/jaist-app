// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist App

import { Navigation } from 'react-native-navigation';

import Welcome from '../welcome';
import ShuttleBus from './shuttle/shuttlebus';
import IshikawaLine from './hokutetsu/ishikawaline';


// Should register all screens of the app explicitly here
export function registerScreens(store, Provider) {
    Navigation.registerComponent('welcome', () => Welcome, store, Provider);
    Navigation.registerComponent('shuttlebus', () => ShuttleBus, store, Provider);
    Navigation.registerComponent('ishikawaline', () => IshikawaLine, store, Provider);
}