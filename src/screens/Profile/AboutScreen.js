import {StyleSheet, ScrollView, View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import {colors, fonts} from '../../styles/globalStyles';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{height: '100%', width: '100%'}}>
        <View style={styles.bodyContainer}>
          {/* <View style={styles.headlineTitleContainer}>
            <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
              About
            </Text>
          </View> */}
          <View style={styles.contentContainer}>
            <Image
              source={require('../../assets/images/official_logo_.png')}
              style={styles.imageStyle}
            />
            <Text style={styles.contentText}>
              SAM-J Korean Mini Mart is a one-stop K-mart in Hagonoy, Bulacan
              selling Authentic and Quality Korean grocery items
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headlineTitleContainer: {
    width: '90%',
    marginVertical: 20,
  },
  contentContainer: {
    width: '90%',
  },
  contentText: {
    fontFamily: fonts.lato,
    textAlign: 'justify',
    lineHeight: 20,
  },
  imageStyle: {
    width: 330,
    height: 200,
  },
});
