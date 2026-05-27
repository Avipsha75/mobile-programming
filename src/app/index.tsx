import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const App = () => {

  const [color, setColor] = useState('red');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <View
        style={{
          width: 250,
          height: 150,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>
          My Card
        </Text>
      </View>

      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: 'black',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => {
          if (color === 'red') {
            setColor('blue');
          } else {
            setColor('red');
          }
        }}
      >
        <Text style={{ color: 'white' }}>
          Change Color
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default App;