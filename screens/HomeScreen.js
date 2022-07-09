import * as React from 'react';
import {View, Text, Image, StyleSheet, AsyncStorage, TouchableOpacity, Platform} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {useEffect, useState} from "react";
import axios from "axios";
import Card from './Card';
import { initialRegion, OUTER_CARD_WIDTH } from '../src/constants';
import Geolocation from 'react-native-geolocation-service';
async function requestPermission() {
    try {
        if (Platform.OS === "ios") {
            return await Geolocation.requestAuthorization("always");
        }
    }
    catch (e) {
        console.log(e);
    }
};

const HomeScreen = ({navigation}) => {
    const [Items, setItems] = useState([]);
    const [isLoding, setIsLoding] = useState(false);
    const [location, setLocation] = useState();


    useEffect(() => {
        setIsLoding(true);
        axios
            .post('http://52.79.203.173:8000/map/render/',)
            .then(function (response) {
                console.log(response.data);
                setItems(response.data)
            })
            .catch(console.error)
            .finally(() => setIsLoding(false));
    }, []);

    useEffect(() => {
        requestPermission().then(result => {
            if (result === "granted") {
                Geolocation.getCurrentPosition( pos => { setLocation(pos.coords); }, error => { console.log(error); }, { enableHighAccuracy: true, timeout: 3600, maximumAge: 50000, }, );
                console.log('location : ', location);
                axios
                    .post('http://52.79.203.173:8000/map/hotplace/', {
                        use_latitude: location.latitude,
                        use_longitude: location.longitude,
                    })
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(console.error)
            }
        }); }, []);

    return (
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                latitude: 36.61070851117558,
                longitude: 127.28860482523295,
                latitudeDelta: 0.003,
                longitudeDelta: 0.001,
            }}
        >
            {Items ? Items.map((item) => (
                    item.is_building === 1
                        ? <Marker coordinate={{latitude: `${item.latitude}`, longitude: `${item.longitude}`}}
                                pinColor='#8A0808'>
                            <Callout tooltip onPress={() => navigation.replace('Board', {record : item})}>
                                <View>
                                    <View style={styles.bubble}>
                                        <Text style={styles.name}>{`${item.building_name}`}</Text>
                                    </View>
                                    <View style={styles.arrowBorder}/>
                                    <View style={styles.arrow}/>
                                </View>
                            </Callout>
                        </Marker>
                        :
                        item.is_building === 0
                            ? <Marker coordinate={{latitude: `${item.latitude}`, longitude: `${item.longitude}`}}
                                      pinColor='#2978b5'>
                                <Callout tooltip onPress={() => navigation.replace('Booth', {record : item})}>
                                    <View>
                                        <View style={styles.bubble}>
                                            <Text style={styles.name}>{`${item.building_name}`}</Text>
                                        </View>
                                        <View style={styles.arrowBorder}/>
                                        <View style={styles.arrow}/>
                                    </View>
                                </Callout>
                            </Marker>
                            :
                            <Marker coordinate={{latitude: `${item.latitude}`, longitude: `${item.longitude}`}}
                                    pinColor='#01DF01'>
                                <Callout tooltip>
                                    <View>
                                        <View style={styles.bubble}>
                                            <Text style={styles.name}>핫플입니다</Text>
                                        </View>
                                        <View style={styles.arrowBorder}/>
                                        <View style={styles.arrow}/>
                                    </View>
                                </Callout>
                            </Marker>
            )):null}
        </MapView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    map: {
        height: '100%'
    },
    // Callout bubble
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
    },
    // Character name
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
    // Character image
    image: {
        width: "100%",
        height: 100,
    },
});
