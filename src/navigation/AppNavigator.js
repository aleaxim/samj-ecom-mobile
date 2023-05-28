import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import IndexScreen from '../screens/IndexScreen';

import MyProfileScreen from '../screens/Profile/MyProfileScreen';
import ChangePassScreen from '../screens/Profile/ChangePassScreen';
import AboutScreen from '../screens/Profile/AboutScreen';
import ContactUsScreen from '../screens/Profile/ContactUsScreen';

import CartScreen from '../screens/Cart/CartScreen';
import ProductScreen from '../screens/Product/ProductScreen';

const Stack = createNativeStackNavigator();

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


const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Index" component={IndexScreen} />
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
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{headerShown: true, headerTransparent: true, headerTitle: ''}}
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
