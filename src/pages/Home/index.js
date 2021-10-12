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
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {getData, storeData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyDrawer from '../../components/MyDrawer';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import Drawer from 'react-native-drawer';
import {MyButton} from '../../components';
import MyCarouser2 from '../../components/MyCarouser2';
import MyCarouser from '../../components/MyCarouser';

export default function Home({navigation}) {
  const _drawer = useRef();

  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      // console.log(res);
      setUser(res);
      getData('token').then(res => {
        // console.log('data token,', res);
        setToken(res.token);
      });
    });
    // axios
    //   .post('https://zavalabs.com/bigetronesports/api/update_token.php', {
    //     id_member: user.id,
    //     token: token,
    //   })
    //   .then(res => {
    //     console.log('update token', res);
    //   });
  }, []);

  const DataKategori = ({icon, nama, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: colors.white,
          padding: 6,
          borderRadius: 20,
          width: windowWidth / 5,
          height: 80,
          elevation: 5,
        }}>
        <View>
          <Icon
            type="ionicon"
            name={icon}
            color={colors.primary}
            size={windowWidth / 10}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.black,
              fontSize: windowWidth / 42,
              textAlign: 'center',
            }}>
            {nama}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <ScrollView>
        <View
          style={{
            height: 80,
            padding: 10,
            backgroundColor: colors.primary,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, paddingTop: 15, flexDirection: 'row'}}>
            <View style={{flex: 1, paddingLeft: 10}}>
              <Text
                style={{
                  fontSize: windowWidth / 25,
                  color: colors.white,
                  fontFamily: fonts.secondary[400],
                }}>
                Selamat Datang,
              </Text>
              <Text
                style={{
                  fontSize: windowWidth / 25,
                  color: colors.white,
                  fontFamily: fonts.secondary[600],
                }}>
                {user.nama_lengkap}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: 60,
              // backgroundColor: colors.border,
              borderWidth: 2,
              borderColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              height: 60,
              borderRadius: 60,
              marginBottom: 10,
              overflow: 'hidden',
            }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{width: 60, height: 60}}
            />
          </View>
        </View>

        <View
          style={{
            paddingTop: 20,
            paddingHorizontal: 10,
            backgroundColor: colors.white,
            paddingBottom: 20,
          }}>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('Search')}>
            <View
              style={{
                flex: 1,
                paddingLeft: 20,
                borderWidth: 1,
                height: 45,
                borderRadius: 10,
                borderColor: colors.primary,
                color: colors.primary,
                flexDirection: 'row',
                fontSize: 18,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Light',
                    fontSize: 18,
                    color: colors.primary,
                  }}>
                  Pencarian..
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingRight: 20,
                }}>
                <Icon
                  type="font-awesome"
                  name="search"
                  color={colors.primary}
                  size={18}
                />
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>

        <MyCarouser />

        {/* menu */}
        <View style={{padding: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <DataKategori
              onPress={() => navigation.navigate('Pembuat', user)}
              icon="mail"
              nama="Pembuat Surat"
            />
            <DataKategori
              onPress={() => navigation.navigate('Info')}
              icon="mail-open"
              nama="Mengetahui"
            />
            <DataKategori
              onPress={() => navigation.navigate('Tahsin')}
              icon="checkmark-circle"
              nama="Menyetujui"
            />
            <DataKategori
              onPress={() => navigation.navigate('ListData')}
              icon="folder"
              nama="File Surat"
            />
          </View>
        </View>
        {/* menu */}

        {/* banner */}

        <MyCarouser2 />

        {/* banner */}
      </ScrollView>
    </ImageBackground>
  );
}
