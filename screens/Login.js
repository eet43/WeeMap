import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";



const Login = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>환영합니다</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text_footer}>아이디</Text>
                <View style={styles.action}>
                    <FontAwesome name={'user-o'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'아이디를 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'}/>
                </View>

                <Text style={[styles.text_footer, {marginTop: 35}]}>비밀번호</Text>
                <View style={styles.action}>
                    <FontAwesome name={'lock'} color={'#05375a'} size={20}/>
                    <TextInput placeholder={'비밀번호를 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} secureTextEntry={true}/>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            backgroundColor: '#8A0808',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                        onPress={() => {}}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff' }]}>로그인</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            backgroundColor: '#8A0808',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff' }]}>회원가입</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.signIn, {
                            backgroundColor: '#8A0808',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff' }]}>돌아가기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;

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
        marginTop: 50
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
