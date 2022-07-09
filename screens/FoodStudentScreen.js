import React, {Component, useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import axios from "axios";

const Food_student = () => {
    scale = new Animated.Value(1)

    onZoomEventFunction = Animated.event(
        [{
            nativeEvent: {scale: this.scale}
        }],
        {
            useNativeDriver: true
        }
    )

    onZoomStateChangeFunction = (event) => {
        if(event.nativeEvent.oldState == State.ACTIVE) {
            Animated.spring(this.scale, {
                toValue: 1,
                useNativeDriver: true
            }).start()
        }
    }

    const [imageUrl, setImageUrl] = useState('');
    useEffect(()=> {
        axios
            .post('http://52.79.203.173:8000/tab/restaurant/', {
                restaurant_type : 1,
            })
            .then(function (response) {
                console.log(response.data)
                setImageUrl(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    return (
        <View style={{flex:1, paddingBottom: 20, backgroundColor: 'fff'}}>
            <PinchGestureHandler
                onGestureEvent={onZoomEventFunction}
                onHandlerStateChange={onZoomStateChangeFunction}>
                <Animated.Image style={{width:'100%', height: '100%', resizeMode: 'stretch', transform:[{scale: this.scale}]}}
                                source={{uri : imageUrl}}/>
            </PinchGestureHandler>
        </View>
    )
}


export default Food_student;
