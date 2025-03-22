import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router';

const GroupChatScreen = () => {

    const router = useRouter();
    const params = useLocalSearchParams();
  
    // Log the entire params object
    console.log("🚀 Params:", params);
  return (
    <View>
      <Link href='/(home)/home'>Back</Link>
      <View >

      </View>
    </View>
  )
}

export default GroupChatScreen
