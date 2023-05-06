import React, {useState} from 'react';
import {colors, fonts} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '../../api';
import axios from 'axios';
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


  const handleRegister = () => {
    const url = `${API_URL}/signup`;

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
      formdata.append('first_name', fname);
      formdata.append('last_name', lname);
      formdata.append('email', email);
      formdata.append('phone', phone);
      formdata.append('address', address);
      formdata.append('password', password);

      axios
        .post(url, formdata)
        .then(response => {
          // console.log(response.data.message);

          if (response.data.message == 'success') {
            Alert.alert(
              'Chukahae, chingu!',
              'Your account has been created. Please check your email to verify your account first.');

            navigation.push('Login');
          }
        }).catch (error => {
          if (error.response.status === 422) {
            console.log(error.response.data.error);
            Alert.alert('Error!', error.response.data.error);
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
    marginTop: -30,
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
