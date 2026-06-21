import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MedicineCardProps {
  name: string;
  genericName?: string;
  image?: string;
  onPress: () => void;
}

export default function MedicineCard({ 
  name, 
  genericName, 
  image, 
  onPress 
}: MedicineCardProps) {
  const imageUrl = image || 'https://cdn-icons-png.flaticon.com/128/3095/3095763.png';
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.generic} numberOfLines={1}>{genericName || 'Generic'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  generic: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
    textAlign: 'center',
  },
});