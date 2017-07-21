import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './components/registerscreens';
import reducer from './redux/reducers/index';


const store = createStore(reducer);

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
	screen: {
		screen: 'welcome',
	},
	navigatorStyle: {
		navBarHidden: true
	},
	animationType: 'none'
});
