import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Text, List} from 'react-native-paper';
import {colors, fonts} from '../../styles/globalStyles';
import Header from '../../components/Header';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={{height: '100%', width: '100%'}}>
        <Header />
        <View style={styles.headerContainer}>
          <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
            Profile
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <List.Item
            title={<Text variant="titleMedium">Edit Profile</Text>}
            left={() => (
              <List.Icon
                icon="account-edit-outline"
                color={colors.primaryRed}
              />
            )}
            onPress={() => {
              navigation.navigate('MyProfile');
            }}
          />
          <List.Item
            title={<Text variant="titleMedium">Change Password</Text>}
            left={() => (
              <List.Icon icon="lock-outline" color={colors.primaryRed} />
            )}
            onPress={() => {
              navigation.navigate('Change Password');
            }}
          />
          <List.Item
            title={<Text variant="titleMedium">Contact Us</Text>}
            left={() => (
              <List.Icon
                icon="comment-processing-outline"
                color={colors.primaryRed}
              />
            )}
            onPress={() => {
              navigation.navigate('Contact Us');
            }}
          />

          <List.Item
            title={<Text variant="titleMedium">About</Text>}
            left={() => (
              <List.Icon icon="information-outline" color={colors.primaryRed} />
            )}
            onPress={() => {
              navigation.navigate('About');
            }}
          />
          <List.Item
            title={<Text variant="titleMedium">Logout</Text>}
            left={() => (
              <List.Icon icon="exit-to-app" color={colors.primaryRed} />
            )}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                }),
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    marginBottom: 15,
  },
  bodyContainer: {
    flex: 0.9,
    paddingLeft: 20,
  },
});
