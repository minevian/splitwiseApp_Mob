import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet, Alert, FlatList, ScrollView, Modal, Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommonScreen from '../../constants/commonScreen';
import HeaderScreen from '@/constants/HeaderScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getUserData } from '../services/ApiRegisterUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAllGroups, fetchGroupsById, handleCreateNewGroup } from '../services/ApiUserServices';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useRouter } from 'expo-router';
import { setParams } from 'expo-router/build/global-state/routing';


const Home = () => {
  const router = useRouter();
  const [groupExists, setGroupExists] = useState(false);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [groupDetails, setGroupDetails] = useState<any>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([{ userName: '', email: '', amountPaid: 0, owes: 0, gets: 0 }]);

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

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userData?.email) {
        console.error("User email is missing or data is null");
        return;
      }

      try {
        const userDataReq = await getUserData({ email: userData.email });
        if (userDataReq.success) {
          setUserDetail(userDataReq.data);

          // Fetch groups only after user details are successfully fetched
          if (userDataReq.data?.userId) {
            try {
              const getAllCreatedGroup = await fetchAllGroups(userDataReq.data.userId);

              if (getAllCreatedGroup.success) {
                setGroupExists(true);
                setGroupDetails(getAllCreatedGroup.groups);
                console.log('GroupDetails', getAllCreatedGroup.groups)
              } else {
                setGroupExists(false);
              }
            } catch (error) {
              console.error('Something went wrong', error);
              Alert.alert('Something Went Wrong');
            }
          } else {
            setGroupExists(false);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userData) {
      fetchUserDetails();
    }
  }, [userData]);


  const handleSaveGroup = async () => {
    const membersWithHiddenFields = members.map(member => ({
      ...member,
      amountPaid: 0,
      owes: 0,
      gets: 0
    }));
    const newGroupReuest = {
      groupName: groupName,
      createdBy: userDetail?.userId,
      members: membersWithHiddenFields,
    };
    console.log('Group Created:', newGroupReuest);

    const handleNewGroups = await handleCreateNewGroup(newGroupReuest);
    console.log('handleNewGroups', handleNewGroups)
    if (handleNewGroups.success === true) {
      setGroupDetails(handleNewGroups.group)
      Alert.alert('Group Created Successfully');
      handleCloseModal();
      const getAllCreatedGroup = await fetchAllGroups(userDetail?.userId);

      if (getAllCreatedGroup.success) {

        setGroupDetails(getAllCreatedGroup.groups);
        console.log('Updated Group Details:', getAllCreatedGroup.groups);
      } else {
        Alert.alert('Try Refresh To Get a Group')
      }

    } else {
      Alert.alert('Failed To Create a Group!!');
      handleCloseModal();
    }

  };
  const handleAddMember = () => {
    setMembers([...members, { userName: '', email: '', amountPaid: 0, owes: 0, gets: 0 }]);
  };
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  // Close Popup
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setGroupName('');
    setMembers([{ userName: '', email: '', amountPaid: 0, owes: 0, gets: 0 }]);
  };
const handleGroupChat = async (groupId:string)=>{
  const groupByIdRes = await fetchGroupsById(groupId);
  if(groupByIdRes.success === true){
    const groupData = groupByIdRes.group;
    console.log('groupData',groupData)

    // Convert all values to string and handle undefined cases
    const params = new URLSearchParams({
      groupId: groupData?._id?.toString() || '',          // Ensure string values
      groupName: groupData?.groupName?.toString() || '',
      createdBy: groupData?.createdBy?.toString() || '',
      createdAt: groupData?.createdAt?.toString() || ''
    }).toString();
    
    // Navigate with params
    router.push(`/Screens/GroupChatScreen?${params}`);


  }

}

  const renderGroupItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={styles.groupRow} onPress={()=>{handleGroupChat(item._id)}}>
        <View style={styles.iconContainer}>
          <FontAwesome name="group" size={30} color="black" />
        </View>
        <Text style={styles.groupName}>{item.groupName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />

      <View style={styles.container}>
        <Text style={styles.text}>Click Here to Start the Group</Text>

        <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
          <AntDesign name="addusergroup" size={24} />
        </TouchableOpacity>
      </View>

      {groupExists ?
        (
          <ScrollView>
            <FlatList
              data={groupDetails}
              keyExtractor={(item) => item._id}
              renderItem={renderGroupItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              
            />

          </ScrollView>
        )
        : (
          <View>
            <CommonScreen />
          </View>
        )
      }
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.textCloseContainer}>

              <Text style={styles.modalTitle}>Create New Group</Text>
              <EvilIcons onPress={handleCloseModal} name="close-o" size={30} color="red" />
            </View>

            {/* Group Name */}
            <TextInput
              style={styles.input}
              placeholder="Group Name"
              value={groupName}
              onChangeText={setGroupName}
            />

            {/* Members */}
            <ScrollView>
              {members.map((member, index) => (
                <View key={index} >
                  <TextInput
                    style={styles.input}
                    placeholder="Member Name"
                    value={member.userName}
                    onChangeText={(text) => {
                      const newMembers = [...members];
                      newMembers[index].userName = text;
                      setMembers(newMembers);
                    }}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={member.email}
                    onChangeText={(text) => {
                      const newMembers = [...members];
                      newMembers[index].email = text;
                      setMembers(newMembers);
                    }}
                  />
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity onPress={handleAddMember}>
              <Text style={styles.addMemberText}>+ Add Member</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              {/* <Button title="Cancel" onPress={handleCloseModal} color="red" /> */}
              <TouchableOpacity onPress={handleSaveGroup} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: "space-around"
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5
  },
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 5,
    borderColor: '#000',
    justifyContent: "flex-start",
    gap: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",  // Add a background color to make the shadow visible
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',

    // Border and elevation styles
    borderColor: "#000",
    borderWidth: 2,
    elevation: 5,  // For Android shadow
    shadowColor: "#000",  // For iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addMemberText: {
    color: '#007BFF',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
  },

  saveButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#08306b',
    justifyContent: 'center',
    alignContent: 'center'
  },
  textCloseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },

});