import {StyleSheet, ScrollView, View} from 'react-native';
import {Text, List} from 'react-native-paper';
import React from 'react';
import {colors, fonts} from '../../styles/globalStyles';

const ContactUsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{height: '100%', width: '100%'}}>
        <View style={styles.bodyContainer}>
          <View style={styles.contentContainer}>
            <List.Section>
              <Text
                variant="bodyLarge"
                style={{fontWeight: 'bold', marginTop: 10}}>
                Get in Touch
              </Text>
              <List.Item
                title="+63 968 880 3991"
                left={() => (
                  <List.Icon icon="phone" color={colors.primaryRed} />
                )}
              />
              <List.Item
                title="info@samj.com"
                left={() => (
                  <List.Icon icon="email" color={colors.primaryRed} />
                )}
              />
              <List.Item
                title="806, Purok 1, San Isidro, Hagonoy, Bulacan, Hagonoy, Philippines"
                left={() => (
                  <List.Icon icon="map-marker" color={colors.primaryRed} />
                )}
              />
              <List.Item
                title="Monday - Sunday (8am - 8pm)"
                left={() => (
                  <List.Icon
                    icon="clock-time-eight"
                    color={colors.primaryRed}
                  />
                )}
              />
              <Text
                variant="bodyLarge"
                style={{fontWeight: 'bold', marginTop: 10}}>
                Socials
              </Text>
              <List.Item
                title="m.me/SAMJKMART/"
                left={() => (
                  <List.Icon
                    icon="facebook-messenger"
                    color={colors.primaryRed}
                  />
                )}
              />
              <List.Item
                title="@samjkoreanminimart"
                left={() => (
                  <List.Icon icon="instagram" color={colors.primaryRed} />
                )}
              />
              <List.Item
                title="samjkmart.com"
                left={() => <List.Icon icon="web" color={colors.primaryRed} />}
              />
            </List.Section>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headlineTitleContainer: {
    width: '90%',
    marginVertical: 20,
  },
  contentContainer: {
    width: '90%',
    marginBottom: 50,
  },
  contentText: {
    fontFamily: fonts.lato,
    textAlign: 'justify',
    lineHeight: 20,
  },
});
