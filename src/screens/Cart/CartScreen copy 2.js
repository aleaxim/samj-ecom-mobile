import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {UserContext} from '../../providers/UserProvider';
import {colors} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '../../api';

let data = [];

const CartScreen = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();

  const [quantity1, setQuantity1] = useState(1);
  const [quantity2, setQuantity2] = useState(1);
  const [price1, setPrice1] = useState(200);
  const [price2, setPrice2] = useState(200);
  const [totalPrice, setTotalPrice] = useState(0);

  //   const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [addQuantity, setAddQuantity] = useState([]);

  const [itemRemoved, setItemRemoved] = useState(false);

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('id', user.id);
    let itemPrice = 0;
    axios.post(`${API_URL}/cart/get-cart-items`, formdata).then(response => {
      const itemCart = response.data;
      // console.log(response.data)
      itemCart.map((item, index) => {
        const priceArray = JSON.parse(item.price)[0];
        priceArray.map((priceItem, index) => {
          let currentPrice = 0;
          if (priceItem.size === item.size) {
            currentPrice = Number(priceItem.price) * Number(item.quantity);
            itemPrice = itemPrice + currentPrice;
          }
        });
      });
      setTotalPrice(totalPrice + Number(itemPrice));
      setCartItems(response.data);
      let prices = []; // chosen price array
      setAddQuantity(
        itemCart.map(
          (cart, index) => (
            // console.log(index),
            JSON.parse(cart.price)[0].map(priceItem => {
              if (priceItem.size == cart.size) {
                prices.push(priceItem.price);
              }
            }),
            // JSON.parse(cart.price)[0].map(priceItem => {
            //   if (priceItem.size == cart.size) {
            //     priceItem.price;
            //   }
            // }),
            // console.log(cart.id),
            {
              id: cart.id,
              quantity: cart.quantity,
              price: prices[index],
              product_id: cart.product_id,
            }
          ),
        ),
      );
    });
  }, [itemRemoved]);

  const handleAddQuantity = e => {
    console.log(addQuantity[e].quantity);
    const formdata = new FormData();
    const newAddQuantity = [...addQuantity]; //PUT INTO NEW ARRAY
    newAddQuantity[e].quantity = Number(newAddQuantity[e].quantity) + 1;
    setAddQuantity(newAddQuantity); //STATE UPDATER
    setTotalPrice(totalPrice + 300);
    // console.log(newAddQuantity);
    formdata.append('id', newAddQuantity[e].id);
    formdata.append('quantity', addQuantity[e].quantity);
    axios.post(`${API_URL}/cart/update-quantity`, formdata).then(response => {
      console.log(response.data);
    });
  };

  const handleSubtractQuantity = e => {
    const newMinusQuantity = [...addQuantity];
    newMinusQuantity[e].quantity = Number(newMinusQuantity[e].quantity) - 1;
    const formdata = new FormData();
    setAddQuantity(newMinusQuantity);
    setTotalPrice(totalPrice - 300);
    formdata.append('id', newMinusQuantity[e].id);
    formdata.append('quantity', addQuantity[e].quantity);
    axios.post(`${API_URL}/cart/update-quantity`, formdata).then(response => {
      console.log(response.data);
    });
  };

  const checkOut = () => {
    const formdata = new FormData();
    // if (!date) {
    //   Alert.alert('Error!', 'Add a deadline.');
    // } else {
    let productId = [];
    formdata.append('user_id', user.id);
    // formdata.append('deadline', date);
    formdata.append('total_price', totalPrice);
    formdata.append(
      'trackingnumber',
      '2022' + String(Math.floor(Math.random() * 99999) + 10000),
    );
    formdata.append('status', 'For Review');
    addQuantity.map((item, index) => {
      productId.push(item.id);
    });
    formdata.append('product_id', JSON.stringify(productId));

    axios.post(`${API_URL}/cart/checkout`, formdata).then(response => {
      console.log(response.data);
      Alert.alert(
        'ORDER PLACED SUCCESS!!',
        'Your order has been submitted and is under review!',
      );
      navigation.push('Home');
    });
    // }
  };

  const removeToCart = id => {
    const formdata = new FormData();
    formdata.append('id', id);
    axios
      .post(`${API_URL}/cart/removetocart`, formdata)
      .then(response => {
        console.log(response.data);
        Alert.alert(
          'Item Removed!',
          'The selected item has been removed from your cart!',
        );
        setItemRemoved(true);
        setItemRemoved(false);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
            SHOPPING CART
          </Text>
        </View>

        {/* BODY ITEMS */}
        {/* ITEM 1 */}
        {cartItems.length !== 0 && addQuantity.length !== 0 ? (
          cartItems.map((item, index) => {
            const priceArray = JSON.parse(item.price)[0];
            let itemPrice = 0;
            let totalItemPrice = 0;
            let itemQuantity = 0;
            let totalItemQuantity = 0;
            itemQuantity = item.quantity;
            priceArray.map((priceItem, index) => {
              if (priceItem.size === item.size) {
                itemPrice = priceItem.price;
                totalItemPrice = priceItem.price * Number(item.quantity);
              }
            });
            return (
              <View
                key={index}
                style={{
                  marginHorizontal: 15,
                  paddingVertical: 20,
                  marginVertical: 10,
                  backgroundColor: colors.inputBgGray
                }}>
                <View style={styles.cardRowContainer}>
                  <Image
                    source={require('../../assets/images/products/image_1.png')}
                    style={{height: 100, width: 100}}
                  />
                  <View style={{alignItems: 'center'}}>
                    <View style={{marginBottom: 15}}>
                      <Text style={{fontWeight: 'bold'}}>Product</Text>
                      <Text>Canvas Unisex Jersey T-Shirt</Text>
                    </View>
                    {/* <View>
                      <Text style={{color: '#5e5e5e'}}>Color: White</Text>
                      <Text style={{color: '#5e5e5e'}}>Size: {item.size}</Text>
                    </View> */}
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <View style={{marginBottom: 15}}>
                      <Text style={{fontWeight: 'bold'}}>Price</Text>
                      <Text>
                        P
                        {String(
                          Number(addQuantity[index].quantity) *
                            Number(addQuantity[index].price),
                        )}
                        .00
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={{marginVertical: 15}}>
                    <Text style={{fontWeight: 'bold'}}>Quantity</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: -50,
                    }}>
                    <Icon
                      name="minus-box"
                      size={35}
                      style={{marginTop: 4}}
                      onPress={() => handleSubtractQuantity(index)}
                    />
                    {/* <Text>{itemQuantity}</Text> */}
                    <TextInput
                      mode="outlined"
                      style={{height: 30}}
                      value={String(addQuantity[index].quantity)}
                    />
                    <Icon
                      name="plus-box"
                      size={35}
                      style={{marginTop: 4}}
                      onPress={() => {
                        handleAddQuantity(index);
                      }}
                    />
                  </View>
                  <View style={{marginVertical: 15, flexDirection: 'row'}}>
                    <Icon
                      name="trash-can-outline"
                      size={20}
                      color="#5e5e5e"
                      onPress={() => removeToCart(item.id)}
                    />
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={{alignItems: 'center'}}>
            <Text>Your Cart is Empty</Text>
          </View>
        )}

        {/* END BODY */}

        {/* HORIZONTAL LINE */}
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <View style={{borderBottomWidth: 1, marginVertical: 20, width: '80%'}} />
        </View>
        {/* END HORIZONTAL LINE */}
        {/* ORDER SUMMARY */}


        {/* <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#2058CF',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
            }}
            onPress={() => setOpen(true)}>
            <Text style={{color: '#fff'}}>Choose Date...</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            minimumDate={moment().add(3, 'days')}
            open={open}
            date={new Date(moment().add(3, 'days'))}
            onConfirm={date => {
              setOpen(false);
              setDate(moment(date).format('YYYY-MM-DD'));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View> */}

        <View
          style={{
            backgroundColor: colors.lightgray,
            paddingTop: 20,
            paddingBottom: 10,
            marginVertical: 10,
            marginHorizontal: 25,
            borderRadius: 5,
          }}>

          <Text
            variant="titleMedium"
            style={{textAlign: 'center', fontWeight: 'bold'}}>
            Order Summary
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            <Text>Subtotal:</Text>
            <Text>P{String(totalPrice)}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            <Text>Shipping Fee:</Text>
            <Text>P100</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            <Text>Total:</Text>
            <Text>P{String(totalPrice+100)}</Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              marginHorizontal: 10,
              marginVertical: 20,
            }}>
            <Button
              mode="contained"
              onPress={() => checkOut()}
              // buttonColor="#2058CF"
              // textColor="#fff"
              >
              Check Out
            </Button>
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
  headerContainer: {
    marginVertical: 15,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  cardRowContainer: {flexDirection: 'row', justifyContent: 'space-around'},
});

export default CartScreen;
