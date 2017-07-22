// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist App

import React, { Component } from 'react';
import { View, Text, Picker, Modal } from 'react-native';
import { Grid, Col, Row, CheckBox } from 'react-native-elements';
import { connect} from 'react-redux';

import { fetchTsurugi } from '../../redux/actions/tsurugi';
import TimeTable from './timetable';
import styles from './styles';

const stations = [
    { key: 'jaist', label: 'Jaist'},
    { key: 'haiketumae', label: 'Haiteku-Mae'},
    { key: 'miyatake', label: 'Miyatake'},
    { key: 'todashino', label: 'Todashino'},
    { key: 'iwamoto', label: 'Iwamoto'},
    { key: 'hontsurugi', label: 'Hon-Tsurugi (JP Bank)'},
    { key: 'tsurugihonmachi', label: 'Tsurugi-Honmachi (Lets)'},
    { key: 'tsurugi', label: 'Tsurugi'},
];

class ShuttleBus extends Component {

    constructor(props) {
        super(props);

        this._getTimetable.bind(this);
        this._onDirectionChanged.bind(this);
        this._onCheckToJaist.bind(this);
        this._onCheckToTsurugi.bind(this);

        this.state = {
            isWaiting: false,
            station: 'jaist',
            direction: 'tsurugi',
            tojaist: false,
            totsurugi: true,
        };
    }

    componentWillMount() {
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
                    <CheckBox title='To Tsurugi' checked={this.state.totsurugi} onIconPress={this._onCheckToTsurugi.bind(this)} />
                    <CheckBox title='To Jaist' checked={this.state.tojaist} onIconPress={this._onCheckToJaist.bind(this)} />
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
     * Update weekdays/holidays option
     *
     * @module Shuttle/ShuttleBus
     * @ngdoc method
     * @name $_onCheckWeekdays
     */
    _onCheckToJaist() {
        if (this.state.tojaist) {
            this.setState({
                tojaist: false,
                totsurugi: true
            });
            this._onDirectionChanged('tsurugi');
        } else {
            this.setState({
                tojaist: true,
                totsurugi: false
            });
            this._onDirectionChanged('jaist');
        }
    }

    /**
     * Update weekdays/holidays option
     *
     * @module Shuttle/ShuttleBus
     * @ngdoc method
     * @name $_onCheckHolidays
     */
    _onCheckToTsurugi() {
        if (this.state.totsurugi) {
            this.setState({
                tojaist: true,
                totsurugi: false
            });
            this._onDirectionChanged('jaist');
        } else {
            this.setState({
                tojaist: false,
                totsurugi: true
            });
            this._onDirectionChanged('tsurugi');
        }
    }

    /**
     * Update timetable since direction was changed
     *
     * @module Shuttle/ShuttleBus
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
     * @module Timetable/Station
     * @ngdoc method
     * @name $_onStationChanged
     * @param  {String} [value] stations name
     */
    _onStationChanged(value) {
        if (value == 'tsurugi')
            this.setState({
                station: value,
                direction: 'jaist'
            });
        else if (value == 'jaist')
            this.setState({
                station: value,
                direction: 'tsurugi'
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
     * @module Timetable/Station
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