import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useContext, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {UserContext} from '../../providers/UserProvider';
import {Text} from 'react-native-paper';
import Header from '../../components/Header';
import moment from 'moment';
import axios from 'axios';

const OrderScreen = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const formdata = new FormData();
    formdata.append('id', user.id);
    axios
      .post('http://10.0.2.2:8000/api/getallorders', formdata)
      .then(response => {
        setOrders(response.data);
        setRefreshing(false);
      });
  });

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('id', user.id);
    axios
      .post('http://10.0.2.2:8000/api/getallorders', formdata)
      .then(response => {
        setOrders(response.data);
      });
  }, []);

  const payment = item => {
    navigation.push('CartPayment', {
      id: item.id,
      trackingnumber: item.trackingnumber,
      total: item.total,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Header />
        <View
          style={{
            marginVertical: 30,
            marginHorizontal: 15,
            alignItems: 'center',
          }}>
          <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
            ORDER HISTORY
          </Text>

          {/* BODY */}
          {/* CARD */}
          {orders.length != 0 ? (
            orders.map((item, index) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    width: '80%',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      backgroundColor: '#DDDDDD',
                      borderBottomWidth: 1,
                    }}>
                    <Text>{item.status}</Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 30,
                      paddingHorizontal: 20,
                      backgroundColor: '#F3F0F0',
                    }}>
                    <View style={{borderBottomWidth: 1}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          marginVertical: 12,
                        }}>
                        <Text>Order #</Text>
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
                        justifyContent: 'space-between',
                      }}>
                      {item.status == 'For Payment' ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#5cb85c',
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            borderRadius: 8,
                          }}
                          onPress={() => payment(item)}>
                          <Text style={{color: '#fff'}}>Payment</Text>
                        </TouchableOpacity>
                      ) : (
                        <View></View>
                      )}
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#F56161',
                          paddingHorizontal: 20,
                          paddingVertical: 5,
                          borderRadius: 8,
                        }}>
                        <Text style={{color: '#fff'}}>Cancel</Text>
                      </TouchableOpacity>
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
