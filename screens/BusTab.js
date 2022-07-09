import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BusWeekdayScreen from "./BusWeekdayScreen";
import BusWeekendScreen from "./BusWeekendScreen";

const Top = createMaterialTopTabNavigator();

const BusTab = ({navigation}) => {
    return (
        <Top.Navigator screenOptions={{
            tabBarStyle: {borderTopWidth: 2, borderColor: '#8A0808'},
            tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
            tabBarIndicatorStyle: {backgroundColor: '#8A0808'}
        }}>
            <Top.Screen name={'Weekday'} component={BusWeekdayScreen} options={{title: '평일'}}/>
            <Top.Screen name={'Weekend'} component={BusWeekendScreen} options={{title: '일요일'}} />
        </Top.Navigator>
    );
};

export default BusTab;

