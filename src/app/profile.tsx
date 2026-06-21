import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, SPACING } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { auth, database } from '../lib/firebase';

export default function ProfileScreen() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);

  useEffect(() => {
    if (user) {
      const userRef = ref(database, 'users/' + user.uid);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/login');
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>
            {userData?.name?.[0] || user?.email?.[0] || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{userData?.name || 'User'}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <Text style={styles.userPhone}>{userData?.phone || 'No phone number'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#ddd', true: COLORS.primary }}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Location Services</Text>
          <Switch
            value={location}
            onValueChange={setLocation}
            trackColor={{ false: '#ddd', true: COLORS.primary }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  header: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    padding: SPACING.xl,
    paddingTop: SPACING.xxl,
    marginBottom: SPACING.md,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 4,
  },
  userPhone: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  menuItem: {
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.black,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});