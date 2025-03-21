import { View, Text, Image, TouchableOpacity, TextInput, Modal, Button, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../services/ApiRegisterUser';
import { handleProfileImage } from '../services/ApiUserServices';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
const ProfilePage = () => {
  const [userDetail, setUserDetail] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  // Fetch user details
  const fetchUserDetails = async () => {
    if (!userData?.email) {
      console.error("User email is missing or data is null");
      return;
    }

    try {
      const userDataReq = await getUserData({ email: userData.email });
      if (userDataReq.success) {
        setUserDetail(userDataReq.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserDetails();
    }
  }, [userData]);


  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      uploadImage(result.assets[0].uri);
      setModalVisible(false);
    } else {
      console.log("Camera operation was canceled.");
    }
  };


  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Gallery access is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      uploadImage(result.assets[0].uri);
      setModalVisible(false);
    } else {
      console.log("Gallery operation was canceled.");
    }
  };
  const uploadImage = async (uri: string) => {
    try {
      const formData = new FormData();

      // Convert the image URI to a Blob
      const response = await fetch(uri);
      const blob = await response.blob();

      formData.append('image', blob, 'profile.jpg');
      formData.append('email', userDetail.email);

      const updateProfileImage = await handleProfileImage(formData);

      if (updateProfileImage.success === true) {
        Alert.alert('Profile Picture Updated Successfully');
        await fetchUserDetails();
      } else {
        Alert.alert('Something Went wrong', updateProfileImage.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  const handleRemovePhoto = () => {
    setUserDetail({ ...userDetail, profileImage: '' });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Link href="/home">
        <Ionicons name="arrow-back" size={24} color="black" />
      </Link>

      <Text style={styles.text}>Your Profile Details</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.imageContainer}>
          {userDetail?.profileImage ? (
            <Image source={{ uri: userDetail?.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.initials}>{userDetail?.userName?.slice(0, 2).toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.cameraIcon}>
            <EvilIcons name="camera" size={30} style={styles.cameraText} color="black" />
          </View>
        </View>
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.dialogBox}>
                <View style={styles.popUpContainerText}>

                  <Text style={styles.dialogTitle}>Choose an option</Text>
                  {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
                  <EvilIcons onPress={() => setModalVisible(false)} name="close-o" size={30} color="red" />
                </View>
                <View style={styles.dialogOptions}>
                  <EvilIcons style={{ bottom: 10 }} name="camera" size={50} color="black" onPress={openCamera} />
                  <FontAwesome name="photo" size={35} color="black" onPress={openGallery} />
                  <MaterialIcons name="delete" size={35} color="red" onPress={handleRemovePhoto} />
                </View>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.userContainer}>
        <Text style={styles.userText} >User Details</Text>
        <TouchableOpacity onPress={isEditing ? handleSave : handleEdit} style={styles.button}>
          {isEditing ? (
            <FontAwesome name="save" size={24} color="black" />
          ) : (
            <AntDesign name="edit" size={24} color="black" />
          )}
        </TouchableOpacity>


      </View>

      <View style={styles.inputDIv}>

        <Text style={styles.label}>Name:</Text>
        {isEditing ? (
          <TextInput
            value={userDetail?.userName || ''}
            onChangeText={(text) => setUserDetail({ ...userDetail, userName: text })}
            style={styles.input}
          />
        ) : (
          <Text>{userDetail?.userName}</Text>
        )}
      </View>

      <View style={styles.inputDIv}>
        <Text style={styles.label}>Email:</Text>
        <Text>{userDetail?.email}</Text>
      </View>

      <View style={styles.inputDIv}>


        <Text style={styles.label}>Phone:</Text>
        {isEditing ? (
          <TextInput
            value={userDetail?.phoneNumber || ''}
            onChangeText={(text) => setUserDetail({ ...userDetail, phoneNumber: text })}
            style={styles.input}
          />
        ) : (
          <Text>{userDetail?.phoneNumber}</Text>
        )}
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  text: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center'
  },
  profileImage: { width: 150, height: 150, borderRadius: 75 },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  initials: { fontSize: 50, color: '#fff' },
  cameraIcon: {
    position: 'absolute',
    bottom: 10,
    right: 70,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cameraText: {
    color: 'black',
    fontSize: 30,
  },


  modalContent: {
    marginTop: 100,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: { borderBottomWidth: 1, padding: 5, marginBottom: 10 },
  button: { padding: 10, marginTop: 20, borderRadius: 5 },
  buttonText: { color: '#000', textAlign: 'center' },
  userContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: "#D704B2",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10
  },
  userText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    textAlign: 'center',
    paddingTop: 13
  },
  inputDIv: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dialogOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  popUpContainerText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  }
});

export default ProfilePage;
