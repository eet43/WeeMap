import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, Linking, Platform, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {isValidNumber} from "react-native-gesture-handler/lib/typescript/web/utils";
import {TextInputMask} from "react-native-masked-text";

const Post = ({props, navigation}) => {

    const [id, setId] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [explain, setExplain] = useState('');

    const summit = () => {
        axios
            .post('http://52.79.203.173:8000/map/registerbooth/', {
                latitude: latitude,
                longitude: longitude,
                booth_name: name,
                booth_host: department,
                start_date: start,
                end_date: end,
                booth_explain: explain,
            })
            .then(function (response) {
                if (response.status == 201) {
                    navigation.replace('HomeScreen');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>부스 정보를 입력해주세요</Text>
            </View>
            <View style={styles.footer}>
                <Text onPress={() => Linking.openURL('https://www.geoplaner.com/')}
                    style={styles.text_footer}>위도 값 경도 값 구하기 클릭</Text>
                <Text style={[styles.text_footer, {marginTop: 20}]}>위도</Text>
                <View style={styles.action}>
                    <FontAwesome name={'map-o'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'위도 값을 입력하세요'} style={styles.textInput} returnKeyType={'done'} keyboardType={'number-pad'} onChangeText={text => setLatitude(text)}/>
                </View>

                <Text style={[styles.text_footer, {marginTop: 15}]}>경도</Text>
                <View style={styles.action}>
                    <FontAwesome name={'map'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'경도 값을 입력하세요'} style={styles.textInput} returnKeyType={'done'} keyboardType={'number-pad'} onChangeText={text => setLongitude(text)}/>
                </View>

                <Text style={[styles.text_footer, {marginTop: 15}]}>부스이름</Text>
                <View style={styles.action}>
                    <FontAwesome name={'pencil'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'부스 이름을 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setName(text)}/>
                </View>

                <Text style={[styles.text_footer, {marginTop: 15}]}>주최</Text>
                <View style={styles.action}>
                    <FontAwesome name={'id-card-o'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'부스 진행 부서 이름을 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setDepartment(text)}/>
                </View>

                <Text style={[styles.text_footer, {marginTop: 15}]}>시작일</Text>
                <View style={styles.action}>
                    <FontAwesome name={'hourglass-start'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'부스 운영 시작일을 입력하세요 일/월/년 ex) 11-12-2021'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setStart(text)}/>
                    {/*<TextInputMask refInput={(ref) => this.hadleDateInput = ref} type={'datetime'}*/}
                    {/*               placeholder={'부스 운영 시작일을 입력하세요 일/월/년 ex) 11/12/2021'} style={styles.textInput}*/}
                    {/*               options={{*/}
                    {/*                   format: 'DD-MM-YYYY'*/}
                    {/*               }} />*/}
                </View>
                <Text style={[styles.text_footer, {marginTop: 15}]}>종료일</Text>
                <View style={styles.action}>
                    <FontAwesome name={'hourglass-end'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'부스 운영 종료일을 입력하세요 일/월/년 ex) 11-12-2021'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setEnd(text)}/>
                    {/*<TextInputMask refInput={(ref) => this.hadleDateInput = ref} type={'datetime'}*/}
                    {/*               placeholder={'부스 운영 종료일을 입력하세요 일/월/년 ex) 11/12/2021'} style={styles.textInput}*/}
                    {/*               options={{*/}
                    {/*                   format: 'DD-MM-YYYY'*/}
                    {/*               }} />*/}
                </View>
                <Text style={[styles.text_footer, {marginTop: 15}]}>부스 설명</Text>
                <View style={styles.action}>
                    <FontAwesome name={'edit'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'부스에 대한 간단한 설명을 입력하세요'} style={[styles.textInput, {height:50}]} autoComplete={'off'} returnKeyType={'done'} autoCapitalize={'none'} multiline={true}
                               onChangeText={text => setExplain(text)}/>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            backgroundColor: '#8A0808',
                            borderWidth: 1,

                        }]}
                        onPress={() => summit()}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff' }]}>등록하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default Post

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8A0808'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        flex: 15,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

