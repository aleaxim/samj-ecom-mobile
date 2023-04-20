import React from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';
import {IconButton} from 'react-native-paper';
import {colors} from '../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
      />
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/official_logo_.png')}
          style={styles.headerStyle}
        />
        <View style={styles.cartStyle}>
          <IconButton
            icon="cart-outline"
            size={25}
            iconColor={colors.primaryRed}
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 1,
    padding: 6,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  headerStyle: {
    height: 55,
    width: 100,
  },
  cartStyle: {
    justifyContent: 'center',
  },
});

export default Header;
