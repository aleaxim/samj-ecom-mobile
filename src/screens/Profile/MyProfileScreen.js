import React, {useState, useContext, useCallback} from 'react';
import {Text, TextInput} from 'react-native-paper';
import {colors, fonts} from '../../styles/globalStyles';
import {UserContext} from '../../providers/UserProvider';
import {API_URL} from '../../api';
import axios from 'axios';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';

const MyProfileScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const user = useContext(UserContext);
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);

  const onRefresh = useCallback(() => {
    const url = `${API_URL}/get-profile`;

    setRefreshing(true);
    const formdata = new FormData();
    formdata.append('id', user.id);

    axios.post(url, formdata).then(response => {
      // console.log(response.data.first_name);
      setFname(response.data.first_name);
      setLname(response.data.last_name);
      setPhone(response.data.phone);
      setAddress(response.data.address);
      user.fname = fname;
      user.lname = lname;
      user.phone = phone;
      user.address = address;
      setRefreshing(false);
    });
  });

  const saveProfile = () => {
    const url = `${API_URL}/profile`;

    if ((fname == '', lname == '', phone == '')) {
      Alert.alert('Error!', 'Required fields are not filled!');
    } else {
      const formdata = new FormData();
      formdata.append('id', user.id);
      formdata.append('first_name', fname);
      formdata.append('last_name', lname);
      formdata.append('phone', phone);
      formdata.append('address', address);

      axios
        .post(url, formdata)
        .then(response => {
          console.log(response.data.message);

          Alert.alert('Success!', 'Your profile has been updated successfully');
          user.fname = fname;
          user.lname = lname;
          user.phone = phone;
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
      <ScrollView
        style={{height: '100%', width: '100%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <View style={styles.headerContainer}>
          <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
            Edit Profile
          </Text>
        </View> */}

        <View style={styles.bodyContainer}>
          {/* <View style={styles.headlineTitleContainer}>
            <Text variant="bodyLarge" style={{fontWeight: 'bold'}}>
              EDIT PROFILE
            </Text>
          </View> */}
          <View style={styles.cardBodyContainer}>
            <View style={styles.inputText}>
              <Text>First Name</Text>
              <TextInput
                style={{width: '70%', height: 40}}
                value={fname}
                onChangeText={value => setFname(value)}
                mode="outlined"
              />
            </View>
            <View style={styles.inputText}>
              <Text>Last Name</Text>
              <TextInput
                style={{width: '70%', height: 40}}
                value={lname}
                onChangeText={value => setLname(value)}
                mode="outlined"
              />
            </View>
            <View style={styles.inputText}>
              <Text>Phone</Text>
              <TextInput
                style={{width: '70%', height: 40}}
                value={phone}
                onChangeText={value => setPhone(value)}
                mode="outlined"
              />
            </View>
            <View style={styles.inputText}>
              <Text>Address</Text>
              <TextInput
                style={{width: '70%', height: 40}}
                value={address}
                onChangeText={value => setAddress(value)}
                mode="outlined"
              />
            </View>
            <View style={styles.inputText}>
              <Text>Email</Text>
              <TextInput
                style={{width: '70%', height: 40}}
                value={email}
                mode="outlined"
                disabled
              />
            </View>
            <TouchableOpacity onPress={() => saveProfile()}>
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
  // headerContainer: {
  //   flex: 0.2,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginVertical: 20,
  // },
  bodyContainer: {
    // flex: 0.8,
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  // headlineTitleContainer: {
  //   borderWidth: 1,
  //   backgroundColor: '#cfcfcf',
  //   width: '90%',
  //   paddingHorizontal: 20,
  //   paddingVertical: 12,
  //   marginVertical: 20,
  // },
  cardBodyContainer: {
    // height: '55%',
    width: '90%',
    // borderBottomWidth: 1,
    paddingVertical: 17,
  },
  inputText: {
    flexDirection: 'row',
    // width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 10,
  },
  // buttonContainer: {
  //   width: '80%',
  //   height: 150,
  //   alignItems: 'flex-end',
  //   paddingTop: 40,
  // },

  buttonContainer: {
    backgroundColor: colors.primaryRed,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 20,
    // width: '95%',
  },
});

export default MyProfileScreen;
