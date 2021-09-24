import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../utils/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function MyCarouser2() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  useEffect(() => {
    // axios.get('https://zavalabs.com/sebatiku/api/slider.php').then(res => {
    //   setData(res.data);
    // });
  }, []);

  const [data, setData] = useState([
    {
      go: 'Barang3',
      image: {
        uri: 'https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2020/08/Sekolah-Tahfidz-Khairunnas.jpeg',
      },
      id: '1',
    },
    {
      go: 'Barang3',
      image: {
        uri: 'https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2020/08/SD-Islam-Surabaya-Khairunnas.jpeg',
      },
      id: '2',
    },

    {
      go: 'Barang',
      image: {
        uri: 'https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2020/08/TK-Islam-Khairunnas.jpeg',
      },
      id: '17',
    },
    {
      go: 'Barang2',
      image: {
        uri: 'https://www.pesantrenkhairunnas.sch.id/wp-content/uploads/2020/08/SMP-Khairunnas.jpeg',
      },
      id: '18',
    },
  ]);

  const renderCarouselItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.go, item)}
      style={styles.cardContainer}
      key={item.id}>
      <Image
        source={item.image}
        style={{widht: 200, height: 130, resizeMode: 'cover'}}
      />
    </TouchableOpacity>
  );

  const _renderItem = ({item, index}) => {
    return (
      <TouchableNativeFeedback>
        <ImageBackground
          key={item.id}
          resizeMode="contain"
          source={item.image}
          style={{
            height: Math.round((windowWidth * 9) / 14),
          }}
        />
      </TouchableNativeFeedback>
    );
  };

  return (
    <View>
      <Carousel
        loop={true}
        // layout="stack"
        layoutCardOffset={18}
        data={data}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    // position: 'absolute',
    bottom: 0,
    marginBottom: 30,
  },
  cardContainer: {
    backgroundColor: colors.black,
    opacity: 1,
    height: 130,
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    height: 50,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },
});
