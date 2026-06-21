import { router } from 'expo-router';
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

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [medicines, setMedicines] = useState<any[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const medicinesRef = ref(database, 'medicines');
    const unsubscribe = onValue(medicinesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setMedicines(list);
        setFilteredMedicines(list);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredMedicines(medicines);
    } else {
      const filtered = medicines.filter((item: any) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.genericName?.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMedicines(filtered);
    }
  };

  const MedicineItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.medicineItem}
      onPress={() => router.push(`/medicine/${item.id}`)}
    >
      <Text style={styles.medicineName}>{item.name}</Text>
      <Text style={styles.medicineGeneric}>{item.genericName || 'Generic'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for medicines..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={filteredMedicines}
          renderItem={MedicineItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No medicines found</Text>
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
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },
  list: {
    padding: SPACING.md,
  },
  medicineItem: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: 10,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  medicineGeneric: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
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