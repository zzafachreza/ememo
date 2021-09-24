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

export default function MyResults() {
  useEffect(() => {
    axios
      .get('https://zavalabs.com/bigetronesports/api/turnamen.php')
      .then(res => {
        console.log(res.data);
        setData(res.data);
        // setData(res.data.data);
      });
  }, []);

  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 5,

          borderWidth: 1,
          borderColor: colors.primary,

          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.white,
            textAlign: 'center',
            backgroundColor: colors.primary,
            fontSize: 16,
          }}>
          {item.tier}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <View>
            <Icon type="ionicon" name="trophy-outline" color={colors.black} />
          </View>
          <View
            style={{
              padding: 10,
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: 16,
                color: colors.success,
              }}>
              {item.posisi}
            </Text>
          </View>
          <View style={{flex: 8, paddingLeft: 10}}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
              }}>
              {item.turnamen}
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                color: colors.black,
              }}>
              {item.tanggal}
            </Text>
          </View>
        </View>
      </View>
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
            name="checkmark-circle-outline"
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
            TOURNAMENT RESULTS
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
