import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useContext, useState, useCallback, Alert} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {UserContext} from '../../providers/UserProvider';
import {Text} from 'react-native-paper';
import HomeHeader from '../../components/HomeHeader';
import {API_URL} from '../../api';

import moment from 'moment';
import axios from 'axios';
import {colors, fonts} from '../../styles/globalStyles';

const OrderScreen = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const url = `${API_URL}/get-orders`;

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const formdata = new FormData();
    formdata.append('id', user.id);

    axios.post(url, formdata).then(response => {
      setOrders(response.data);
      setRefreshing(false);
      // console.log(response.data);
    });
  });

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('id', user.id);

    axios.post(url, formdata).then(response => {
      setOrders(response.data);
      // console.log(response.data);
    });
  }, []);

  const payment = item => {
    navigation.push('CartPayment', {
      id: item.id,
      trackingnumber: item.trackingnumber,
      total: item.total,
    });
  };

  
  const handleCancel = async (paymentId) => {

    const formdata = new FormData();
    try {
      formdata.append('id', paymentId);

      const response = await axios.post(
        `${API_URL}/cancel-order`,
        formdata,
      );
      Alert.alert(
        'Order Cancelled!',
        'Your order has been cancelled',
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HomeHeader />

        <View
          style={{
            marginVertical: 30,
            marginHorizontal: 15,
            alignItems: 'center',
          }}>
          <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
            Order History
          </Text>

          {/* BODY - CARD */}
          {orders.length != 0 ? (
            // orders.map((item, index) => {
            orders.map((item, index) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    width: '85%',
                    marginTop: 20,
                  }}
                  key={item.id}>
                  <View
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      backgroundColor: colors.secondaryBlue,
                      borderBottomWidth: 1,
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: fonts.latoBlack,
                      }}>
                      {item.status}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 20,
                      paddingHorizontal: 20,
                      backgroundColor: colors.inputBgGray,
                    }}>
                    <View style={{borderBottomWidth: 1, paddingBottom: 20}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          marginVertical: 12,
                        }}>
                        <Text>Order No.</Text>
                        <Text>{item.trackingnumber}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          marginVertical: 12,
                        }}>
                        <Text>Total</Text>
                        <Text>P{item.total_price}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          marginVertical: 12,
                        }}>
                        <Text>Date Created</Text>
                        <Text>
                          {moment(item.created_at).format('YYYY-MM-DD')}
                        </Text>
                      </View>
                      {/*<View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          marginVertical: 12,
                        }}>
                        <Text></Text>
                        <Text
                          style={{
                            textDecorationLine: 'underline',
                            color: '#3D39FE',
                          }}>
                          View Details
                        </Text>
                        </View>*/}
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      {/* {item.status == 'For Payment' ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#5cb85c',
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            // borderRadius: 8,
                          }}
                          onPress={() => payment(item)}>
                          <Text style={{color: '#fff'}}>Payment</Text>
                        </TouchableOpacity>
                      ) : (
                        <View></View>
                      )} */}
                      {item.status != 'Cancelled' ? (
                        <TouchableOpacity
                          onPress={() => handleCancel(item.id)}
                          style={{
                            backgroundColor: colors.primaryRed,
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            // borderRadius: 8,
                          }}>
                          <Text style={{color: '#fff'}}>Cancel</Text>
                        </TouchableOpacity>
                      ) : (
                        <View></View>
                      )}
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text>No Orders Yet</Text>
            </View>
          )}
          {/* END BODY */}
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
});

export default OrderScreen;
