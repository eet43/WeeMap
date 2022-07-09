import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";

const BoardScreen = ({route, navigation}) => {
    const [data, setData] = useState([]);
    const [isLoding, setIsLoding] = useState(false);
    const [id, setId] = useState(route.params.record.building_num);
    const [building, setBuilding] = useState(route.params.record.is_building);


    useEffect(() => {
        setIsLoding(true);
        axios
            .post('http://52.79.203.173:8000/map/markerinfo/',{
                id: id,
                is_building: building
            })
            .then(function (response) {
                console.log(response.data);
                setData(response.data)
            })
            .catch(console.error)
            .finally(() => setIsLoding(false));
    }, []);

    const CartCard = ({item}) => {
        return (
            <View style={style.cartCard}>
                <Image source={require('../assets/crimson2negative.jpeg')} style={{height: 80, width: 80}} />
                <View
                    style={{
                        height: 125,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.info_name}</Text>
                    <Text style={{fontSize: 14}}>
                        위치 : {item.info_location}
                    </Text>
                    <Text style={{fontSize: 14}} numberOfLines={3}>{item.info_explain}</Text>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={{backgroundColor: '#E6E6E6', flex: 1}}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 80}}
                data={data}
                renderItem={({item}) => <CartCard item={item} />}
            />
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: 'yellow',
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
});

export default BoardScreen;
