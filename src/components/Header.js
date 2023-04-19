import React from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';
import {Button} from 'react-native-paper';
import {colors} from '../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#CD2E3A"
      />
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/official_logo_.png')}
          style={styles.headerStyle}
        />
        <View style={styles.cartStyle}>
          <Button
            icon="cart"
            mode="text"
            textColor="#fff"
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
    padding: 8,
    backgroundColor: colors.primaryRed,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerStyle: {
    height: 45,
    width: 45,
    paddingVertical: 10,
  },
  cartStyle: {
    justifyContent: 'center',
  },
});

export default Header;
