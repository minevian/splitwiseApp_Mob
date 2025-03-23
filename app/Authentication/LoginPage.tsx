
import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet, Image, TextInput, Text, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGenerateOtp, loginUser } from '../services/ApiRegisterUser';

const LoginPage = () => {
  const router = useRouter();


  const schema = yup.object().shape({
   
    email:yup.string().required('Enter Mail ID'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
   
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


const onSubmit = async (data: any) => {


  try {
    await AsyncStorage.setItem('registrationData', JSON.stringify(data));

    const loginData = await loginUser({
       email: data.email,
      password:data.password
     });
    

    if (loginData?.success) {
      router.push('/(home)/home');
    } else {
      Alert.alert(loginData.message);
    }

  } catch (error: any) {
    console.error('Error:', error.message);
    if (error.response) {
      Alert.alert('Server responded with:', error.response.data);
    } else if (error.request) {
      Alert.alert('No response received:', error.request);
    } else {
      Alert.alert('Error message:', error.message);
    }

    Alert.alert('Network Error', 'Failed to connect to server. Check your network connection.');
  }
};



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.card}>
        <Image source={require('../../assets/images/splitzApp.png')} style={styles.image} />
        <Text style={styles.text}>Login Form</Text>

      
                <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter  EmailAddress"
                 placeholderTextColor="#888"
                value={value}
                onChangeText={onChange}
              />
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </>
          )}
        />


        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                 placeholderTextColor="#888"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </>
          )}
        />

        <Button title="Login" color='#08306b' onPress={handleSubmit(onSubmit)} />
        <Text style={{ marginVertical: 10 }}>
          Not have an account?
          <Text style={styles.link} onPress={()=>{router.push('/')}}> Click Here to Register</Text>
        </Text>

      </View>
    </ScrollView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginVertical:'auto',
    // marginTop:150
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  link: {
    color: '#08306b',
    textDecorationLine: 'underline',
    cursor:'pointer'
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  countryCode: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  phoneInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: '#000',
  },
});
