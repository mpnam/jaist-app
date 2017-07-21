import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { registerScreens } from './components/registerscreens';
import reducer from './redux/reducers/index';


const store = createStore(reducer);

registerScreens(store, Provider);

class App extends Component {
	constructor(props) {
		super(props);
		this.startApp();
	}

	startApp() {
		Navigation.startSingleScreenApp({
            screen: {
                screen: 'welcome',
            },
            navigatorStyle: {
                navBarHidden: true
            },
            animationType: 'none'
        });
	}
}

export default App;
