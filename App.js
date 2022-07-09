// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import MainTabScreen from "./screens/MainTabScreen";
import DrawContent from './screens/DrawerContent';

const HomeStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from "./screens/SignUpScreen";

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#fff'
        },
        headerTintColor: '#8A0808',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name={"HomeScreen"} component={MainTabScreen} options={{
            title: 'KU',
            headerLeft: () => (
                <MaterialCommunityIcons name={'menu'} size={25} color={'#8A0808'} onPress={() => navigation.openDrawer()}/>
            )
        }}/>
    </HomeStack.Navigator>
)
const LoginStackScreen = () => (
    <LoginStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTintColor: '#8A0808',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <LoginStack.Screen name={"LoginScreen"} component={LoginScreen} options={{
            headerShown: false
        }}/>
        <LoginStack.Screen name={"SignUpScreen"} component={SignUpScreen} options={{
            headerShown: false
        }}/>
    </LoginStack.Navigator>
)
const App = ({navigation}) => {
  return (
      <NavigationContainer>
          <Drawer.Navigator drawerContent={props => <DrawContent {...props}/>}>
              <Drawer.Screen name={'Main'} component={HomeStackScreen} options={{headerShown: false}}/>
              <Drawer.Screen name={'LoginScreen'} component={LoginStackScreen} options={{headerShown: false}}/>
          </Drawer.Navigator>
      </NavigationContainer>
  );
}

export default App;
