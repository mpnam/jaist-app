// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist App

import React, { Component } from 'react';
import { Platform, View, Text, Picker, Modal, ActionSheetIOS } from 'react-native';
import { Grid, Col, Row, Button } from 'react-native-elements';
import { connect} from 'react-redux';

import { fetchTimetable } from '../../redux/actions/timetable';
import TimeTable from './timetable';
import styles from './styles';

const stations = [
    { key: 'tsurugi', label: 'Tsurugi'},
    { key: 'hinomiko', label: 'Hinomiko'},
    { key: 'oyanagi', label: 'Oyanagi'},
    { key: 'inokuchi', label: 'Inokuchi'},
    { key: 'douhouji', label: 'Douhouji'},
    { key: 'sodani', label: 'Sodani'},
    { key: 'hibari', label: 'Hibari'},
    { key: 'otomaru', label: 'Otomaru (Sushiro)'},
    { key: 'nukajyutakumae', label: 'Nuka-Joutakumae'},
    { key: 'magae', label: 'Magae'},
    { key: 'nonoichikoudaimae', label: 'Nonoichi-Koudaimae'},
    { key: 'nonoichi', label: 'Nonoichi (2nd Street, Book Off)'},
    { key: 'oshino', label: 'Oshino'},
    { key: 'shinnishikanazawa', label: 'Shinnishi-Kanazawa (to Kanazawa Station)'},
    { key: 'nishiizumi', label: 'Nishi-Izumi'},
    { key: 'nomachi', label: 'Nomachi'},
];

const directions = [
    { key: 'nomachi', label: 'Nomachi (Kanazawa)'},
    { key: 'tsurugi', label: 'Tsurugi (JAIST)'}
];

const options = ['Tsurugi', 'Hinomiko', 'Oyanagi', 'Inokuchi', 'Douhouji', 'Sodani', 
                'Hibari', 'Otomaru (Sushiro)', 'Nuka-Joutakumae', 'Magae', 'Nonoichi-Koudaimae', 'Nonoichi (2nd Street, Book Off)',
                'Oshino', 'Shinnishi-Kanazawa (to Kanazawa Station)', 'Nishi-Izumi', 'Nomachi', 'Cancel'];

const directionsOPT = ['Nomachi', 'Tsurugi', "Cancel"];


class IshikawaLine extends Component {

    constructor(props) {
        super(props);

        this._getTimetable.bind(this);
        this._onDirectionChanged.bind(this);

        this.state = {
            isWaiting: false,
            station: 'tsurugi',
            direction: 'nomachi'
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
            </Picker>;
        if (Platform.OS === 'ios')
            station = <Button style={{ flex: 1, marginTop: 3, marginLeft: 1 }} iconLeft icon={{name: 'search', color: 'gray'}} backgroundColor='#FFFF' color='black'
                        borderRadius={1} title={this._getStation(this.state.station)} onPress={this._showStations.bind(this)} />;

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
                        borderRadius={1} title={this._getStation(this.state.station, true)} onPress={this._showStations(true)} />;

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
     * @module Hokutetsu/IshikawaLine
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
     * Update timetable since direction was changed
     *
     * @module Hokutetsu/IshikawaLine
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
     * @module Hokutetsu/IshikawaLine
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
     * Show dropdown to select station
     *
     * @module Hokutetsu/IshikawaLine
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
     * Get timetable
     *
     * @module Hokutetsu/IshikawaLine
     * @ngdoc method
     * @name $_getTimetable
     * @param  {String} [station] stations name
     * @param  {String} [direction] timetable to tsurugi or jaist
     */
    _getTimetable(station, direction) {
        console.log('[Hokutetsu] _getTimetable', station);
        this.setState({ isWaiting: true });

        for(var i = 0; i < this.props.stations.length; i++) {
            if (this.props.stations[i].Name == station) {
                var weekdays = (direction == 'nomachi')? this.props.stations[i].ToNomachi.Weekdays : this.props.stations[i].ToTsurugi.Weekdays;
                var holidays = (direction == 'nomachi')? this.props.stations[i].ToNomachi.Holidays : this.props.stations[i].ToTsurugi.Holidays;
                this.props.fetchTimetable(station, direction, weekdays, holidays);
                break;
            }
        }
        
        this.setState({ isWaiting: false });
    }
}

function bindActions(dispatch) {
    return {
        fetchTimetable: (station, direction, weekdays, holidays) => dispatch(fetchTimetable(station, direction, weekdays, holidays))
    };
}
const mapStateToProps = state => ({
    stations: state.ishikawaline.Stations,
    timetable: state.timetable
});

export default connect(mapStateToProps, bindActions)(IshikawaLine);