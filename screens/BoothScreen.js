import React, {useEffect, useState} from 'react';
import {
    StatusBar,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    Pressable, Platform, Dimensions,
} from 'react-native';
import {
    ImageHeaderScrollView,
    TriggeringView,
} from 'react-native-image-header-scroll-view';
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

// booth_name: name,
//     booth_host: department,
//     start_date: start,
//     end_date: end,
//     booth_explain: explain,
const BoothScreen = ({route, navigation}) => {
    const [itemData,setItemData] = useState('');
    const [isLoding, setIsLoding] = useState(false);
    const [id, setId] = useState(route.params.record.id);
    const [building, setBuilding] = useState(route.params.record.is_building);

    useEffect(() => {
        setIsLoding(true);
        axios
            .post('http://52.79.203.173:8000/map/markerinfo/',{
                id: id,
                is_building: building
            })
            .then(function (response) {
                console.log(response.data[0]);

                setItemData(response.data[0]);
            })
            .catch(console.error)
            .finally(() => setIsLoding(false));
    }, []);

    return (
        <View style={styles.container}>
            <ImageHeaderScrollView ///이미지 불러오는 부분, 이미지 정보 input 생성하고 수정해야함.
                maxHeight={MAX_HEIGHT}
                minHeight={MIN_HEIGHT}
                maxOverlayOpacity={0.7}
                minOverlayOpacity={0.3}
                renderHeader={() => (
                    <Image
                        source={require('../assets/crimson2negative.jpeg')}
                        style={styles.image}
                    />
                )}>

                <TriggeringView style={styles.section}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.title}>{itemData.booth_name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <FontAwesome name="user-o" size={20} color='#8A0808' />
                            <Text style={{marginHorizontal: 2, marginLeft:10, fontSize: 16}}>{itemData.booth_host}</Text>
                        </View>
                    </View>
                </TriggeringView>
                <View style={[styles.section, styles.sectionLarge]}>
                    <Text style={{fontsize: 13, marginBottom:10, color: '#848484'}}>{itemData.start_date} ~ {itemData.end_date}</Text>
                    <Text style={styles.sectionContent}>{itemData.booth_explain}</Text>
                </View>
            </ImageHeaderScrollView>
        </View>
    );
};

export default BoothScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 18,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 17,
        textAlign: 'justify',
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    categoryContainer: {
        flexDirection: 'row',
        backgroundColor: '#FF8000',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        paddingHorizontal: 15,
    },
    category: {
        fontSize: 15,
        color: '#fff',
        marginLeft: 10,
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 24,
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 40 : 5,
        opacity: 0,
    },
    navTitle: {
        color: 'white',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    sectionLarge: {
        minHeight: 300,
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#FF8000',
        borderRadius: 20,
        padding: 10,
    },
});
