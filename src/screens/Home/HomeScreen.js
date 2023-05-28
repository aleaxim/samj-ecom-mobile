import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {Text} from 'react-native-paper';
import {API_URL, APP_URL} from '../../api';
import HomeHeader from '../../components/HomeHeader';
import ProductCard from '../../components/Product/ProductCard';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/product/get-products`)
      .then(response => {
        setProducts(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const renderItem = ({item}) => (
    <ProductCard
      id={item.id}
      name={item.title}
      price={item.price}
      image={{uri: `${APP_URL}/storage/${item.product_cover}`}}
      description={item.description}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      <HomeHeader />

      <View
        style={{
          marginVertical: 30,
          marginHorizontal: 15,
          alignItems: 'center',
        }}>
        <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
          Our Products
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Image
          source={require('../../assets/images/square_white.png')}
          style={styles.bgImage}
        />
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  bgImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  sectionContainer: {
    flex: 9,
    backgroundColor: '#fff',
  },
  productCard: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default HomeScreen;
