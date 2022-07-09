import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};
const ScheduleScreen: React.FC = () => {
    const items = {'2021-11-08': [{name: 'IDLE Python 자격증 일정', time: '2021/11/08~2021/11/19'}],
        '2021-11-19': [{name: 'IDLE Python 자격증 일정(당일 시험)', time: '2021/11/08~2021/11/19'}, {name: '캡스톤 디자인2 마감', time: '2021/11/19'}],
        '2021-11-30': [{name: '캡스톤 디자인2 발표회', time: '2021/11/30~2021/11/30'}],
        '2021-12-07': [{name: '기말고사', time: '2021/12/07~2021/12/20'}], '2021-12-20': [{name: '기말고사', time: '2021/12/07~2021/12/20'}]}

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Text>{item.time}</Text>
                            <Text>{item.name}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1}}>
            <Agenda
                items={items}
                selected={Date()}
                renderItem={renderItem}
                markingType='multi-period'
                markedDates={{
                    '2021-11-08': {
                        periods: [
                            {startingDay: true, endingDay: false, color: '#ffa500'},
                        ]
                    },
                    '2021-11-19': {
                        periods: [
                            {startingDay: true, endingDay: true, color: '#5f9ea0'},
                            {startingDay: false, endingDay: true, color: '#ffa500'},
                        ]
                    },
                    '2021-11-30': {
                        periods: [
                            {startingDay: true, endingDay: true, color: 'red'},
                        ]
                    },
                    '2021-12-07': {
                        periods: [
                            {startingDay: true, endingDay: false, color: 'blue'},
                        ]
                    },
                    '2021-12-20': {
                        periods: [
                            {startingDay: false, endingDay: true, color: 'blue'},
                        ]
                    },
                }}
            />
        </View>
    );
};

export default ScheduleScreen;
