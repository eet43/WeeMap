import React, {useState} from 'react';
import {View, StyleSheet, Alert, SafeAreaView, AsyncStorage} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TimeTable from '@mikezzb/react-native-timetable';

const eventGroups = [
    {
        courseId: '',
        title: '소프트웨어공학 및 실습(영강)',
        sections: {
            '소프트웨어공학 및 실습(영강)1': {
                days: [1],
                startTimes: ['13:00'],
                endTimes: ['15:00'],
                locations: ['과학기술 2관 228호'],
            },
            '소프트웨어공학 및 실습(영강)2': {
                days: [4],
                startTimes: ['16:00'],
                endTimes: ['18:00'],
                locations: ['과학기술 2관 315호'],
            },
        },
    },
    {
        courseId: '',
        title: '데이터베이스',
        sections: {
            '데이터베이스 1': {
                days: [1],
                startTimes: ['15:00'],
                endTimes: ['16:00'],
                locations: ['과학기술 2관 315호'],
            },
            '데이터베이스 2': {
                days: [2],
                startTimes: ['16:00'],
                endTimes: ['18:00'],
                locations: ['과학기술 2관 315호'],
            },
        },
    },
    {
        courseId: '',
        title: '알고리즘',
        sections: {
            '알고리즘 1': {
                days: [2],
                startTimes: ['12:00'],
                endTimes: ['13:00'],
                locations: ['과학기술 2관 310호'],
            },
            '알고리즘 2': {
                days: [3],
                startTimes: ['17:00'],
                endTimes: ['19:00'],
                locations: ['과학기술 2관 310호'],
            },
        },
    }];

const DrawerContent = ({navigation, props}) => {
    const [name,setName] = useState('사용자'); ///이름
    const [department,setDepartment] = useState('무소속'); ///소속
    const [isLogin, setIsLogin] = useState(false);
        // AsyncStorage.getItem('User', (error, result) => {
        //     const UserInfo = JSON.parse(result);
        //     setName(UserInfo.name);
        //     setDepartment(UserInfo.department)
        // });

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://i1.wp.com/jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png?ssl=1'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, marginBottom:10, flexDirection:'column'}}>
                                <Title style={styles.title}>{`${name}`}</Title>
                                <Caption style={styles.caption}>{`${department}`}</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="map"
                                    color={'#8A0808'}
                                    size={size}
                                />
                            )}
                            label="지도"
                            labelStyle={{
                                color: 'black',
                            }}
                            onPress={() => {navigation.navigate('Home')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="login"
                                    color={'#8A0808'}
                                    size={size}
                                />
                            )}
                            label="로그인"
                            labelStyle={{
                                color: 'black',
                            }}
                            onPress={() => {navigation.navigate('Login')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="logout"
                                    color={'#8A0808'}
                                    size={size}
                                />
                            )}
                            label="로그아웃"
                            labelStyle={{
                                color: 'black',
                            }}
                            onPress={() => {navigation.navigate('Login')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="clipboard-file"
                                    color={'#8A0808'}
                                    size={size}
                                />
                            )}
                            label="등록하기"
                            labelStyle={{
                                color: 'black',
                            }}
                            onPress={() => {navigation.navigate('Post')}}
                        />
                    </Drawer.Section>
                    <SafeAreaView style={{flex:1}}>
                        <View style={{flex:1, padding: 10, marginLeft: 5}}>
                            <TimeTable
                                eventColors={['black', 'black', 'black']}
                                headerStyle={{backgroundColor: '#8A0808'}}
                                eventGroups={eventGroups}
                                eventOnPress={(event) => Alert.alert(`${JSON.stringify(event)}`)}
                                configs={{
                                    startHour: 9,
                                    endHour: 19,
                                    numOfDays: 4,
                                    numOfDaysPerPage: 5,
                                    timeTicksWidth: 30,
                                }}
                            />
                        </View>
                    </SafeAreaView>
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    headerStyle: {
        backgroundColor: '#8A0808',
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
