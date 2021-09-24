import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Accessory,
  Divider,
  ListItem,
  Icon,
  Button,
} from 'react-native-elements';
import {storeData, getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyGap} from '../../components';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

export default function PlayerDetail({navigation, route}) {
  const item = route.params;
  console.log('detail player', item);
  const [user, setUser] = useState({});
  const [iLogo, setiLogo] = useState('');
  const [data, setData] = useState([]);

  navigation.setOptions({
    title: 'PROFILE PLAYER',
  });

  useEffect(() => {
    axios
      .post('https://zavalabs.com/bigetronesports/api/prestasi.php', {
        id: item.id,
      })
      .then(res => {
        console.log('data prestasi indvu', res.data);
        setData(res.data);
      });
  }, []);

  const __renderItem = ({item}) => {
    return (
      <TouchableOpacity
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
          <View>
            <Icon type="ionicon" name="trophy" color={colors.warning} />
          </View>
          <View style={{paddingLeft: 10, flex: 1}}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
              }}>
              {item.turnamen}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={{flex: 1, padding: 10}}>
      <View
        style={{
          // backgroundColor: 'yellow',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderWidth: 2,
            borderColor: colors.primary,

            // backgroundColor: colors.secondary,
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: item.foto}}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: fonts.secondary[600],
            top: 10,
            color: colors.primary,
          }}>
          {item.nama}
        </Text>
      </View>
      <MyGap jarak={20} />
      <View
        style={{
          marginBottom: 5,
          padding: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
          }}>
          Full Name
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            color: colors.primary,
          }}>
          {item.nama}
        </Text>
      </View>

      <View
        style={{
          marginBottom: 5,
          padding: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
          }}>
          Gender
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            color: colors.primary,
          }}>
          {item.gender}
        </Text>
      </View>

      <View
        style={{
          marginBottom: 5,
          padding: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
          }}>
          Birthday
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            color: colors.primary,
          }}>
          {item.tanggal_lahir}
        </Text>
      </View>

      <View
        style={{
          marginBottom: 5,
          padding: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
          }}>
          Role
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            color: colors.primary,
          }}>
          {item.role}
        </Text>
      </View>

      <View
        style={{
          marginBottom: 5,
          padding: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            marginBottom: 10,
          }}>
          Comunication ({item.komunikasi}%)
        </Text>
      </View>
      <View
        style={{
          marginBottom: 5,
          padding: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            marginBottom: 10,
          }}>
          Mentality ({item.mental}%)
        </Text>
        <Progress.Bar
          progress={item.mental / 100}
          width={300}
          color={colors.secondary}
        />
      </View>
      <View
        style={{
          marginBottom: 5,
          padding: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            marginBottom: 10,
          }}>
          Skill Individual ({item.individu}%)
        </Text>
        <Progress.Bar
          progress={item.individu / 100}
          width={300}
          color={colors.primary}
        />
      </View>

      <View
        style={{
          marginBottom: 5,
          padding: 10,
          backgroundColor: colors.white,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            marginBottom: 10,
            color: colors.primary,
          }}>
          Achievement Individual
        </Text>

        <FlatList data={data} renderItem={__renderItem} />
      </View>
      <MyGap jarak={30} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
