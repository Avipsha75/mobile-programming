import { router } from 'expo-router';
import { onValue, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { database } from '../lib/firebase';

const COLORS = {
  primary: '#2E8B57',
  lightGray: '#f5f5f5',
  white: '#ffffff',
  black: '#333333',
  gray: '#666666',
};

export default function FavoritesScreen() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all medicines
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
      }
    });
    return () => unsubscribe();
  }, []);

  // Load user's favorites
  useEffect(() => {
    if (!user) return;

    const favoritesRef = ref(database, `users/${user.uid}/favorites`);
    const unsubscribe = onValue(favoritesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          medicineId: data[key].medicineId,
          addedAt: data[key].addedAt,
        }));
        setFavorites(list);
      } else {
        setFavorites([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Get full medicine details for each favorite
  const getFavoriteMedicines = () => {
    return favorites
      .map(fav => {
        const medicine = medicines.find(m => m.id === fav.medicineId);
        return medicine ? { ...medicine, favoriteId: fav.id } : null;
      })
      .filter(item => item !== null);
  };

  const handleRemoveFavorite = (favoriteId: string, medicineName: string) => {
    Alert.alert(
      'Remove Favorite',
      `Remove ${medicineName} from favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await remove(ref(database, `users/${user?.uid}/favorites/${favoriteId}`));
              Alert.alert('Success', 'Removed from favorites ❌');
            } catch (error) {
              Alert.alert('Error', 'Failed to remove from favorites');
            }
          }
        }
      ]
    );
  };

  const FavoriteItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push(`/medicine/${item.id}`)}
    >
      <Image 
        source={{ uri: item.image || 'https://cdn-icons-png.flaticon.com/128/3095/3095763.png' }} 
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.generic}>{item.genericName || 'Generic'}</Text>
        <Text style={styles.price}>₹ {item.price || '50.00'}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item.favoriteId, item.name)}
      >
        <Text style={styles.removeButtonText}>❤️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const favoriteMedicines = getFavoriteMedicines();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favoriteMedicines.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>❤️</Text>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Start adding medicines to your favorites by tapping the heart icon!
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.push('/search')}
          >
            <Text style={styles.browseButtonText}>Browse Medicines</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favoriteMedicines}
          renderItem={({ item }) => <FavoriteItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.gray,
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  generic: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 2,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: COLORS.white,
  },
  emptyEmoji: {
    fontSize: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  browseButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});