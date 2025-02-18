import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import useTrackScreen from '../siteimprove-analytics/useTrackScreen';
import AnalyticsModule from '../siteimprove-analytics/AnalyticsModule';

const fruits = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape',
  'Honeydew', 'Jackfruit', 'Kiwi', 'Lemon', 'Mango', 'Nectarine',
  'Orange', 'Papaya', 'Quince', 'Raspberry', 'Strawberry', 'Tangerine', 'Watermelon'
];

const SearchScreen = () => {
  useTrackScreen(SearchScreen, 'Search');

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFruits, setFilteredFruits] = useState(fruits);

  const handleSearch = () => {
    const filtered = fruits.filter(fruit =>
      fruit.toLowerCase().includes(searchQuery.toLowerCase())
    );
    AnalyticsModule.trackSearch(searchQuery, filtered.length > 0, filtered.length)
    setFilteredFruits(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a fruit..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {filteredFruits.length > 0 ? (
        <FlatList
          data={filteredFruits}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.nothingFoundText}>Nothing found</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  nothingFoundText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});

export default SearchScreen;
