import { router } from 'expo-router';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { database } from '../lib/firebase';
import MedicineCard from './_components/MedicineCard';
import PharmacyCard from './_components/PharmacyCard';

const COLORS = {
  primary: '#2E8B57',
  lightGray: '#f5f5f5',
  white: '#ffffff',
  black: '#333333',
  gray: '#666666',
};

export default function DashboardScreen() {
  const { user } = useAuth();
  const [medicines, setMedicines] = useState<any[]>([]);
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const medicinesRef = ref(database, 'medicines');
    const unsubscribe = onValue(medicinesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMedicines(list);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const pharmaciesRef = ref(database, 'pharmacies');
    const unsubscribe = onValue(pharmaciesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPharmacies(list);
      }
    });
    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    const medicinesRef = ref(database, 'medicines');
    onValue(medicinesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMedicines(list);
      }
      setLoading(false);
      setRefreshing(false);
    });
  };

  const QuickAction = ({ icon, title, onPress }: any) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <Text style={styles.quickIcon}>{icon}</Text>
      <Text style={styles.quickTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name || 'User'} 👋</Text>
            <Text style={styles.subGreeting}>Welcome to MediFinder</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.[0] || 'U'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <QuickAction
            icon="💊"
            title="Search"
            onPress={() => router.push('/search')}
          />
          <QuickAction
            icon="📍"
            title="Pharmacy"
            onPress={() => router.push('/pharmacy')}
          />
          <QuickAction
            icon="❤️"
            title="Favorites"
            onPress={() => router.push('/favorites')}
          />
          <QuickAction
            icon="⚙️"
            title="Profile"
            onPress={() => router.push('/profile')}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{medicines.length}+</Text>
            <Text style={styles.statLabel}>Medicines</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{pharmacies.length}+</Text>
            <Text style={styles.statLabel}>Pharmacies</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Popular Medicines */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Medicines</Text>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : medicines.length === 0 ? (
            <Text style={styles.emptyText}>No medicines found</Text>
          ) : (
            <FlatList
              data={medicines.slice(0, 5)}
              renderItem={({ item }: any) => (
                <MedicineCard
                  name={item.name}
                  genericName={item.genericName}
                  image={item.image}
                  onPress={() => router.push(`/medicine/${item.id}`)}
                />
              )}
              keyExtractor={(item: any) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          )}
        </View>

        {/* Nearby Pharmacies */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Pharmacies</Text>
            <TouchableOpacity onPress={() => router.push('/pharmacy')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : pharmacies.length === 0 ? (
            <Text style={styles.emptyText}>No pharmacies found</Text>
          ) : (
            <FlatList
              data={pharmacies.slice(0, 3)}
              renderItem={({ item, index }: any) => (
                <PharmacyCard
                  name={item.name}
                  address={item.address}
                  phone={item.phone}
                  isOpen24Hours={item.isOpen24Hours}
                  openingHours={item.openingHours}
                  closingHours={item.closingHours}
                  image={item.image}
                  distance={(0.4 + index * 0.3).toFixed(1)}
                />
              )}
              keyExtractor={(item: any) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          )}
        </View>

        {/* Special Offers */}
        <View style={styles.offerContainer}>
          <Text style={styles.offerTitle}>🎉 Special Offer</Text>
          <Text style={styles.offerText}>
            Get up to 20% discount on medicine today!
          </Text>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <Text style={styles.listItem}>🚑 Ambulance: 102</Text>
          <Text style={styles.listItem}>👮 Police: 100</Text>
          <Text style={styles.listItem}>🔥 Fire: 101</Text>
        </View>

        {/* About App */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>About App</Text>
          <Text style={styles.infoText}>
            MediFinder helps users search medicines, find nearby pharmacies,
            check availability, and get delivery services.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 12,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  subGreeting: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E8B57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickIcon: {
    fontSize: 28,
  },
  quickTitle: {
    fontSize: 12,
    marginTop: 4,
    color: '#333333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    marginTop: 10,
    padding: 16,
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  seeAll: {
    fontSize: 14,
    color: '#2E8B57',
    fontWeight: '600',
  },
  horizontalList: {
    paddingRight: 10,
  },
  offerContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#2E8B57',
    borderRadius: 12,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  offerText: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
  },
  listItem: {
    fontSize: 14,
    color: '#666666',
    paddingVertical: 4,
  },
  infoBox: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    padding: 20,
  },
});