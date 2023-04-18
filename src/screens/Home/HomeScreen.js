import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Korean Mart</Text>
          <TouchableOpacity style={styles.cartButton}>
            <FontAwesome5 name="shopping-cart" size={24} color="#fff" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bannerContainer}>
          {/* <Image
            source={require('../assets/banners/banner1.jpg')}
            style={styles.banner}
          /> */}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.itemCard}>
              {/* <Image
                source={require('../assets/items/item1.jpg')}
                style={styles.itemImage}
              /> */}
              <Text style={styles.itemName}>Product 1</Text>
              <Text style={styles.itemPrice}>$10.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemCard}>
              {/* <Image
                source={require('../assets/items/item2.jpg')}
                style={styles.itemImage}
              /> */}
              <Text style={styles.itemName}>Product 2</Text>
              <Text style={styles.itemPrice}>$15.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemCard}>
              {/* <Image
                source={require('../assets/items/item3.jpg')}
                style={styles.itemImage}
              /> */}
              <Text style={styles.itemName}>Product 3</Text>
              <Text style={styles.itemPrice}>$20.00</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.itemCard}>
              {/* <Image
                source={require('../assets/items/item4.jpg')}
                style={styles.itemImage}
              /> */}
              <Text style={styles.itemName}>Product 4</Text>
              <Text style={styles.itemPrice}>$12.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemCard}>
              {/* <Image
                source={require('../assets/items/item5.jpg')}
                style={styles.itemImage}
              /> */}
              <Text style={styles.itemName}>Product 5</Text>
              <Text style={styles.itemPrice}>$18.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemCard}>
              {/* <Image
                source={require('../assets/items/item6.jpg')}
                style={styles.itemImage}
              /> */}
              <Text style={styles.itemName}>Product 6</Text>
              <Text style={styles.itemPrice}>$25.00</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    color: '#2E32CD',
  },
});

export default HomeScreen;
