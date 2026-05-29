import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  card: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },

  cancelText: {
    color: 'blue',
    fontWeight: 'bold',
  },

  signInButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },

  openButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;