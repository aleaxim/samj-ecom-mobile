import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {colors, fonts} from '../../styles/globalStyles';
import {UserContext} from '../../providers/UserProvider';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '../../api';

const ProductScreen = ({route}) => {
  const user = useContext(UserContext);
  const navigation = useNavigation();

  const {id, name, price, description, image} = route.params;

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    console.log(`Added ${quantity} ${name} to cart!`);

    try {
      const formdata = new FormData();
      formdata.append('user_id', user.id);
      formdata.append('product_id', route.params.id);
      formdata.append('quantity', quantity);

      const response = await axios
        .post(`${API_URL}/product/add-to-cart`, formdata)
        .then(response => {
          console.log(response.data);

          Alert.alert(
            `Added ${quantity} ${name} to cart!`,
            'The product has been successfully added to your cart!',
          );
          navigation.push('Home');
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = (quantity * price).toFixed(2);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={image} />
        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>₱{price}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.quantity}>
            <TouchableOpacity onPress={handleDecrementQuantity}>
              <Text style={styles.quantityButton}>–</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrementQuantity}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.totalPrice}>Total Price: ₱{totalPrice}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
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
  image: {
    height: 300,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.darkBg,
  },
  price: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily: fonts.latoBold,
    color: colors.primaryRed,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.lato,
    marginTop: 10,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 10,
    // paddingVertical: 5,
    backgroundColor: colors.lightgray,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 20,
    paddingHorizontal: 15,
  },
  addToCartButton: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#fff',
    fontFamily: fonts.latoBold,
  },
});

export default ProductScreen;
