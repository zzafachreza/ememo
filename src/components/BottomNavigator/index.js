import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../utils/colors';

export default function BottomNavigator({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home';
        let labeNew = '';

        if (label === 'Home') {
          iconName = 'home-outline';
          labeNew = 'Dashboard';
        } else if (label === 'Account') {
          labeNew = 'Profile';
          iconName = 'person-outline';
        } else if (label === 'Ifaq') {
          iconName = 'wallet-outline';
          labeNew = 'Infak / Sedekah';
        } else if (label === 'Wa') {
          iconName = 'logo-whatsapp';
          labeNew = 'Chat WA';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View
              style={{
                color: isFocused ? colors.primary : '#919095',
                backgroundColor: isFocused ? 'white' : '#FFFFFF',
                paddingTop: 5,
                paddingBottom: 0,
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <View
                style={{
                  position: iconName === 'cart' ? 'absolute' : 'relative',
                  backgroundColor:
                    iconName === 'cart' ? colors.secondary : 'white',
                  // borderTopWidth: iconName === 'cart' && isFocused ? 5 : 0,
                  borderWidth: 3,
                  // borderColor: 'red',
                  // padding: 10,
                  // position: 'absolute',
                  position: iconName === 'cart' ? 'absolute' : 'relative',
                  borderColor: iconName === 'cart' ? 'white' : 'white',
                  borderRadius: iconName === 'cart' ? 50 : 0,
                  width: iconName === 'cart' ? 90 : 80,
                  marginBottom: iconName === 'cart' ? 0 : 0,
                  bottom: iconName === 'cart' ? -45 : 0,
                  height: iconName === 'cart' ? 90 : 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {iconName === 'cart' ? (
                  <Icon
                    name={iconName}
                    type="ionicon"
                    color={isFocused ? colors.primary : 'white'}
                  />
                ) : (
                  <Icon
                    name={iconName}
                    type="ionicon"
                    size={windowWidth / 20}
                    color={isFocused ? colors.primary : '#919095'}
                  />
                )}
                <Text
                  style={{
                    fontSize: windowWidth / 45,
                    color:
                      isFocused && iconName == 'cart'
                        ? 'cart'
                        : !isFocused && iconName == 'cart'
                        ? 'white'
                        : isFocused
                        ? colors.primary
                        : '#919095',
                  }}>
                  {/* {label} */}
                  {labeNew}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: iconName => ({
    // paddingTop: 5,
    // paddingBottom: 5,
    // fontSize: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  }),
  box: iconName => ({}),
});
