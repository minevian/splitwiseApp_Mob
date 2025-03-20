import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateRegisterUsers, verifyOtp } from '../services/ApiRegisterUser';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('registrationData');
        if (storedData) {
          setUserData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleVerifyOtp = async () => {
    try {
      const otpVerification = verifyOtp({
        email:userData.email,
        otp:otp
      })
      if((await otpVerification).success === true){
        const registerUser = updateRegisterUsers({
          userName:userData.userName,
          email:userData.email,
          phoneNumber:userData.phoneNumber,
          password:userData.password,
          confirmPassword:userData.confirmPassword
        })
        if((await registerUser).success === true){

          Alert.alert('Success', 'OTP Verified and Registered Successfully');
          router.push('/(home)/home');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP or Verification Failed');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
       <Image source={require('../../assets/images/splitzApp.png')} style={styles.image} />
      {userData ? (
        <Text style={styles.heading}>
          Dear {userData.userName}, Enter your OTP
        </Text>
      ) : (
        <Text style={styles.heading}>Loading user data...</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} color="#08306b" />
    </View>
  );
};

export default OtpVerificationPage;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000',
  },
});
