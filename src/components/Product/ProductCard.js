import * as React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {colors, fonts} from '../../styles/globalStyles';


const ProductCard = ({id, name, price, image, description, navigation}) => (
  <Card
    mode="contained"
    style={{
      marginHorizontal: 10,
      width: '45%',
      backgroundColor: colors.inputBgGray,
      borderWidth: 1,
      borderColor: colors.muted,
    }}>
    <Card.Cover source={image} style={{ width: '100%', height: 150}}/>

    <Card.Content>
      <Text variant="bodyLarge" style={{fontFamily: fonts.latoBold, marginTop: 10}}>
        {name}
      </Text>
      <Text
        variant="bodyLarge"
        style={{color: colors.secondaryRed, fontFamily: fonts.latoBold}}>
       {price} php
      </Text>
    </Card.Content>
    <Card.Actions>
      <Button mode="contained" onPress={() =>
          navigation.navigate('Product', {
            id,
            name,
            price,
            image,
            description,
          })
        }>View</Button>
      {/* <Button>Add to Cart</Button> */}
    </Card.Actions>
  </Card>
);

export default ProductCard;
