import { Tabs } from "expo-router";
import { Appearance } from "react-native";
// import { Colors } from "@/constants/Colors";
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Platform } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
export default function HomeScreenTabLayout(){

    const theme = Appearance.getColorScheme();

    return(
        <Tabs
         screenOptions={{
                // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                  ios: {
                    // Use a transparent background on iOS to show the blur effect
                    position: 'absolute',
                  },
                  default: {},
                }),
              }}
        >
              <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      
        </Tabs>
    )
}