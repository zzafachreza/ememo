import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {storeData, getData} from '../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';

export default function Login({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [data, setData] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    getData('token').then(res => {
      console.log('data token,', res);
      setToken(res.token);
    });
  }, []);

  // login ok
  const masuk = () => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      axios
        .post('https://zavalabs.com/bigetronesports/api/login.php', data)
        .then(res => {
          console.log(res.data);
          setLoading(false);
          if (res.data.kode == 50) {
            showMessage({
              type: 'danger',
              message: res.data.msg,
            });
          } else {
            storeData('user', res.data);
            axios
              .post(
                'https://zavalabs.com/bigetronesports/api/update_token.php',
                {
                  id_member: res.data.id,
                  token: token,
                },
              )
              .then(res => {
                console.log('update token', res);
              });

            navigation.replace('MainApp');
          }
        });
    }, 1200);
  };
  return (
    <ImageBackground style={styles.page}>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: 250,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <LottieView
            style={{flex: 1}}
            source={require('../../assets/getstarted.json')}
            autoPlay
            loop
          /> */}

          <Image
            source={require('../../assets/logo.png')}
            style={{
              resizeMode: 'contain',
              width: 200,
              height: 200,
              aspectRatio: 1,
            }}
          />
        </View>
        <View style={styles.page}>
          <MyGap jarak={20} />
          <MyInput
            label="Username"
            iconname="person"
            value={data.nama_lengkap}
            onChangeText={value =>
              setData({
                ...data,
                email: value + '@gmail.com',
              })
            }
          />
          <MyGap jarak={20} />
          <MyInput
            label="Password"
            iconname="key"
            secureTextEntry
            onChangeText={value =>
              setData({
                ...data,
                password: value,
              })
            }
          />
          <MyGap jarak={40} />
          <MyButton
            warna={colors.primary}
            title="LOGIN"
            Icons="log-in"
            onPress={masuk}
          />
        </View>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    // backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
