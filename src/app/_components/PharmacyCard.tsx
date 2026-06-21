import { Image, StyleSheet, Text, View } from 'react-native';

interface PharmacyCardProps {
  name: string;
  address?: string;
  phone?: string;
  isOpen24Hours?: boolean;
  openingHours?: string;
  closingHours?: string;
  distance?: string;
  image?: string;
}

export default function PharmacyCard({ 
  name, 
  address, 
  phone, 
  isOpen24Hours, 
  openingHours, 
  closingHours, 
  distance, 
  image 
}: PharmacyCardProps) {
  const imageUrl = image || 'https://cdn-icons-png.flaticon.com/128/3095/3095763.png';
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.distance}>📏 {distance || '0.4'} km away</Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.address}>📍 {address || 'Address not available'}</Text>
        <Text style={styles.hours}>
          🕐 {isOpen24Hours ? 'Open 24 hrs' : `${openingHours || '9:00 AM'} - ${closingHours || '9:00 PM'}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '100%', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  headerInfo: {
    flex: 1, 
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333333',
  },
  distance: {
    fontSize: 13,
    color: '#2E8B57',
    fontWeight: '500',
    marginTop: 2,
  },
  details: {
    marginLeft: 62,
  },
  address: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  hours: {
    fontSize: 14,
    color: '#2E8B57',
    fontWeight: '500',
  },
});