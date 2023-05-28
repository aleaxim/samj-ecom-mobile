import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {colors, fonts} from '../../styles/globalStyles';
import {IconButton} from 'react-native-paper';
import {UserContext} from '../../providers/UserProvider';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '../../api';

const CartScreen = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();

  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/cart/get-cart-items/${user.id}`,
        );
        const cartItemsData = response.data.data;
        const cartItemsMap = new Map();
        let total = 0;

        cartItemsData.forEach(item => {
          if (cartItemsMap.has(item.product_id)) {
            const existingItem = cartItemsMap.get(item.product_id);
            existingItem.quantity += parseInt(item.quantity, 10);
          } else {
            const newItem = {...item};
            newItem.quantity = parseInt(newItem.quantity, 10);
            cartItemsMap.set(newItem.product_id, newItem);
          }
        });

        const newCartItems = Array.from(cartItemsMap.values());
        setCartData(newCartItems);
        console.log('line break ako');

        console.log(cartData);

        newCartItems.forEach(item => {
          total += item.quantity * item.price;
        });
        setTotalPrice(total);

        // shipping fee hard-coded
        if (total > 0) {
          setShippingFee(100);
        }

        // .then(response => {
        //   const groupedItems = response.data.data.reduce((acc, item) => {
        //     const existingItem = acc.find(
        //       i => i.product_id === item.product_id,
        //     );
        //     if (existingItem) {
        //       existingItem.quantity =
        //         Number(existingItem.quantity) + Number(item.quantity);
        //     } else {
        //       acc.push(item);
        //     }
        //     return acc;
        //   }, []);
        //   setCartData(groupedItems);
        // });

        // setCartData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartData();
  }, []);

  const handleIncrement = async itemIndex => {
    const newCartItems = [...cartData];
    const selectedItem = newCartItems[itemIndex];
    // console.log(selectedItem.quantity);
    selectedItem.quantity++;
    setCartData(newCartItems);
    setTotalPrice(totalPrice + selectedItem.price);

    const formdata = new FormData();
    try {
      formdata.append('id', selectedItem.id);
      formdata.append('quantity', selectedItem.quantity);

      const response = await axios.post(
        `${API_URL}/cart/update-quantity`,
        formdata,
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleIncrement = item => {
  //   // console.log(cartData);

  //   const index = cartData.findIndex(
  //     cartItem => cartItem.product_id === item.product_id,
  //   );
  //   const newCartItems = [...cartData];
  //   newCartItems[index].quantity += 1;
  //   setCartData(newCartItems);
  // };

  const handleDecrement = async itemIndex => {
    const newCartItems = [...cartData];
    const selectedItem = newCartItems[itemIndex];
    if (selectedItem.quantity > 1) {
      selectedItem.quantity--;
      setCartData(newCartItems);
      setTotalPrice(totalPrice - selectedItem.price);

      const formdata = new FormData();
      // console.log(newCartItems.quantity);

      try {
        formdata.append('id', selectedItem.id);
        formdata.append('product_id', selectedItem.product_id);
        formdata.append('quantity', selectedItem.quantity);
        const response = await axios.post(
          `${API_URL}/cart/update-quantity`,
          formdata,
        );
        console.log(response.data.message);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const handleRemove = item => {
  //   const index = cartData.findIndex(cartItem => cartItem.id === item.id);
  //   const newCartItems = [...cartData];
  //   newCartItems.splice(index, 1);
  //   setCartData(newCartItems);
  // };

  const handleRemove = itemIndex => {
    const newCartItems = [...cartData];
    const selectedItem = newCartItems[itemIndex];
    const itemPrice = selectedItem.price * selectedItem.quantity;
    newCartItems.splice(itemIndex, 1);
    setCartData(newCartItems);
    setTotalPrice(totalPrice - itemPrice);
  };

  const checkOut = () => {
    const formdata = new FormData();

    let productId = [];

    formdata.append('user_id', user.id);
    formdata.append('total_price', totalPrice + shippingFee);
    // formdata.append(
    //   'trackingnumber',
    //   '2023' + String(Math.floor(Math.random() * 99999) + 10000),
    // );
    //  formdata.append('status', 'For Review');

    cartData.map((item, index) => {
      productId.push(item.product_id);
    });

    formdata.append('product_id', JSON.stringify(productId));
    console.log(productId);

    axios.post(`${API_URL}/cart/checkout`, formdata).then(response => {
      console.log(response.data);
      Alert.alert(
        'Order Placed Successfully!',
        'Kamsahamnida! You can now review your order in your Order History',
      );
      navigation.push('Home');
    });
    // }
  };

  const renderCartItem = ({item, index}) => {
    return (
      <View style={styles.cartItemContainer}>
        <View style={styles.cartItemLeft}>
          <Text style={styles.cartItemTitle}>{item.title}</Text>
          {/* <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text> */}
          <Text style={styles.cartItemPrice}>₱{item.price}</Text>
        </View>
        <View style={styles.cartItemRight}>
          <TouchableOpacity
            style={styles.cartItemButton}
            onPress={() => handleDecrement(index)}>
            <Text style={styles.cartItemButtonText}>–</Text>
          </TouchableOpacity>
          <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.cartItemButton}
            onPress={() => handleIncrement(index)}>
            <Text style={styles.cartItemButtonText}>+</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.cartItemButton}
            onPress={() => handleRemove(index)}>
            <Text style={styles.cartItemButtonText}>Remove</Text>
          </TouchableOpacity> */}

          <IconButton
            icon="trash-can-outline"
            size={20}
            iconColor={colors.primaryRed}
            onPress={() => handleRemove(index)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartData}
        keyExtractor={item => item.product_id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>Your cart is empty.</Text>
        )}
      />
      <View style={styles.subBottomContainer}>
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalText}>Subtotal:</Text>
          <Text style={styles.subtotalPrice}>₱{totalPrice}</Text>
        </View>
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalText}>Shipping:</Text>
          <Text style={styles.subtotalPrice}>₱{shippingFee}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>₱{totalPrice + shippingFee}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => checkOut()}>
          <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily: fonts.latoBold,
    color: colors.darkBg,
    marginBottom: 20,
  },
  cartList: {
    // flexGrow: 1,
    justifyContent: 'center',
    // padding: 16,
    // paddingLeft: 16,
    backgroundColor: colors.inputBgGray,
  },
  cartItemContainer: {
    // marginBottom: 20,
    // padding: 10,
    // borderRadius: 10,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 16,
    paddingBottom: 14,
    paddingTop: 14,
    paddingLeft: 16,
    borderBottomWidth: 0.5,
    borderColor: colors.muted,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkgray,
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 15,
    // color: '#888',
    color: colors.primaryRed,
  },
  emptyListText: {
    padding: 10,
  },
  cartItemLeft: {
    flexDirection: 'column',
  },
  cartItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemQuantity: {
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: fonts.latoBold,
    marginHorizontal: 8,
    // color: colors.darkgray,
    color: '#888',
  },
  cartItemButton: {
    backgroundColor: colors.primaryBlue,
    // paddingHorizontal: 2,
    width: 25,
    alignItems: 'center',
    borderRadius: 4,
    // borderColor: colors.darkgray,
    // borderWidth: 1,
  },
  cartItemButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  bottomContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryRed,
  },
  subBottomContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subtotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtotalText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  subtotalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    // color: colors.primaryRed,
  },
  checkoutButton: {
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: colors.primaryBlue,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CartScreen;
