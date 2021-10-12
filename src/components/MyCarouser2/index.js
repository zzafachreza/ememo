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
      image: require('../../assets/satu.png'),
    },
    {
      image: require('../../assets/dua.png'),
    },
    {
      image: require('../../assets/tiga.png'),
    },
  ]);

  const renderCarouselItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.go, item)}
      style={{
        backgroundColor: colors.black,
        opacity: 1,
        height: 200,
        width: 300,
        borderRadius: 10,
        overflow: 'hidden',
      }}
      key={item.id}>
      <Image
        source={item.image}
        style={{
          height: 200,
        }}
        resizeMode="cover"
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
  cardContainer: {},
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
