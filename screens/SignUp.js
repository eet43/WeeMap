import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert, AsyncStorage
} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const SignUp = ({navigation}) => {
    const [id, setId] = useState(0);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');

    const summit = () => {
        axios
            .post('http://52.79.203.173:8000/account/register/', {
                user_id: id,
                password: password,
                user_name: name,
                email: email,
                department: department,
            })
            .then(function (response) {
                if (response.status == 201) {
                    //회원가입 성공
                    AsyncStorage.setItem(
                        'User',
                        JSON.stringify({
                            id: response.data['user_id'],
                            department: response.data['department'],
                            name: response.data['user_name'],
                        }),
                        () => {
                            console.log('회원가입완료');
                            console.log(response);
                        },
                    );
                    Alert.alert('회원가입 완료');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>정보를 맞게 입력해주세요</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text_footer}>아이디</Text>
                <View style={styles.action}>
                    <FontAwesome name={'user-o'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'아이디를 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setId(text)}/>
                </View>
                <Text style={[styles.text_footer, {marginTop: 15}]}>비밀번호</Text>
                <View style={styles.action}>
                    <FontAwesome name={'lock'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'비밀번호를 입력하세요'} style={styles.textInput} autoCapitalize={'none'} secureTextEntry={true}/>
                </View>
                <Text style={[styles.text_footer, {marginTop: 15}]}>비밀번호 확인</Text>
                <View style={styles.action}>
                    <FontAwesome name={'lock'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'비밀번호를 재입력하세요'} style={styles.textInput} autoCapitalize={'none'} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
                </View>
                <Text style={[styles.text_footer, {marginTop: 15}]}>이름</Text>
                <View style={styles.action}>
                    <FontAwesome name={'tag'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'실명을 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setName(text)}/>
                </View>
                <Text style={[styles.text_footer, {marginTop: 15}]}>이메일</Text>
                <View style={styles.action}>
                    <FontAwesome name={'envelope-o'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'이메일을 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setEmail(text)}/>
                </View>
                <Text style={[styles.text_footer, {marginTop: 15}]}>소속</Text>
                <View style={styles.action}>
                    <FontAwesome name={'search'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'학교 소속을 입력하세요 ex)과기대'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setDepartment(text)}/>
                </View>


                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            backgroundColor: '#8A0808',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                        onPress={() => {navigation.goBack()}}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff' }]}>로그인</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => summit()}
                        style={[styles.signIn, {
                            backgroundColor: '#8A0808',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff' }]}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8A0808'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
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

