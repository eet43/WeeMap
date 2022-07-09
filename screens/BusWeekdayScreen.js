import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView, FlatList} from 'react-native';
import {Table, Row, Rows, TableWrapper, Col} from 'react-native-table-component';
import axios from 'axios';


const CONTENT = {
    tableHead: ['NO', '학교', '역뒤']
};
const BusWeekdayScreen = () => {
    const [Items, setItems] = useState([]);

    useEffect(()=> {
        axios
            .post('http://52.79.203.173:8000/tab/weekbus/', {
                is_holiday : 1,
            })
            .then(function (response) {
                console.log(response)
                setItems(response.data)
                console.log(Items)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>금요일은 NO 34, 35, 36, 37, 38, 39, 40 운휴함</Text>
            </View>
            <TableWrapper borderStyle={{borderWidth: 1.5}}>
                <Table>
                    <Row
                        data={CONTENT.tableHead}
                        flexArr={[1, 3, 3]}
                        style={styles.head}
                        textStyle={styles.titleText}
                    />
                    <TableWrapper style={styles.wrapper}>
                        <FlatList
                            data={Items}
                            renderItem={({item}) => (
                                <Row
                                    data={[`${item.title}`, `${item.schedule_school}`, `${item.schedule_station}`]}
                                    flexArr={[1, 3, 3]}
                                    style={styles.row}
                                    textStyle={styles.text}
                                />
                            )}
                            numColumns={1}
                            keyExtractor={item => `key-${item.id}`}/>
                    </TableWrapper>
                </Table>
            </TableWrapper>
        </SafeAreaView>
    );
}

export default BusWeekdayScreen

const styles = StyleSheet.create({
    container: { flex: 1, marginTop: 10, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#8A0808' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#8A0808' },
    row: { height: 50, borderWidth: 1.2 },
    text: { textAlign: 'center', fontSize: 18},
    titleText: {textAlign: 'center', fontWeight: 'bold', color: '#fff', fontSize: 15}
});
