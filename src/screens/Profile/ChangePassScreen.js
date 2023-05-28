import axios from 'axios';
import React, {useState, useContext} from 'react';
import {Text, TextInput} from 'react-native-paper';
import {colors, fonts} from '../../styles/globalStyles';
import {UserContext} from '../../providers/UserProvider';
import {API_URL} from '../../api';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const ChangePassScreen = () => {
  const user = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confNewPassword, setConfNewPassword] = useState('');

  const savePassword = () => {
    const url = `${API_URL}/profile-password`;

    if (oldPassword == '' || newPassword == '' || confNewPassword == '') {
      Alert.alert(
        'Error!',
        'Please fill in all the fields to change your password!',
      );
    } else if (newPassword != confNewPassword) {
      Alert.alert(
        'Error!',
        'New password and confirm password does not match !',
      );
    } else {
      const formdata = new FormData();
      formdata.append('id', user.id);
      formdata.append('old_password', oldPassword);
      formdata.append('new_password', newPassword);

      axios
        .post(url, formdata)
        .then(response => {
          console.log(response.data.message);
          if (response.data.message == 'success') {
            Alert.alert('Success!', 'Password has been updated successfully!');
            user.password = newPassword;
          }
        })
        .catch(error => {
          if (error.response.status === 422) {
            console.log(error.response.data.error);
            Alert.alert('Error!', error.response.data.error);
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View style={styles.cardBodyContainer}>
            <View style={styles.inputTextContainer}>
              <View style={{width: '80%'}}>
                <Text>Current Password</Text>
                <TextInput
                  mode="outlined"
                  secureTextEntry={true}
                  onChangeText={value => setOldPassword(value)}
                />
              </View>
            </View>
            <View style={styles.inputTextContainer}>
              <View style={{width: '80%'}}>
                <Text>New Password</Text>
                <TextInput
                  mode="outlined"
                  secureTextEntry={true}
                  onChangeText={value => setNewPassword(value)}
                />
              </View>
            </View>
            <View style={styles.inputTextContainer}>
              <View style={{width: '80%'}}>
                <Text>Confirm New Password</Text>
                <TextInput
                  mode="outlined"
                  secureTextEntry={true}
                  onChangeText={value => setConfNewPassword(value)}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.inputTextContainer}
              onPress={() => savePassword()}>
              <View style={styles.buttonContainer}>
                <Text style={{color: '#fff', fontFamily: fonts.latoBold}}>
                  SAVE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardBodyContainer: {
    paddingVertical: 20,
    marginBottom: 10,
  },
  inputTextContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '80%',
    backgroundColor: colors.primaryRed,
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
});

export default ChangePassScreen;
