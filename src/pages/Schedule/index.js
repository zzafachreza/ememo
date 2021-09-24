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
import MyCarouser from '../../components/MyCarouser';
import MySchedule from '../../components/MySchedule';
import axios from 'axios';
import Drawer from 'react-native-drawer';
import {MyButton} from '../../components';
import MyDrawer from '../../components/MyDrawer';

export default function Schdule({navigation}) {
  const _drawer = useRef();

  const handleLogout = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
  };

  const images = [
    {
      image:
        'https://images.bisnis-cdn.com/posts/2019/09/27/1153079/rruk-dynamix2.jpg',
    },
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2017/01/molen-kecil.jpg',
    },
    {
      image: 'https://kipmi.or.id/wp-content/uploads/2016/11/beton8.jpg',
    },
  ];

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
    <Drawer
      tweenHandler={ratio => ({
        main: {opacity: (2 - ratio) / 2},
      })}
      tapToClose={true}
      openDrawerOffset={0.2} // 20% gap on the right side of drawer
      panCloseMask={0.2}
      closedDrawerOffset={-3}
      ref={_drawer}
      content={<MyDrawer closeDrawer={() => _drawer.current.close()} />}>
      <ImageBackground
        style={{
          flex: 1,
        }}>
        <ScrollView>
          <View
            style={{
              height: 100,
              padding: 10,
              backgroundColor: colors.primary,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1, paddingTop: 15}}>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.white,
                  fontFamily: fonts.secondary[400],
                }}>
                Selamat datang,
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.white,
                  fontFamily: fonts.secondary[600],
                }}>
                {user.nama_lengkap}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => _drawer.current.open()}
              style={{
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="ionicon"
                name="menu-outline"
                size={35}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>

          <MySchedule />
        </ScrollView>
      </ImageBackground>
    </Drawer>
  );
}
