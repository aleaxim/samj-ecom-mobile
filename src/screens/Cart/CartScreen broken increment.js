import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import {colors, fonts} from '../../styles/globalStyles';
import {UserContext} from '../../providers/UserProvider';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '../../api';

const CartScreen = () => {
  const user = useContext(UserContext);

  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/cart/get-cart-items/${user.id}`,
        );
        const cartItemsData = response.data.data;
        const cartItemsMap = new Map();
        let total = 0;

        cartData.forEach(item => {
          if (cartItemsMap.has(item.id)) {
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

        newCartItems.forEach(item => {
          total += item.quantity * item.price;
        });
        setTotalPrice(total);

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

  const handleIncrement = itemIndex => {
    const newCartItems = [...cartData];
    const selectedItem = newCartItems[itemIndex];
    selectedItem.quantity++;
    setCartData(newCartItems);
    setTotalPrice(totalPrice + selectedItem.price);
  };

  const handleDecrement = itemIndex => {
    const newCartItems = [...cartData];
    const selectedItem = newCartItems[itemIndex];
    if (selectedItem.quantity > 1) {
      selectedItem.quantity--;
      setCartData(newCartItems);
      setTotalPrice(totalPrice - selectedItem.price);
    }
  };

  const handleRemove = item => {
    const index = cartData.findIndex(cartItem => cartItem.id === item.id);
    const newCartItems = [...cartData];
    newCartItems.splice(index, 1);
    setCartData(newCartItems);
  };

  const renderCartItem = ({item}) => {
    return (
      <View style={styles.cartItemContainer}>
        <View style={styles.cartItemLeft}>
          <Text style={styles.cartItemTitle}>{item.title}</Text>
          {/* <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text> */}
          <Text style={styles.cartItemPrice}>Price: {item.price}</Text>
        </View>
        <View style={styles.cartItemRight}>
          <TouchableOpacity
            style={styles.cartItemButton}
            onPress={() => handleDecrement(index)}>
            <Text style={styles.cartItemButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.cartItemButton}
            onPress={() => handleIncrement(index)}>
            <Text style={styles.cartItemButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <FlatList
        data={cartData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>Your cart is empty.</Text>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  cartItemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cartItemQuantity: {
    fontSize: 16,
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 16,
  },
});

export default CartScreen;
