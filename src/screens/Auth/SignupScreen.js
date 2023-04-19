import React, {useState, useContext} from 'react';
import {colors, fonts} from '../../styles/globalStyles';

import {useNavigation, CommonActions} from '@react-navigation/native';
import {UserContext} from '../../providers/UserProvider';
import axios from 'axios';
import {API_URL} from '../../api';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

const SignupScreen = () => {
  const navigation = useNavigation();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const user = useContext(UserContext);

  const handleRegister = () => {
    const url = `${API_URL}/register`;

    if (
      fname == '' ||
      lname == '' ||
      address == '' ||
      email == '' ||
      phone == '' ||
      password == ''
    ) {
      Alert.alert('Error!', 'Please fill in all the fields!');
    } else {
      const formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);

      axios
        .post(url, formdata, {
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          //   Accept: 'application/json',
          // },
        })
        .then(response => {
          // console.log(response.data);
          console.log(response.data.message);

          if (response.data.message != 'success') {
            Alert.alert(
              'Invalid Credentials!',
              'Your email or password is incorrect',
            );
            // console.log(response.data.message);
            // console.log(formdata);
          } else if (response.data.data.email_verified_at == null) {
            Alert.alert(
              'Email Unverified!',
              'Please verify your email before logging in',
            );
          } else {
            // console.log(response.data.data.first_name);
            // console.log(response.data.data.last_name);
            // console.log(response.data.data.email);
            // console.log(response.data.data.phone);
            // console.log(response.data.data.address);
            // console.log(response.data.data.password);

            // user.id = response.data.data.id;
            // user.fname = response.data.data.first_name;
            // user.lname = response.data.data.last_name;
            // user.email = response.data.data.email;
            // user.phone = response.data.data.phone;
            // user.address = response.data.data.address;

            // user.password = response.data.data.password;
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'HomeStack'}],
              }),
            );
          }
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/official_logo_.png')}
          style={styles.logo}
        />
        <Text style={styles.heading}>CREATE AN ACCOUNT</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={text => setFname(text)}
            value={fname}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={text => setLname(text)}
            value={lname}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            onChangeText={text => setAddress(text)}
            value={address}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={text => setPhone(text)}
            value={phone}
            maxLength={11}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            onChangeText={text => setEmail(text)}
            value={email}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity> */}
        <View style={styles.signUpContainer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push('Login');
            }}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 340,
    height: 340,
    resizeMode: 'contain',
    marginTop: -20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -110,
    marginBottom: 40,
    color: '#3F3D56',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.inputBgGray,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.outlinegray,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primaryBlue,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // forgotPasswordText: {
  //   color: '#3F3D56',
  //   textDecorationLine: 'underline',
  //   marginBottom: 10,
  // },
  signUpContainer: {
    flexDirection: 'row',
    marginBottom: 100,
  },
  signupText: {
    color: colors.primaryRed,
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
