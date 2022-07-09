import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BusWeekday from "./BusWeekday";
import BusWeekend from "./BusWeekend";

const Top = createMaterialTopTabNavigator();

const BusTabScreen = ({navigation}) => {
    return (
        <Top.Navigator screenOptions={{
            tabBarStyle: {borderTopWidth: 2, borderColor: '#8A0808'},
            tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
            tabBarIndicatorStyle: {backgroundColor: '#8A0808'}
        }}>
            <Top.Screen name={'Weekday'} component={BusWeekday} options={{title: '평일'}}/>
            <Top.Screen name={'Weekend'} component={BusWeekend} options={{title: '일요일'}} />
        </Top.Navigator>
    );
};

export default BusTabScreen;

