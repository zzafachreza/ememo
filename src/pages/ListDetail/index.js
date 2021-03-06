import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';
import {fonts, windowWidth, windowHeight} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import FileViewer from 'react-native-file-viewer';

export default function ListDetail({navigation, route}) {
  const item = route.params;
  navigation.setOptions({title: item.kode});
  const [data, setData] = useState([]);
  const [buka, setBuka] = useState(false);

  useEffect(() => {
    axios
      .post('https://zavalabs.com/mylaundry/api/transaksi_detail.php', {
        kode: item.kode,
      })
      .then(res => {
        console.log('detail transaksi', res.data);
        setData(res.data);
      });
  }, []);

  const ListMydata = ({kolom, isi}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, padding: 10}}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              backgroundColor: colors.white,

              color: colors.black,
            }}>
            {kolom}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex: 2,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              backgroundColor: colors.white,
              fontSize: 14,
              padding: 10,
              color: colors.black,
            }}>
            {isi}
          </Text>
        </View>
      </View>
    );
  };

  const DataPesanan = () => {
    return (
      <View
        style={{
          backgroundColor: colors.white,
          marginTop: 10,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            backgroundColor: colors.secondary,
            padding: 10,
            color: colors.white,
          }}>
          kategori Surat {item.kategori}
        </Text>

        <ListMydata kolom="Nomor" isi={item.nomor} />
        <ListMydata kolom="Perihal" isi={item.perihal} />
        <ListMydata kolom="Lampiran" isi={item.lampiran} />
        {item.lampiran == 'Ada' && (
          <View
            style={{
              padding: 10,
            }}>
            {!buka && (
              <TouchableOpacity
                onPress={() => {
                  setBuka(true);
                }}
                style={{
                  padding: 10,
                  backgroundColor: colors.tertiary,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Icon type="ionicon" name="caret-up" color={colors.white} />

                <Text
                  style={{
                    left: 10,
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                  }}>
                  Lihat Bukti Lampiran
                </Text>
              </TouchableOpacity>
            )}

            {buka && (
              <TouchableOpacity
                onPress={() => {
                  setBuka(false);
                }}
                style={{
                  padding: 10,
                  backgroundColor: colors.border,
                  borderRadius: 10,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon type="ionicon" name="caret-down" color={colors.white} />

                <Text
                  style={{
                    left: 10,
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                  }}>
                  Tutup Bukti Lampiran
                </Text>
              </TouchableOpacity>
            )}
            {buka && (
              <Image
                source={{uri: item.link}}
                style={{
                  resizeMode: 'contain',
                  width: '100%',
                  height: 300,
                }}
              />
            )}
          </View>
        )}
        <ListMydata kolom="Pembuat" isi={item.pembuat_nama} />
        <ListMydata kolom="Tanggal Buat" isi={item.tanggal} />
        <ListMydata kolom="Waktu Buat" isi={item.waktu} />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Ttd', item)}
          style={{
            padding: 15,
            backgroundColor: colors.danger,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon type="ionicon" name="eye" color={colors.white} />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25,
              color: colors.white,
              left: 10,
            }}>
            Lihat Format PDF
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
          }}>
          {item.satu_status == '' && (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://api.whatsapp.com/send?phone=' +
                    item.hp_satu +
                    '&text=Yth,%20Kami%20kirimkan%20e%20memo(%20Surat%20Elektronik),%20menunggu%20pemeriksaan%20/%20tanda%20tangan.%20Mohon%20Klik%20link%20ini%3A%0Ahttps%3A%2F%2Fzavalabs.com%2Fememo%2Fapi%2Fform_setuju.php?/' +
                    item.id,
                )
              }
              style={{
                flex: 1,
                padding: 20,
                backgroundColor: colors.black,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon type="ionicon" name="logo-whatsapp" color={colors.white} />
              <View>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.white,
                    left: 10,
                  }}>
                  Share Penyetuju 1
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.white,
                    left: 10,
                  }}>
                  {item.satu_pemeriksa}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {item.dua_status == '' && (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://api.whatsapp.com/send?phone=' +
                    item.hp_dua +
                    '&text=Yth,%20Kami%20kirimkan%20e%20memo(%20Surat%20Elektronik),%20menunggu%20pemeriksaan%20/%20tanda%20tangan.%20Mohon%20Klik%20link%20ini%3A%0Ahttps%3A%2F%2Fzavalabs.com%2Fememo%2Fapi%2Fform_pimpinan.php?/' +
                    item.id,
                )
              }
              style={{
                flex: 1,
                padding: 20,
                backgroundColor: colors.success,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon type="ionicon" name="logo-whatsapp" color={colors.white} />
              <View>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.white,
                    left: 10,
                  }}>
                  Share Penyetuju 2
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.white,
                    left: 10,
                  }}>
                  {item.dua_pemeriksa}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={{padding: 10, flex: 1}}>
          <DataPesanan />

          <Text
            style={{
              fontFamily: fonts.secondary[600],
              backgroundColor: '#DEDEDE',
              padding: 10,
              color: colors.black,
            }}>
            Isi Surat
          </Text>
          <View style={{paddingBottom: 10}}>
            <Text
              style={{
                margin: 10,
                fontFamily: fonts.secondary[400],
                color: colors.black,
                textAlign: 'justify',
              }}>
              {item.isi}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,

    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    height: 80,
    margin: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    textAlign: 'center',
  },
});
