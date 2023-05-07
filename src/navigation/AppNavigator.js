import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from '../screens/Splash';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import IndexScreen from '../screens/IndexScreen';

// import ProfileScreen from '../screens/Profile/ProfileScreen';
import MyProfileScreen from '../screens/Profile/MyProfileScreen';
import ChangePassScreen from '../screens/Profile/ChangePassScreen';
import AboutScreen from '../screens/Profile/AboutScreen';
import ContactUsScreen from '../screens/Profile/ContactUsScreen';

// import {Ionicons} from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
};

// const HomeStack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Index" component={IndexScreen} />
      {/* <Stack.Screen name="Orders" component={HomeScreen} /> */}
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePassScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{headerShown: true, headerShadowVisible: false}}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Home" component={HomeStack} />
      {/* <Stack.Screen name="App" component={AppTabNavigator} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
