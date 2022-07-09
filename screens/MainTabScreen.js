import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import BusTab from "./BusTab";
import FoodTab from "./FoodTab";
import ScheduleScreen from "./ScheduleScreen"
import PostScreen from "./PostScreen";
import BoardScreen from './BoardScreen.js';
import BoothScreen from './BoothScreen';

const Tab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();
const MainStackScreen = () => (
    <MainStack.Navigator>
        <MainStack.Screen name={'Home'} component={HomeScreen} options={{headerShown:false}}/>
        <MainStack.Screen name={'BoardScreen'} component={BoardScreen} options={({route}) => ({
            // title: route.params.record.building_name,
            // headerStyle: {
            //     backgroundColor: '#fff'
            // },
            // headerTintColor: '#8A0808',
            // headerTitleStyle: {
            //     fontWeight: 'bold'
            // }
            headerShown: false
        })}/>
        <MainStack.Screen name={'BoothScreen'} component={BoothScreen} options={({route}) => ({
            headerShown: false
        })}/>
        <MainStack.Screen name={'PostScreen'} component={PostScreen} options={{headerShown:false}}/>
    </MainStack.Navigator>
)

const MainTabScreen = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    borderRadius: 15,
                    height: 60,
                    ...styles.shadow,
                },
            }}>
            <Tab.Screen
                name="MainStack"
                component={MainStackScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: '홈',
                    tabBarIcon: () => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <MaterialCommunityIcons name="home" color={'#8A0808'} size={30} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Bus"
                component={BusTab}
                options={{
                    headerShown: false,
                    tabBarLabel: '셔틀',
                    tabBarIcon: () => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <MaterialCommunityIcons name="bus" color={'#8A0808'} size={30} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Food"
                component={FoodTab}
                options={{
                    headerShown: false,
                    tabBarLabel: '학식',
                    tabBarIcon: () => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <MaterialCommunityIcons name="food" color={'#8A0808'} size={30} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Schedule"
                component={ScheduleScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: '일정',
                    tabBarIcon: () => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <MaterialCommunityIcons name="calendar-month" color={'#8A0808'} size={30} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabScreen;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});
