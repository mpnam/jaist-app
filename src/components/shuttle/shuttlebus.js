// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist App

import React, { Component } from 'react';
import { View, Text, Picker, Modal, Platform, ActionSheetIOS } from 'react-native';
import { Grid, Col, Row, CheckBox, Button } from 'react-native-elements';
import { connect} from 'react-redux';

import { fetchTsurugi } from '../../redux/actions/tsurugi';
import TimeTable from './timetable';
import styles from './styles';

const stations = [
    { key: 'jaist', label: 'Jaist'},
    { key: 'haitekumae', label: 'Haiteku-Mae'},
    { key: 'miyatake', label: 'Miyatake'},
    { key: 'todashino', label: 'Todashino'},
    { key: 'iwamoto', label: 'Iwamoto'},
    { key: 'hontsurugi', label: 'Hon-Tsurugi (JP Bank)'},
    { key: 'tsurugihonmachi', label: 'Tsurugi-Honmachi (Lets)'},
    { key: 'tsurugi', label: 'Tsurugi'},
];

const directions = [
    { key: 'jaist', label: 'JAIST'},
    { key: 'tsurugi', label: 'Tsurugi'}
];

const options = ['Jaist', 'Haiteku-Mae', 'Miyatake', 'Todashino', 'Iwamoto', 'Hon-Tsurugi (JP Bank)', 
                'Tsurugi-Honmachi (Lets)', 'Tsurugi', 'Cancel'];

const directionsOPT = ['JAIST', 'Tsurugi', 'Cancel'];


class ShuttleBus extends Component {

    constructor(props) {
        super(props);

        this._getTimetable.bind(this);
        this._onDirectionChanged.bind(this);

        this.state = {
            isWaiting: false,
            station: 'jaist',
            direction: 'tsurugi'
        };
    }

    componentWillMount() {
        this._getTimetable(this.state.station, this.state.direction);
    }

    render() {
        var station = 
                <Picker style={{ flex: 1 }} mode="dropdown" selectedValue={this.state.station} onValueChange={this._onStationChanged.bind(this)}>
                {
                    stations.map((station) => {
                        return (<Picker.Item label={station.label} key={station.key} value={station.key} />);
                    })
                }
                </Picker>
        if (Platform.OS === 'ios')
            station = <Button style={{ flex: 1, marginTop: 3, marginLeft: 1 }} iconLeft icon={{name: 'search', color: 'gray'}} backgroundColor='#FFFF' color='black'
                        borderRadius={1} title={this._getStation(this.state.station)} onPress={() => this._showStations(false)} />;

        var direction = 
        <Picker style={{ flex: 1 }} mode="dropdown" selectedValue={this.state.direction} onValueChange={this._onDirectionChanged.bind(this)}>
            {
                directions.map((station) => {
                    return (<Picker.Item label={station.label} key={station.key} value={station.key} />);
                })
            }
        </Picker>;
        if (Platform.OS === 'ios')
        direction = <Button style={{ flex: 1, marginTop: 3, marginLeft: 1 }} iconLeft icon={{name: 'search', color: 'gray'}} backgroundColor='#FFFF' color='black'
                    borderRadius={1} title={this._getStation(this.state.direction, true)} onPress={() => this._showStations(true)} />;

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Modal animationType={'fade'} transparent visible={this.state.isWaiting} onRequestClose={() => this.setState({visible: false})}>
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 15 }}>
                        <View style={{ borderRadius: 10, alignItems: 'center', backgroundColor: '#fff', height:100, padding: 15 }}>
                            <Text>Loading TimeTable...</Text>
                        </View>
                    </View>
                </Modal>
                <View style={{flexDirection: 'row', marginLeft: 5, marginRight: 5, height: 50 }}>  
                    <Text style={{ color: '#000000', alignSelf: 'center' }}>Your direction is to:</Text>
                    {direction}
                </View>
                <View style={{flexDirection: 'row', marginLeft: 5, marginRight: 5, height: 50 }}>  
                    <Text style={{ color: '#000000', alignSelf: 'center', width: 90 }}>Bus Station:</Text>
                    {station}
                </View>
                <View style={{ flex: 1 }}>
                    <TimeTable />
                </View>
            </View>
        );
    }

    /**
     * Get stations name based on key
     *
     * @module Hokutetsu/Shuttle
     * @ngdoc method
     * @name $_getStation
     */
    _getStation = (name, direction = false) => {
        if (direction) {
            for (i = 0; i < directions.length; i++) { 
                if (directions[i].key == name)
                    return directions[i].label;
            }
        } 
        else {
            for (i = 0; i < stations.length; i++) { 
                if (stations[i].key == name)
                    return stations[i].label;
            }
        }
        return 'Unkown';
    }

    /**
     * Show dropdown to select station
     *
     * @module Hokutetsu/Shuttle
     * @ngdoc method
     * @name $_showStations
     */
    _showStations = (direction = false) => {
        if (direction) {
            ActionSheetIOS.showActionSheetWithOptions({
            options: directionsOPT,
            cancelButtonIndex: directionsOPT.length-1,
            },
            (index) => {
                if (index == directionsOPT.length - 1)
                    return;
                this._onDirectionChanged(directions[index].key);
            });
        } else {
            ActionSheetIOS.showActionSheetWithOptions({
            options: options,
            cancelButtonIndex: options.length-1,
            },
            (index) => {
                if (index == options.length - 1)
                    return;
                this._onStationChanged(stations[index].key);
            });
        }
    }

    /**
     * Update timetable since direction was changed
     *
     * @module Hokutetsu/Shuttle
     * @ngdoc method
     * @name $_onDirectionChanged
     * @param  {String} [value] directions name
     */
    _onDirectionChanged(value) {
        this.setState({
            direction: value
        });
        this._getTimetable(this.state.station, value);
    }

    /**
     * Update timetable since station was changed
     *
     * @module Hokutetsu/Shuttle
     * @ngdoc method
     * @name $_onStationChanged
     * @param  {String} [value] stations name
     */
    _onStationChanged(value) {
        this.setState({
            station: value
        });

        this._getTimetable(value, this.state.direction);
    }

    /**
     * Get timetable
     *
     * @module Hokutetsu/Shuttle
     * @ngdoc method
     * @name $_getTimetable
     * @param  {String} [station] stations name
     * @param  {String} [direction] timetable to tsurugi or jaist
     */
    _getTimetable(station, direction) {
        console.log('[ShuttleBus] _getTimetable', station);
        this.setState({ isWaiting: true });

        for(var i = 0; i < this.props.stations.length; i++) {
            console.log("check station name ", this.props.stations[i].Name);
            if (this.props.stations[i].Name == station) {
                var weekdays = (direction == 'tsurugi')? this.props.stations[i].ToTsurugi.Weekdays : this.props.stations[i].ToJaist.Weekdays;
                var holidays = (direction == 'tsurugi')? this.props.stations[i].ToTsurugi.Holidays : this.props.stations[i].ToJaist.Holidays;
                this.props.fetchTsurugi(station, direction, weekdays, holidays);
                break;
            }
        }
        
        this.setState({ isWaiting: false });
    }
}

function bindActions(dispatch) {
    return {
        fetchTsurugi: (station, direction, weekdays, holidays) => dispatch(fetchTsurugi(station, direction, weekdays, holidays))
    };
}
const mapStateToProps = state => ({
    stations: state.shuttle.Stations,
    tsurugi: state.tsurugi
});

export default connect(mapStateToProps, bindActions)(ShuttleBus);