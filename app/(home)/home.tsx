import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'
import CommonScreen from '../../constants/commonScreen'
import HeaderScreen from '@/constants/HeaderScreen'
import AntDesign from '@expo/vector-icons/AntDesign';

const Home = () => {

  const clickButton = () => {
    Alert.alert('Button Pressed', 'You clicked the group button!');
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />

      <View style={styles.container}>
        <Text style={styles.text}>Click Here to Start the Group</Text>
        
        <TouchableOpacity style={styles.button} onPress={clickButton}>
          <AntDesign name="addusergroup" size={24}  />
        
        </TouchableOpacity>
      </View>

      <CommonScreen />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    display:'flex',
    gap:30,
    flexDirection:'row',
    marginLeft:20
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight:'bold',
    display:'flex'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 16,
    display:'flex'
  }
})
