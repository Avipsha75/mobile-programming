import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image} from 'react-native';
import styles from './DashboardStyles';

export default function DashboardScreen() {

  const [searchText, setSearchText] = useState('');

  const buttonPressed = (message: string) => {
    Alert.alert(message);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>

      <View style={styles.header}>

        <View style={styles.topRow}>
          <View style={styles.profileSection}>
            <Image
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}}
              style={styles.profileImage}/>

            <View>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.userName}>Avi</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={() => buttonPressed('Signed Out')}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>MediFinder</Text>
        <Text style={styles.subtitle}>
          Find medicines and nearby pharmacies
        </Text>
      </View>

      <Image source={{ uri: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800', }} style={styles.bannerImage} />

      <TextInput
        style={styles.searchBar}
        placeholder="Search medicines..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.statCard}> 
      <Text style={styles.statNumber}>30+</Text>
       <Text>Pharmacies</Text> 
      </View> 

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Special Offer 🎉</Text>
        <Text style={styles.bannerText}>
          Get up to 20% discount on selected medicines today!
        </Text>
      </View>

      <View style={styles.cardContainer}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => buttonPressed('Nearby Pharmacies')}>
          <Text style={styles.icon}>📍</Text>
          <Text style={styles.cardText}>Nearby Pharmacies</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => buttonPressed('Check Availability')}>
          <Text style={styles.icon}>💊</Text>
          <Text style={styles.cardText}>Check Availability</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => buttonPressed('Discounts & Offers')} >
          <Text style={styles.icon}>💸</Text>
          <Text style={styles.cardText}>Discounts & Offers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => buttonPressed('Delivery')}>
          <Text style={styles.icon}>🚚</Text>
          <Text style={styles.cardText}>Reserve / Delivery</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        <Text style={styles.listItem}>Paracetamol</Text>
        <Text style={styles.listItem}>Vitamin C</Text>
        <Text style={styles.listItem}>Ibuprofen</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Tip</Text>
        <Text style={styles.infoText}>
          Drink enough water daily and always follow your doctor's prescription.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <Text style={styles.listItem}>🚑 Ambulance: 102</Text>
        <Text style={styles.listItem}>🚓 Police: 100</Text>
        <Text style={styles.listItem}>🚒 Fire Brigade: 101</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>About App</Text>
        <Text style={styles.infoText}>
          MediFinder helps users search medicines, find nearby pharmacies,
          check availability, view discounts, and request delivery services
          through a simple dashboard.
        </Text>
      </View>

    </ScrollView>
  );
}