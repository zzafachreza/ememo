import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MyButton} from '../../components';
import {useIsFocused} from '@react-navigation/native';

export default function ListData({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    // console.log('list transaksi', obj.notification);
    getData('user').then(res => {
      setUser(res);
      // console.log(res);

      axios
        .post('https://zavalabs.com/ememo/api/transaksi.php', {
          id_member: res.id,
        })
        .then(res => {
          // console.log(res.data);
          setData(res.data);
        });
    });
  });

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        // console.log(res);

        axios
          .post('https://zavalabs.com/ememo/api/transaksi.php', {
            id_member: res.id,
          })
          .then(res => {
            console.log(res.data);
            setData(res.data);
          });
      });
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          padding: 10,
          flex: 1,
        }}>
        {data.map(item => {
          return (
            <View
              style={{
                margin: 5,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderColor: colors.primary,
                borderWidth: 1,
                backgroundColor: colors.white,
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log('cek detail', item);
                  navigation.navigate('ListDetail', item);
                }}
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1, padding: 10}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: 12,
                    }}>
                    Nomor - Perihal :
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: 20,
                    }}>
                    {item.nomor}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: 16,
                      color: colors.primary,
                    }}>
                    {item.pembuat_nama}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                    }}>
                    {item.tanggal}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      // borderBottomRightRadius: 10,
                      // backgroundColor: colors.border,
                      fontFamily: fonts.secondary[600],
                      fontSize: 25,
                      color: colors.black,
                      padding: 10,
                    }}>
                    Rp. {item.total}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
