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
import {color} from 'react-native-reanimated';

export default function Player({navigation, route}) {
  const item = route.params;

  navigation.setOptions({
    title: item.game,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post('https://zavalabs.com/bigetronesports/api/player.php', {
        key: item.game,
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('PlayerDetail', item)}
        style={{
          marginVertical: 10,

          borderWidth: 1,
          borderColor: colors.primary,

          borderRadius: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.border,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: item.foto}}
              style={{
                aspectRatio: 1,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{paddingLeft: 10, flex: 1}}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
              }}>
              {item.nama}
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                color: colors.black,
              }}>
              {item.gender}
            </Text>
          </View>
          <Icon
            type="ionicon"
            size={30}
            name="chevron-forward-circle-outline"
            color={colors.primary}
          />
        </View>
      </TouchableOpacity>
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
          }}>
          PLAYER
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: 20,
            color: colors.primary,
            marginBottom: 20,
          }}>
          {item.game}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList data={data} renderItem={_renderItem} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
