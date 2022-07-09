import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Food_student from "./FoodStudentScreen";
import FoodScreen from "./FoodScreen";

const Top = createMaterialTopTabNavigator();

const FoodTab = ({navigation}) => {
    return (
        <Top.Navigator screenOptions={{
            tabBarStyle: {borderTopWidth: 2, borderColor: '#8A0808'},
            tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
            tabBarIndicatorStyle: {backgroundColor: '#8A0808'}
        }}>
            <Top.Screen name={'Food1'} component={FoodScreen} options={{title: '교직원 식당'}}/>
            <Top.Screen name={'Food2'} component={Food_student} options={{title: '진리관 식당'}} />
        </Top.Navigator>
    );
};

export default FoodTab;
