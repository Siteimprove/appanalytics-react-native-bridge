import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useTrackScreen from '../siteimprove-analytics/useTrackScreen';
import { useNavigation } from '@react-navigation/native';
import AnalyticsModule from '../siteimprove-analytics/AnalyticsModule';

function HomeScreen() {
  useTrackScreen(HomeScreen, 'Home');

  const navigation = useNavigation();

  const navigateToSearch = () => navigation.navigate("Search");
  const trackCustom = () => AnalyticsModule.trackCustom(
    'cart.refresh',
    {
      guest: 'true',
      currency: 'USD',
      'cart.item_count': '10',
      'cart.value': '249.99'
    });

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to Search Screen" onPress={navigateToSearch} />
      <TouchableOpacity style={styles.fab} onPress={trackCustom}>
        <View style={styles.bubble}>
          <Image source={require('../../images/icons8-cart-96.png')} style={styles.shoppingCartImage} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16
  },
  bubble: {
    width: 48,
    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoppingCartImage: {
    width: 32,
    height: 32
  }
});

export default HomeScreen;
