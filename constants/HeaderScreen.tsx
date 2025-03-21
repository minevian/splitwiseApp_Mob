// import { getUserData } from '@/app/services/ApiRegisterUser';
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';
// const HeaderScreen = () => {
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [userDetail, setUserDetail] = useState<any>(null);
//     const [userData, setUserData] = useState<any>(null);
//      const router = useRouter();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const storedData = await AsyncStorage.getItem('registrationData');
//         if (storedData) {
//           setUserData(JSON.parse(storedData));
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (!userData?.email) {
//         console.error("User email is missing or data is null");
//         return;
//       }
  
//       try {
//         const userDataReq = await getUserData({ email: userData.email });
//   console.log('====================================');
//   console.log(userDataReq);
//   console.log('====================================');
//         if (userDataReq.success) {
//           setUserDetail(userDataReq.data);
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };
  
//     if (userData) {
//       fetchUserDetails();
//     }
//   }, [userData]);  
  
  

//   const userName = userDetail?.userName || 'abcdefgh';

//   const getInitials = (name:string) => {
//     return name ? name.substring(0, 2).toUpperCase() : '';
//   };

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

//   return (
//     <View style={styles.container}>
      
//       <Image source={require('../assets/images/splitzApp.png')} style={styles.image} />

    
//       <TouchableOpacity onPress={toggleMenu} style={styles.circle}>
//         <Text style={styles.initials}>{getInitials(userName)}</Text>
//       </TouchableOpacity>

//       {/* Menu Bar */}
//       <Modal
//         transparent={true}
//         visible={menuVisible}
//         animationType="fade" style={styles.model}
//         onRequestClose={() => setMenuVisible(false)}
//       >
//         <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
//           <View style={styles.overlay}>
//             <View style={styles.menuContainer}>
//               <TouchableOpacity style={styles.menuItem} onPress={() =>
// {                 router.push('/MenuScreens/ProfilePage')
//                  setMenuVisible(false)}}>
//                 <Text style={styles.menuText}>Profile Page</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Log Out')}>
//                 <Text style={styles.menuText}>FAQ</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.menuItem} onPress={() => {router.push('/')  
//                 setMenuVisible(false)}}>
//                 <Text style={styles.menuText}>LogOut</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// };

// export default HeaderScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#08306b',
//     width: '100%',
//     height: 80,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20
//   },
//   image: {
//     width: 50,
//     height: 50,
//   },
//   circle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#007bff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   initials: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold'
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     marginRight: 20,
//     marginBottom: 100,   // Position below the circle
//   },
//   model:{
//     flex:1,
//     position:'relative',
//     bottom:0
//   },
//   menuContainer: {
//     width: 180,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     paddingVertical: 10,
//     position: 'relative',           
//     bottom: '70%',                 
//     right: 10,                      
//     zIndex: 999,

//   },
//   menuItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc'
//   },
  
//   menuText: {
//     fontSize: 16
//   }
// });
import { getUserData } from '@/app/services/ApiRegisterUser';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const HeaderScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [userDetail, setUserDetail] = useState<any>(null);
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
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userData) {
      fetchUserDetails();
    }
  }, [userData]);

  const userName = userDetail?.userName || 'User';
  const profileImage = userDetail?.profileImage;

  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : '';
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/splitzApp.png')} style={styles.image} />

      <TouchableOpacity onPress={toggleMenu} style={styles.circle}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.initials}>{getInitials(userName)}</Text>
        )}
      </TouchableOpacity>

      {/* Menu Bar */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        style={styles.model}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.overlay}>
            <View style={styles.menuContainer}>
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => {
                  router.push('/MenuScreens/ProfilePage');
                  setMenuVisible(false);
                }}
              >
                <Text style={styles.menuText}>Profile Page</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Log Out')}>
                <Text style={styles.menuText}>FAQ</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => {
                  router.push('/');
                  setMenuVisible(false);
                }}
              >
                <Text style={styles.menuText}>LogOut</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default HeaderScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#08306b',
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  image: {
    width: 50,
    height: 50,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'  // Ensures the profile image fits properly within the circle
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25
  },
  initials: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
    marginBottom: 100,
  },
  model: {
    flex: 1,
    position: 'relative',
    bottom: 0
  },
  menuContainer: {
    width: 180,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingVertical: 10,
    position: 'relative',
    bottom: '70%',
    right: 10,
    zIndex: 999,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  menuText: {
    fontSize: 16
  }
});
