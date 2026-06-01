import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    backgroundColor: '#2E7D32',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27,
    marginRight: 10,
  },

  welcomeText: {
    color: 'white',
    fontSize: 13,
  },

  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  signOutButton: {
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  signOutText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
  },

  subtitle: {
    color: 'white',
    marginTop: 5,
    fontSize: 14,
  },

  bannerImage: {
  width: '92%',
  height: 150,
  alignSelf: 'center',
  borderRadius: 15,
  marginTop: 15,
  },

  statsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginHorizontal: 15,
  marginBottom: 10,
  },

  statCard: {
  backgroundColor: 'white',
  width: '45%',
  padding: 15,
  borderRadius: 12,
  alignItems: 'center',
  },

  statNumber: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#2E7D32',
  },

  searchBar: {
    backgroundColor: 'white',
    margin: 15,
    padding: 12,
    borderRadius: 10,
  },

  banner: {
    backgroundColor: '#E8F5E9',
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },

  bannerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#2E7D32',
  },

  bannerText: {
    fontSize: 13,
    color: '#444',
  },

  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  card: {
    backgroundColor: 'white',
    width: '45%',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 8,
    elevation: 2,
  },

  icon: {
    fontSize: 28,
    marginBottom: 8,
  },

  cardText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },

  section: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2E7D32',
  },

  listItem: {
    fontSize: 14,
    paddingVertical: 2,
    color: '#333',
  },

  infoBox: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2E7D32',
  },

  infoText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#444',
  },

});

export default styles;