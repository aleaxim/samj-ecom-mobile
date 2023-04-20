import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import HomeScreen from './Home/HomeScreen';
import OrderScreen from './Orders/OrderScreen';
import ProfileScreen from './Profile/ProfileScreen';

const IndexScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'orders',
      title: 'Orders',
      focusedIcon: 'shopping',
      unfocusedIcon: 'shopping-outline',
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account-circle',
      unfocusedIcon: 'account-circle-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    orders: OrderScreen,
    profile: ProfileScreen,
  });

  return (
    <BottomNavigation
      shifting={true}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{backgroundColor: '#fff'}}
      activeColor="#CD2E3A"
      inactiveColor="#181616"
    />
  );
};

export default IndexScreen;
