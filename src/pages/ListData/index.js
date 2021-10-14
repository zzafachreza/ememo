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
import {MyButton, MyGap} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements/dist/icons/Icon';

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
            console.log('data_surat', res.data);
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
                marginBottom: 10,

                borderColor: colors.primary,
                borderWidth: 1,
                backgroundColor: colors.white,
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log('cek detail', item);
                  navigation.navigate('ListDetail', item);
                }}>
                <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>
                      Kategori
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                      }}>
                      {item.kategori}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>
                      Tanggal
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                      }}>
                      {item.tanggal}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                      }}>
                      {item.waktu}
                    </Text>
                  </View>
                  <View style={{paddingHorizontal: 20}}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>
                      Nomor
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                      }}>
                      {item.nomor}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>
                      Perihal
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                      }}>
                      {item.perihal}
                    </Text>
                  </View>
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
                      fontSize: 16,
                      color: colors.black,
                      padding: 10,
                    }}>
                    Rp. {item.total}
                  </Text>
                </View>
                {/*  */}
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>
                      Pembuat
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                      }}>
                      {item.pembuat_nama}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>
                      Penyetuju 1
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                      }}>
                      {item.satu_pemeriksa}
                    </Text>

                    {item.satu_status == 'SETUJU' && (
                      <View>
                        <Icon
                          type="ionicon"
                          name="checkmark-circle"
                          color={colors.success}
                        />
                      </View>
                    )}

                    {item.satu_status == 'TIDAK SETUJU' && (
                      <View>
                        <Icon
                          type="ionicon"
                          name="close-circle"
                          color={colors.danger}
                        />
                      </View>
                    )}

                    {item.satu_status == '' && (
                      <View>
                        <Icon
                          type="ionicon"
                          name="document"
                          color={colors.primary}
                        />
                      </View>
                    )}
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                      }}>
                      Penyetuju 2
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                      }}>
                      {item.dua_pemeriksa}
                    </Text>

                    {item.satu_status == 'SETUJU' && (
                      <View>
                        <Icon
                          type="ionicon"
                          name="checkmark-circle"
                          color={colors.success}
                        />
                      </View>
                    )}

                    {item.satu_status == 'TIDAK SETUJU' && (
                      <View>
                        <Icon
                          type="ionicon"
                          name="close-circle"
                          color={colors.danger}
                        />
                      </View>
                    )}

                    {item.satu_status == '' && (
                      <View>
                        <Icon
                          type="ionicon"
                          name="document"
                          color={colors.primary}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <MyGap jarak={10} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
