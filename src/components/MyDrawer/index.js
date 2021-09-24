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
import axios from 'axios';
import Drawer from 'react-native-drawer';
import {MyButton} from '../../components';
import {useNavigation} from '@react-navigation/native';

export default function MyDrawer({closeDrawer}) {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const handleLogout = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
  };

  useEffect(() => {
    axios.get('https://zavalabs.com/bigetronesports/api/game.php').then(res => {
      console.log(res.data);
      setData(res.data);
      // setData(res.data.data);
    });

    getData('user').then(res => {
      console.log(res);
      setUser(res);
      getData('token').then(res => {
        console.log('data token darsi drawer,', res);
        setToken(res.token);
        axios
          .post('https://zavalabs.com/bigetronesports/api/update_token.php', {
            id_member: user.id,
            token: res.token,
          })
          .then(res => {
            console.log('update token', res);
          });
      });
    });
  }, []);

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: colors.primary,
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Image
            source={require('../../assets/logo2.png')}
            style={{
              resizeMode: 'contain',
              width: 50,
              height: 50,
              aspectRatio: 1,
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={closeDrawer}>
          <Icon
            size={50}
            type="ionicon"
            name="close-outline"
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigation.replace('MainApp')}
          style={{
            marginVertical: 10,
            backgroundColor: colors.tertiary,
            padding: 10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 22,
              color: colors.white,
            }}>
            Data Santri
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon type="ionicon" name="chevron-forward" color={colors.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace('MainApp')}
          style={{
            marginVertical: 10,
            backgroundColor: colors.tertiary,
            padding: 10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 22,
              color: colors.white,
            }}>
            Data Wali Santri
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon type="ionicon" name="chevron-forward" color={colors.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace('MainApp')}
          style={{
            marginVertical: 10,
            backgroundColor: colors.tertiary,
            padding: 10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 22,
              color: colors.white,
            }}>
            Setelan
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon type="ionicon" name="chevron-forward" color={colors.white} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={{
            marginVertical: 10,

            padding: 10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flex: 1,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 22,
              color: colors.white,
            }}>
            Ubah Profile
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon type="ionicon" name="settings" color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>
      {/* <MyButton
        onPress={() => navigation.navigate('EditProfile', user)}
        title="Edit Profile"
        warna={colors.border}
        colorText={colors.secondary}
      /> */}

      <MyButton
        title="LOGOUT"
        Icons="log-out-outline"
        warna={colors.secondary}
        onPress={handleLogout}
      />
    </View>
  );
}
