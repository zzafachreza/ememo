import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function MySchedule() {
  useEffect(() => {
    axios.get('https://zavalabs.com/bigetronesports/api/game.php').then(res => {
      console.log(res.data);
      setData(res.data);
      // setData(res.data.data);
    });
  }, []);

  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ScheduleDetail', item)}
        activeOpacity={1.0}>
        <Image style={styles.image} source={{uri: item.foto}} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        style={{
          flex: 1,
          // padding: 10,
          backgroundColor: '#FFF',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            padding: 10,
            alignItems: 'center',
            paddingVertical: 5,
            backgroundColor: colors.white,
          }}>
          <Icon
            type="ionicon"
            name="calendar-outline"
            color={colors.primary}
            size={20}
          />
          <Text
            style={{
              flex: 1,
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              left: 10,
              fontSize: 20,
            }}>
            SCHEDULE
          </Text>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              resizeMode: 'contain',
              width: 70,
              height: 70,
              aspectRatio: 1,
            }}
          />
        </View>
        <View style={{padding: 10}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    shadowColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,

    elevation: 5,

    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 10,
    flex: 1,
  },
  detailsContainerButton: {
    paddingHorizontal: 5,
  },
  title: {
    marginBottom: 7,
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18,
    color: colors.black,
  },
  subTitle: {
    // flex: 1,
    // backgroundColor: 'red',
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
});
