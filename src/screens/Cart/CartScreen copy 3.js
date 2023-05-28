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

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios
          .get(`${API_URL}/cart/get-cart-items/${user.id}`)
          .then(response => {
            // Use reduce to group items with the same ID and sum up their quantities
            const groupedItems = response.data.data.reduce((acc, item) => {
              const existingItem = acc.find(
                i => i.product_id === item.product_id,
              );
              if (existingItem) {
                existingItem.quantity =
                  Number(existingItem.quantity) + Number(item.quantity);
                // console.log(existingItem.quantity);
              } else {
                acc.push(item);
              }
              return acc;
            }, []);
            setCartData(groupedItems);
            // console.log(response.data.data);
          });
        // setCartData(response.data.data);
      } catch (error) {
        console.error(error);
        // Handle the error, such as showing an error message to the user
      }
    };

    fetchCartData();
  }, []);

  const renderCartItem = ({item}) => {
    return (
      <View style={styles.cartItemContainer}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.cartItemPrice}>Price: {item.price}</Text>
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
      />
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
