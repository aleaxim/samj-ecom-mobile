import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import axios from 'axios';
import {API_URL} from '../../api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../../providers/UserProvider';

const ProductScreen = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [shirt, setShirt] = useState([]);
  const [variants, setVariants] = useState([]);
  const [firstColor, setFirstColor] = useState('');

  const [totalPrice, setTotalPrice] = useState(0);

  const [sizePrice, setSizePrice] = useState(0);

  //form

  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [printColor, setPrintColor] = useState('');
  const [quantity, setQuantity] = useState(0);
//   const [notes, setNotes] = useState('');

  const addQuantity = () => {
    setQuantity(quantity + 1);
    setTotalPrice(totalPrice + Number(sizePrice));
  };
  const subQuantity = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
      setTotalPrice(totalPrice - Number(sizePrice));
    }
  };



  const submit = () => {
    // if (quantity == '') {
    //   Alert.alert(
    //     'Error!',
    //     'Please make sure that you have all the necessary customization needed for this item!',
    //   );
    // } else {
      // if (imageName != '') {
      //   let file = {
      //     uri: imageUri,
      //     type: 'multipart/form-data',
      //     name: imageName,
      //   };
      //   const formdata = new FormData();
      //   formdata.append('user_id', user.id);
        // formdata.append('product_id', route.params.id);
        // formdata.append('color', color);
        // formdata.append('size', size);
        // formdata.append('upload_design', file);
        // formdata.append('print_color', printColor);
        // formdata.append('notes', notes);

      //   formdata.append('quantity', quantity);
      //   formdata.append('inPayment', 0);

      //   axios
      //     .post(`${API_URL}/add-to-cart`, formdata)
      //     .then(response => {
      //       console.log(response.data);
      //       navigation.navigate('Home');
      //       Alert.alert(
      //         'Item Added to Cart!',
      //         'The item has been successfully added to your cart!',
      //       );
      //     });
      // } else {
        const formdata = new FormData();
        formdata.append('user_id', user.id);
        // formdata.append('product_id', route.params.id);
        // formdata.append('color', color);
        // formdata.append('size', size);
        // formdata.append('print_color', printColor);
        formdata.append('quantity', quantity);
        // formdata.append('notes', notes);
        formdata.append('inPayment', 0);

        axios
          .post(`${API_URL}/add-to-cart`, formdata)
          .then(response => {
            console.log(response.data);
            navigation.navigate('Home');
            Alert.alert(
              'Product added to Cart!',
              'The product has been successfully added to your cart!',
            );
          });
      // }
    // }
  };

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('id', route.params.id);

    axios
      .post(`${API_URL}/get-product`, formdata)
      .then(response => {
        setShirt(response.data);
        const shirtMap = JSON.parse(response.data[0].price)[0];

        console.log(shirtMap);
        // shirtMap.map((item, index) => {
        //   console.log(item.color);
        // });
        // setVariants(
        //   shirtMap.map((item, index) => {
        //     price: item;
        //   }),
        // );
        setVariants(
          shirtMap.map(
            (item, index) => (
              console.log(item),
              {
                price: item.price,
                // color: item.color,
                // size: item.size,
              }
            ),
          ),
        );
      });
    console.log(route.params.id);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
       
        <View style={styles.headerTitleContainer}>
          <Text style={{fontWeight: 'bold', color: '#fff'}}>PERSONALIZE</Text>
        </View>
        {shirt.map((item, index) => {

          return (

            <View style={{marginTop: 20}}>

              <View style={{alignItems: 'center'}}>
                <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
                  {item.title}
                </Text>
                <View
                  style={{
                    padding: 20,
                    backgroundColor: '#F0EAD6',
                    marginTop: 20,
                  }}>
                  <Image
                    source={require('../../assets/images/products/image_3.png')}
                  />
                  {imageStatus ? (
                    <View
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: imageUri}}
                        style={{
                          height: 100,
                          width: 100,
                        }}
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>

              <View style={{width: '100%', alignItems: 'center'}}>
                <View
                  style={{
                    marginTop: 20,
                    width: '80%',
                  }}>
                 
                  {/* <Text
                    variant="bodyLarge"
                    style={{fontWeight: 'bold', marginTop: 10}}>
                    Size
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    {variants.map((item, index) => {
                      console.log(item);
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            marginRight: 10,
                            marginVertical: 5,
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            backgroundColor: `#fff`,
                            borderWidth: 1,
                            borderRadius: 5,
                          }}
                          onPress={() => {
                            setTotalPrice(quantity * item.price);
                            setSize(item.size);
                            setSizePrice(item.price);
                          }}>
                          <Text>{item.size}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View> */}

              




                  <Text
                    variant="bodyLarge"
                    style={{fontWeight: 'bold', marginTop: 10}}>
                    Quantity
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="minus-box"
                      size={35}
                      style={{marginTop: 4}}
                      onPress={() => subQuantity()}
                    />
                    <TextInput
                      mode="outlined"
                      style={{height: 30}}
                      value={String(quantity)}
                    />
                    <Icon
                      name="plus-box"
                      size={35}
                      style={{marginTop: 4}}
                      onPress={() => addQuantity()}
                    />
                  </View>

               

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                      marginBottom: 10,
                    }}>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text variant="headlineSmall">Price</Text>
                    <Text variant="headlineSmall" style={{fontWeight: 'bold'}}>
                      P{totalPrice}
                    </Text>
                  </View>

                  <Button
                    mode="contained"
                    onPress={() => submit()}
                    style={{marginBottom: 15, backgroundColor: '#2058CF'}}>
                    Add to Cart
                  </Button>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2058CF',
    paddingVertical: 10,
  },
});

export default ProductScreen;
