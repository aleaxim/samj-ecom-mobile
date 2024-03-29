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
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.secondaryBlue}
      />
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/text_white_logo.png')}
          style={styles.headerStyle}
        />
        <View style={styles.cartStyle}>
          <IconButton
            icon="cart-outline"
            size={25}
            iconColor="#fff"
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
    backgroundColor: colors.secondaryBlue,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerStyle: {
    height: 24,
    width: 58,
  },
  cartStyle: {
    justifyContent: 'center',
  },
});

export default Header;
