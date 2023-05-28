import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, Button} from 'react-native-paper';
import {API_URL, APP_URL} from '../../api';
import HomeHeader from '../../components/HomeHeader';
import ProductCard from '../../components/Product/ProductCard';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

// const product = [
//   {
//     id: 1,
//     name: 'Product 1',
//     price: 'P75',
//     image: 'https://example.com/product1.jpg',
//   },
//   {
//     id: 2,
//     name: 'Product 2',
//     price: 'P75',
//     image: 'https://example.com/product2.jpg',
//   },
//   {
//     id: 3,
//     name: 'Product 3',
//     price: 'P75',
//     image: 'https://example.com/product3.jpg',
//   },
//   {
//     id: 4,
//     name: 'Product 4',
//     price: 'P75',
//     image: 'https://example.com/product4.jpg',
//   },
//   {
//     id: 5,
//     name: 'Product 5',
//     price: 'P75',
//     image: 'https://example.com/product5.jpg',
//   },
//   {
//     id: 6,
//     name: 'Product 6',
//     price: 'P75',
//     image: 'https://example.com/product6.jpg',
//   },
// ];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/product/get-products`)
      .then(response => {
        // .then(response => response.json())
        // .then(data => {
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
        {/* <Button
          onPress={() => {
            navigation.navigate('Product');
          }}></Button> */}
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
    // margin: 8,
    marginHorizontal: 10,
    marginVertical: 10,
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   paddingHorizontal: 10,
  //   paddingVertical: 20,
  // },
  // image: {
  //   flex: 1,
  //   resizeMode: 'cover',
  //   justifyContent: 'center',
  // },
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 24,
  // },
  // title: {
  //   fontSize: 32,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginTop: 50,
  //   marginBottom: 20,
  //   color: '#2E32CD',
  // },
});

export default HomeScreen;
