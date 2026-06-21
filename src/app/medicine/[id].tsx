import { useLocalSearchParams } from 'expo-router';
import { onValue, push, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { database } from '../../lib/firebase';

export default function MedicineDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [medicine, setMedicine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !id) return;

    const favoritesRef = ref(database, `users/${user.uid}/favorites`);
    const unsubscribe = onValue(favoritesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const favEntry = Object.entries(data).find(
          ([key, value]: [string, any]) => value.medicineId === id
        );
        if (favEntry) {
          setIsFavorite(true);
          setFavoriteId(favEntry[0]);
        } else {
          setIsFavorite(false);
          setFavoriteId(null);
        }
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
      }
    });

    return () => unsubscribe();
  }, [user, id]);

  useEffect(() => {
    const medicineRef = ref(database, `medicines/${id}`);
    const unsubscribe = onValue(medicineRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMedicine({ id, ...data });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  const handleFavorite = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to add favorites');
      return;
    }

    try {
      if (isFavorite && favoriteId) {
        await remove(ref(database, `users/${user.uid}/favorites/${favoriteId}`));
        setIsFavorite(false);
        setFavoriteId(null);
        Alert.alert('Success', 'Removed from favorites ❌');
      } else {
        const favoritesRef = ref(database, `users/${user.uid}/favorites`);
        await push(favoritesRef, {
          medicineId: id,
          addedAt: new Date().toISOString(),
        });
        setIsFavorite(true);
        Alert.alert('Success', 'Added to favorites ❤️');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const handleReserve = () => {
    Alert.alert('Reserve', 'Medicine reserved successfully! ✅');
  };

  const handleDelivery = () => {
    Alert.alert('Delivery', 'Delivery option coming soon! 🚚');
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!medicine) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Medicine not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: medicine.image || 'https://cdn-icons-png.flaticon.com/128/3095/3095763.png' }} 
          style={styles.mainImage}
        />
        <Text style={styles.name}>{medicine.name}</Text>
        <Text style={styles.price}>₹ {medicine.price || '50.00'}</Text>
        <View style={styles.stockContainer}>
          <Text style={styles.stockText}>✅ In Stock</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Medicine</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Generic name:</Text>
          <Text style={styles.infoValue}>{medicine.genericName || 'Not specified'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Description:</Text>
          <Text style={styles.infoValue}>{medicine.description || 'No description'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Dosage:</Text>
          <Text style={styles.infoValue}>{medicine.dosage || 'Consult your doctor'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Category:</Text>
          <Text style={styles.infoValue}>{medicine.category || 'General'}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.reserveButton]} onPress={handleReserve}>
          <Text style={styles.buttonText}>Reserve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deliveryButton]} onPress={handleDelivery}>
          <Text style={styles.buttonText}>Delivery</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? '❤️ Remove from favourites' : '🤍 Add to favourites'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
  errorText: {
    fontSize: 18,
    color: COLORS.error,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  mainImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: 4,
  },
  stockContainer: {
    marginTop: 8,
  },
  stockText: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12,
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    marginTop: SPACING.sm,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  reserveButton: {
    backgroundColor: COLORS.primary,
  },
  deliveryButton: {
    backgroundColor: COLORS.primaryLight,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteButton: {
    backgroundColor: COLORS.white,
    padding: 15,
    marginTop: SPACING.sm,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  favoriteButtonText: {
    fontSize: 16,
    color: COLORS.black,
  },
});