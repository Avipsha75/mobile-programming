import React, { useState } from 'react';
import {View, Text, Modal, TextInput, Pressable, Alert} from 'react-native';
import { styles } from './csssignin';

const App = () => {
  const [visible, setVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    Alert.alert('Signed In Successfully');
    setSuccessVisible(true);
  };

  return (
    <View style={styles.box}>
      <Pressable
        style={styles.openButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.buttonText}>Open Sign In</Text>
      </Pressable>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.card}>
            <Text style={styles.heading}>Sign In</Text>

            <TextInput
              placeholder="Username"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                disabled={!username || !password}
                onPress={handleSignIn}
                style={({ pressed }) => [
                  styles.signInButton,
                  {
                    opacity:
                      !username || !password
                        ? 0.4
                        : pressed
                        ? 0.7
                        : 1,
                  },
                ]}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.card}>
            <Text style={styles.heading}>
              Hi, {username}
            </Text>

            <Text>Signed In Successfully!</Text>

            <Pressable
              style={styles.signInButton}
              onPress={() => {
                setSuccessVisible(false);
                setVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;