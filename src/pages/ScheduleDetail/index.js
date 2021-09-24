import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {getData, storeData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import Drawer from 'react-native-drawer';
import {MyButton} from '../../components';

export default function ScheduleDetail({navigation, route}) {
  const item = route.params;

  navigation.setOptions({
    title: item.game,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post('https://zavalabs.com/bigetronesports/api/jadwal.php', {
        game: item.game,
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: colors.primary,
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <Icon type="ionicon" name="calendar-outline" color={colors.primary} />
        <View style={{paddingLeft: 10}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
            }}>
            {item.keterangan}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.black,
            }}>
            {item.waktu}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        padding: 10,
        paddingTop: 50,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            resizeMode: 'contain',
            width: 100,
            height: 100,
            aspectRatio: 1,
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: 20,
            color: colors.primary,
            marginBottom: 20,
          }}>
          {item.game} SCHEDULE
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: 20,
            color: colors.primary,
          }}>
          UPCOMING
        </Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList data={data} renderItem={_renderItem} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
