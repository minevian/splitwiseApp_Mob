import React from 'react';
import { View, StyleSheet } from 'react-native';

import RegisterPage from './Authentication/RegisterPage';

const App = () => {
  return (
    <View style={styles.container}>
      <RegisterPage />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,                // Takes the full available space
    justifyContent: 'center',  // Centers vertically
    alignItems: 'center',     // Centers horizontally
    backgroundColor: '#f0f0f0' // Optional background color
  }
});
