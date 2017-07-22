// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist App

import React, { Component } from 'react';
import { View, Text, Picker, Modal } from 'react-native';
import { Grid, Col, Row, CheckBox } from 'react-native-elements';
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

class IshikawaLine extends Component {

    constructor(props) {
        super(props);

        this._getTimetable.bind(this);
        this._onDirectionChanged.bind(this);
        this._onCheckToNomachi.bind(this);
        this._onCheckToTsurugi.bind(this);

        this.state = {
            isWaiting: false,
            station: 'tsurugi',
            direction: 'nomachi',
            tonomachi: true,
            totsurugi: false,
        };
    }

    componentWillMount() {
        console.log('DEUBG', this.props.stations);
        this._getTimetable(this.state.station, this.state.direction);
    }

    render() {
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
                    <CheckBox title='To Nomachi' checked={this.state.tonomachi} onIconPress={this._onCheckToNomachi.bind(this)} />
                    <CheckBox title='To Tsurugi' checked={this.state.totsurugi} onIconPress={this._onCheckToTsurugi.bind(this)} />
                </View>
                <View style={{flexDirection: 'row', marginLeft: 5, marginRight: 5, height: 50 }}>  
                    <Text style={{ color: '#000000', alignSelf: 'center', width: 90 }}>Bus Station:</Text>
                    <Picker style={{ flex: 1 }} mode="dropdown" selectedValue={this.state.station} onValueChange={this._onStationChanged.bind(this)}>
                    {
                        stations.map((station) => {
                            return (<Picker.Item label={station.label} key={station.key} value={station.key} />);
                        })
                    }
                    </Picker>
                </View>
                <View style={{ flex: 1 }}>
                    <TimeTable />
                </View>
            </View>
        );
    }

    /**
     * Update direction
     *
     * @module Hokutetsu/IshikawaLine
     * @ngdoc method
     * @name $_onCheckToNomachi
     */
    _onCheckToNomachi() {
        if (this.state.tonomachi) {
            this.setState({
                tonomachi: false,
                totsurugi: true
            });
            this._onDirectionChanged('tsurugi');
        } else {
            this.setState({
                tonomachi: true,
                totsurugi: false
            });
            this._onDirectionChanged('nomachi');
        }
    }

    /**
     * Update direction
     *
     * @module Hokutetsu/IshikawaLine
     * @ngdoc method
     * @name $_onCheckToTsurugi
     */
    _onCheckToTsurugi() {
        if (this.state.totsurugi) {
            this.setState({
                tonomachi: true,
                totsurugi: false
            });
            this._onDirectionChanged('nomachi');
        } else {
            this.setState({
                tonomachi: false,
                totsurugi: true
            });
            this._onDirectionChanged('tsurugi');
        }
    }

    /**
     * Update timetable since direction was changed
     *
     * @module Hokutetsu/IshikawaLine
     * @ngdoc method
     * @name $_onDirectionChanged
     * @param  {String} [value] directions name
     */
    _onDirectionChanged(value: string) {
        this.setState({
            direction: value
        });

        console.log("_onDirectionChanged", value);
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
        if (value == 'nomachi')
            this.setState({
                station: value,
                direction: 'tsurugi'
            });
        else if (value == 'tsurugi')
            this.setState({
                station: value,
                direction: 'nomachi'
            });
        else
            this.setState({
                station: value
            });
        console.log("_onStationChanged", value);

        this._getTimetable(value, this.state.direction);
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
        console.log('[ShuttleBus] _getTimetable', station);
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