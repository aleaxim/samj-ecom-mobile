import React, {useEffect} from 'react';
import {View, Image, StyleSheet, ImageBackground} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require('../assets/images/rect_blue.png')}>
        <Image
          style={styles.logo}
          source={require('../assets/images/official_logo_circle_red.png')}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'transparent',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default Splash;
