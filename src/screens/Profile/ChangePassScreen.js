import axios from 'axios';
import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import Header from '../../components/Header';
import {colors, fonts} from '../../styles/globalStyles';
import {UserContext} from '../../../providers/UserProvider';

const ChangePassScreen = () => {
  const user = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confNewPassword, setConfNewPassword] = useState('');

  const savePassword = () => {
    if (oldPassword == '' || newPassword == '' || confNewPassword == '') {
      Alert.alert(
        'Error!',
        'Please fill in ther required fields to edit your password!',
      );
    } else if (newPassword != confNewPassword) {
      Alert.alert('Error!', 'Password mismatch!');
    } else {
      const formdata = new FormData();
      formdata.append('id', user.id);
      formdata.append('old_password', oldPassword);
      formdata.append('new_password', newPassword);

      axios
        .post('http://10.0.2.2:8000/api/changepassword', formdata)
        .then(response => {
          if (response.data == 'success') {
            Alert.alert('Success!', 'Password has been updated successfully!');
            user.password = newPassword;
          } else {
            Alert.alert(
              'Error!',
              'Old password does not match current Password!',
            );
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {/*<Header />
         <View style={styles.headerContainer}>
          <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
            CHANGE PASSWORD
          </Text>
        </View> */}
        <View style={styles.bodyContainer}>
          <View style={styles.headlineTitleContainer}>
            <Text variant="bodyLarge" style={{fontWeight: 'bold'}}>
              CHANGE PASSWORD
            </Text>
          </View>
          <View style={styles.cardBodyContainer}>
            <View style={styles.inputTextContainer}>
              <View style={{width: '80%'}}>
                <Text>Old Password</Text>
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
                <Text>Re-enter New Password</Text>
                <TextInput
                  mode="outlined"
                  secureTextEntry={true}
                  onChangeText={value => setConfNewPassword(value)}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.inputTextContainer}
            // style={{
            //   backgroundColor: '#2058CF',
            //   paddingHorizontal: 35,
            //   paddingVertical: 8,
            //   borderRadius: 10,
            // }}
            onPress={() => savePassword()}>
            <View style={styles.buttonContainer}>
              <Text style={{color: '#fff', fontFamily: fonts.workSans}}>
                SAVE
              </Text>
            </View>
          </TouchableOpacity>
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
  // headerContainer: {
  //   flex: 0.2,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginVertical: 20,
  // },
  bodyContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headlineTitleContainer: {
    borderWidth: 1,
    backgroundColor: '#cfcfcf',
    width: '90%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 20,
  },
  cardBodyContainer: {
    height: '60%',
    width: '90%',
    borderBottomWidth: 1,
    paddingVertical: 20,
    marginBottom: 10,
  },
  inputTextContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    // width: '80%',
    // height: 75,
    // alignItems: 'flex-end',
    width: '90%',
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
    marginBottom: 50,
    borderRadius: 5,
  },
});

export default ChangePassScreen;
