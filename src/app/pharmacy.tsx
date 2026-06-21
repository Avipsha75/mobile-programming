import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, SPACING } from '../constants/colors';
import { database } from '../lib/firebase';
import PharmacyCard from './_components/PharmacyCard';

export default function PharmacyScreen() {
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPharmacies, setFilteredPharmacies] = useState<any[]>([]);

  useEffect(() => {
    const pharmaciesRef = ref(database, 'pharmacies');
    const unsubscribe = onValue(pharmaciesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setPharmacies(list);
        setFilteredPharmacies(list);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredPharmacies(pharmacies);
    } else {
      const filtered = pharmacies.filter((item: any) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.address?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPharmacies(filtered);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search pharmacies..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Current Location */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>📍 Current Location</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationButtonText}>Find Nearby</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={filteredPharmacies}
          renderItem={({ item, index }) => (
            <PharmacyCard 
              {...item} 
              distance={(0.4 + (index * 0.3)).toFixed(1)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No pharmacies found</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  searchButtonText: {
    fontSize: 20,
  },
  locationContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  locationButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  locationButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    padding: SPACING.md,
  },
  loader: {
    marginTop: 50,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 50,
  },
});