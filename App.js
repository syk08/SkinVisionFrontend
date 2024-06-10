// import React, { useEffect, useState, useRef } from 'react';

// import { createStackNavigator } from '@react-navigation/stack';

// import { NavigationContainer } from '@react-navigation/native';

// import LoginScreen from './pages/LoginScreen';
// import WelcomeScreen from './pages/WelcomeScreen';




// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Start">
//         <Stack.Screen name="Start" component={WelcomeScreen}  />
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React, {useEffect, useState, useRef} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListCustomItemShowcase } from './pages/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components'; 
import CameraIcon from './pages/components/Camera';
import Details from './pages/Details';
import * as ImagePicker from 'expo-image-picker';
import { createStackNavigator } from '@react-navigation/stack';
import DiseaseDetails from './pages/DiseaseDetails';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginScreen from './pages/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View >
      <ListCustomItemShowcase navigation={navigation} />
    </View>
  );
}

function HomeContainer({ navigation, route }) {
  return (
    <Stack.Navigator>
    <Stack.Screen name='Home' component={HomeScreen} initialParams={route.params}/>
    <Stack.Screen name='Detail' component={DiseaseDetails}/>
  </Stack.Navigator>
  )
}

export default function App() {
  const [image, setImage] = useState(null);
  const navigationRef = useRef(null);

  useEffect(() => {
    if (image != null) {
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      fetch('http://192.168.0.161:8000/classify', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          navigationRef.current.navigate('Detail', { disease: data });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [image]);
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer ref={navigationRef}>
        {/* Render WelcomeScreen initially */}
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true, headerTitle: '', }} />
          <Stack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        
      </NavigationContainer>
    </ApplicationProvider>
  );
  //<CameraIcon onPress={setImage} />

  // return (
  //   <ApplicationProvider {...eva} theme={eva.light}>
  //     <NavigationContainer ref={navigationRef}>
  //       <Tab.Navigator
  //         screenOptions={({ route }) => ({
  //           tabBarIcon: ({ focused, color, size }) => {
  //             let iconName;
  //             if (route.name === 'Disease') {
  //               iconName = focused
  //                 ? 'ios-information-circle'
  //                 : 'ios-information-circle-outline';
  //             } else if (route.name === 'Founders') {
  //               iconName = focused ? 'ios-list' : 'ios-list-outline';
  //             }
  //             return <Ionicons name={iconName} size={size} color={color} />;
  //           },
  //           tabBarActiveTintColor: '#337cbd',
  //           tabBarInactiveTintColor: 'gray',
  //         })}
  //       >
  //         <Tab.Screen name='Disease' component={HomeContainer} options={{ headerShown: false }} />
  //         <Tab.Screen name='Founders' component={Details} />
  //       </Tab.Navigator>
  //       <CameraIcon onPress={setImage} />
  //     </NavigationContainer>
  //   </ApplicationProvider>
  // );
}
