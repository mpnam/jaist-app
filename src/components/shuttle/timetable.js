// (C) Copyright 2017 mpnam1991@gmail.com
//
// Jaist App

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Grid, Col, Row} from 'react-native-elements';

import styles from './styles';

class TimeTable extends Component {

    constructor(props) {
        super(props);

        this._renderHours.bind(this);
        this._renderMinutes.bind(this);
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                <Grid style={{height: 50}}>
                    <Row>
                        <Col style={[styles.timetableHeader, { flex: 1 }]} size={1}>
                            <Text>Hours</Text>
                        </Col>
                        <Col style={[styles.timetableHeader, { flex: 2 }]} size={2}>
                            <Text>Weekdays</Text>
                        </Col>
                        <Col style={[styles.timetableHeader, { flex: 2 }]} size={2}>
                            <Text>Holidays</Text>
                        </Col>
                    </Row>
                </Grid>
                <ScrollView>
                <Grid>
                    <Col size={1}>
                        {this._renderHours(this.props.weekdays)}
                    </Col>
                    <Col size={2}>
                        {this._renderMinutes(this.props.weekdays)}
                    </Col>
                    <Col size={2}>
                        {this._renderMinutes(this.props.holidays)}
                    </Col>
                </Grid>
                </ScrollView>
            </View>
        );
    }

    _renderHours(timetable) {
        return timetable.map((time, index) => {
            if (index % 2 == 0)
                return <Row key={time.Hour} style={styles.hourRow}><Text>{time.Hour}</Text></Row>;
            return <Row key={time.Hour} style={styles.hourRowEven}><Text>{time.Hour}</Text></Row>;
        });
    }

    _renderMinutes(timetable) {
        return timetable.map((time, index) => {
            if (index % 2 == 0)
                return (
                    <Row key={time.Hour} style={styles.minRow}><Text>{time.Minutes.join().replace(",", ", ")}</Text></Row>
                );
            return (
                <Row key={time.Hour} style={styles.minRowEven}><Text>{time.Minutes.join().replace(",", ", ")}</Text></Row>
            );
        })
    }
}

const mapStateToProps = state => ({
    weekdays: state.tsurugi.Weekdays,
    holidays: state.tsurugi.Holidays
});

export default connect(mapStateToProps)(TimeTable);

