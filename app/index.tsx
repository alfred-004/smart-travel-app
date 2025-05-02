import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // <--- ADD this

const GEOAPIFY_API_KEY = '5de7da98359b485b84ab97f8c3c67d36'; // <--- PUT YOUR KEY HERE

export default function App() {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('tourism.sights');

  const categoryOptions = [
    { label: 'Tourist Sights', value: 'tourism.sights' },
    { label: 'Malls', value: 'commercial.shopping_mall' },
    { label: 'Supermarkets', value: 'commercial.supermarket' },
    { label: 'Restaurants', value: 'catering.restaurant' },
    { label: 'Hotels', value: 'accommodation.hotel' },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      // FETCH with default selectedCategory
      fetchPlaces(currentLocation.coords.latitude, currentLocation.coords.longitude, selectedCategory);
    })();
  }, []);

  // 🔥 Pass category as argument
  const fetchPlaces = async (lat, lon, category) => {
    const delta = 0.01;
    const lon_min = lon - delta;
    const lon_max = lon + delta;
    const lat_min = lat - delta;
    const lat_max = lat + delta;

    try {
      const response = await axios.get('https://api.geoapify.com/v2/places', {
        params: {
          categories: category, // use the passed category
          filter: `rect:${lon_min},${lat_min},${lon_max},${lat_max}`, // also fixed min/max order
          limit: 20,
          apiKey: GEOAPIFY_API_KEY,
        },
      });
      setPlaces(response.data.features || []);
    } catch (error) {
      console.error('Geoapify API Error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPlace = ({ item }) => {
    const { name, address_line1, address_line2 } = item.properties;
    return (
      <View style={styles.placeItem}>
        <Text style={styles.placeName}>{name || 'No name available'}</Text>
        <Text style={styles.placeAddress}>{address_line1 || ''}</Text>
        <Text style={styles.placeAddress}>{address_line2 || ''}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🌍 Smart Travel Suggestions</Text>

      {/* Category Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            setLoading(true);
            if (location) {
              fetchPlaces(location.latitude, location.longitude, itemValue); // 🔥 use itemValue
            }
          }}
        >
          {categoryOptions.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007aff" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.properties.place_id}
          renderItem={renderPlace}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  placeItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeAddress: {
    fontSize: 14,
    color: '#666',
  },
});
