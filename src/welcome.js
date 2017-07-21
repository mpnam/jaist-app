// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist Mobile
// Welcome screen

import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { fetchIshikawaLine } from './redux/actions/ishikawaline.js';
import { fetchShuttleBus } from './redux/actions/shuttle.js';
import { getIshikawaLineTimeTable, getShuttleBusTimeTable } from './libs/services';
import { saveIshikawaLine, saveShuttleBus } from './libs/localstorage';


const tabsStyle = {
    tabBarButtonColor: '#BCBCBC', 
    tabBarSelectedButtonColor: '#007AFF',
    tabBarBackgroundColor: '#F6F6F6',
    navBarBackgroundColor: '#4AA1DE',
    navBarTextColor: '#FFFFFF',
    forceTitlesDisplay: true
}

class Welcome extends Component {
    static navigatorStyle = {
        navBarHidden: true, // make the nav bar hidden
    };

    constructor(props) {
        super(props);

        this._checkForUpdates.bind(this);
        this._navigateToHome.bind(this);
    }

    componentWillMount() {
        try {
            AsyncStorage.getItem('ishikawaline').then((value) => {
                let json = JSON.parse(value);
                console.log('[JaistMobile] componentWillMount', json);
                if (json != null) {
                    this.props.fetchIshikawaLine(json.Author, json.CreatedDate, json.Stations);
                } else
                    return this._checkForUpdates(true);
                
                AsyncStorage.getItem('shuttlebus').then((value) => {
                    let json = JSON.parse(value);
                    console.log('[JaistMobile] componentWillMount', json);
                    if (json != null) {
                        this.props.fetchShuttleBus(json.Author, json.CreatedDate, json.Stations);
                        this._checkForUpdates(false);
                    } else
                        return this._checkForUpdates(true);
                });
            });
        } catch (err) {
            console.log('[JaistMobile] componentWillMount', err)
            this._checkForUpdates(true);
        }
    }

    render() {
        return (
            <View style={styles.imageContainer}>
                <Image source={require('./resources/welcome.png')} style={styles.backgroundImage} />
            </View>
        );
    }

    _checkForUpdates(forceUpdate) {
        getIshikawaLineTimeTable().then((response) => {
            console.log('[JaistMobile] _checkForUpdates', response);
            if (response != undefined) {
                if (forceUpdate) {
                    console.log('[JaistMobile] Update New Ishikawa Lines TimeTable', response.Stations);
                    this.props.fetchIshikawaLine(response.Author, response.CreatedDate, response.Stations);
                    saveIshikawaLine(response);
                }
                else if (response.CreatedDate != undefined) {
                    var currentData = new Date(this.props.ishikawaline.createdDate);
                    var serverData = new Date(response.CreatedDate);
                    if (serverData > currentData) { // update timetable
                        console.log('[JaistMobile] Update New Ishikawa Lines TimeTable', response.Stations);
                        this.props.fetchIshikawaLine(response.Author, response.CreatedDate, response.Stations);
                        saveIshikawaLine(response);
                    }
                }
            }

            getShuttleBusTimeTable().then((response) => {
                console.log('[JaistMobile] _checkForUpdates', response);
                if (response != undefined) {
                    if (forceUpdate) {
                        console.log('[JaistMobile] Update New Shuttle Bus TimeTable', response.Stations);
                        this.props.fetchShuttleBus(response.Author, response.CreatedDate, response.Stations);
                        saveShuttleBus(response);
                    }
                    else if (response.CreatedDate != undefined) {
                        var currentData = new Date(this.props.shuttle.createdDate);
                        var serverData = new Date(response.CreatedDate);
                        if (serverData > currentData) { // update timetable
                            console.log('[JaistMobile] Update New Shuttle Bus TimeTable', response.Stations);
                            this.props.fetchShuttleBus(response.Author, response.CreatedDate, response.Stations);
                            saveShuttleBus(response);
                        }
                    }
                }
                this._navigateToHome();
            }).catch ((err) => {
                console.log('[JaistMobile] _checkForUpdates', err);
                this._navigateToHome();
            });

        }).catch ((err) => {
            console.log('[JaistMobile] _checkForUpdates', err);
            this._navigateToHome();
        });
    }

    _navigateToHome() {
        console.log('[JaistMobile] _navigateToHome');
    }
}

let styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover', // or 'stretch'
  }
});

function bindActions(dispatch) {
    return {
        fetchIshikawaLine: (author, createdDate, stations) => dispatch(fetchIshikawaLine(author, createdDate, stations)),
        fetchShuttleBus: (author, createdDate, stations) => dispatch(fetchShuttleBus(author, createdDate, stations))
    };
}

const mapStateToProps = state => ({
    root: state.routes.root,
    ishikawaline: state.ishikawaline,
    shuttle: state.shuttle
});

export default connect(mapStateToProps, bindActions)(Welcome);