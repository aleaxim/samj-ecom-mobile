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
import {colors, fonts} from '../../styles/globalStyles';
import Header from '../../components/Header';
// import {UserContext} from '../../../providers/UserProvider';

const MyProfileScreen = () => {
  // const user = useContext(UserContext);
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const saveProfile = () => {
    if ((fname == '', lname == '', phone == '')) {
      Alert.alert('Error!', 'Required fields are not filled!');
    } else {
      const formdata = new FormData();
      formdata.append('id', user.id);
      formdata.append('first_name', fname);
      formdata.append('last_name', lname);
      formdata.append('phone', phone);

      axios
        .post('http://10.0.2.2:8000/api/editprofile', formdata)
        .then(response => {
          Alert.alert('Success!', 'Your profile has been updated successfully');
          user.fname = fname;
          user.lname = lname;
          user.phone = phone;
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{height: '100%', width: '100%'}}>
        {/* <Header /> */}
        {/* <View style={styles.headerContainer}>
          <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
            PROFILE
          </Text>
        </View> */}
        <View style={styles.bodyContainer}>
          <View style={styles.headlineTitleContainer}>
            <Text variant="bodyLarge" style={{fontWeight: 'bold'}}>
              EDIT PROFILE
            </Text>
          </View>
          <View style={styles.cardBodyContainer}>
            <View style={styles.inputText}>
              <Text>First Name</Text>
              <TextInput
                style={{width: '70%', height: 30}}
                value={fname}
                onChangeText={value => setFname(value)}
                mode="outlined"
              />
            </View>
            <View style={styles.inputText}>
              <Text>Last Name</Text>
              <TextInput
                style={{width: '70%', height: 30}}
                value={lname}
                onChangeText={value => setLname(value)}
                mode="outlined"
              />
            </View>
            <View style={styles.inputText}>
              <Text>Phone</Text>
              <TextInput
                style={{width: '70%', height: 30}}
                value={phone}
                onChangeText={value => setPhone(value)}
                mode="outlined"
              />
            </View>
            <View style={styles.inputText}>
              <Text>Email</Text>
              <TextInput
                style={{width: '70%', height: 30}}
                value={email}
                mode="outlined"
                disabled
              />
            </View>
          </View>
          <TouchableOpacity
            style={{width: '90%'}}
            // style={{
            //   backgroundColor: '#2058CF',
            //   paddingHorizontal: 35,
            //   paddingVertical: 8,
            //   borderRadius: 10,
            // }}
            onPress={() => saveProfile()}>
            <View style={styles.buttonContainer}>
              <Text style={{color: '#fff'}}>SAVE</Text>
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
  headerContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
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
    height: '55%',
    width: '90%',
    borderBottomWidth: 1,
    paddingVertical: 17,
  },
  inputText: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 3,
    marginLeft: 15,
  },
  // buttonContainer: {
  //   width: '80%',
  //   height: 150,
  //   alignItems: 'flex-end',
  //   paddingTop: 30,
  // },
  buttonContainer: {
    backgroundColor: colors.primaryRed,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 30,
    marginBottom: 50,
    borderRadius: 5,
  },
});

export default MyProfileScreen;
