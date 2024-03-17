import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Signup from '../screens/ScreenOne/Signup';
import Notification from '../screens/ScreenTwo/Notification';
import ImageUpload from '../screens/ScreenThree/ImageUpload';
import TextUpload from '../screens/ScreenFour/TextUpload';
import Calculator from '../screens/ScreenFive/Calculator';
import {createStackNavigator} from '@react-navigation/stack';
import {User, onAuthStateChanged} from '@firebase/auth';
import {FIREBASE_AUTH} from '../utils/firebase';
const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      setUser(() => {
        return user;
      });
    });
  }, []);
  return (
    <NavigationContainer>
      {true ? (
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Image upload" component={ImageUpload} />
          <Tab.Screen name="Text Upload" component={TextUpload} />
          <Tab.Screen name="Notification" component={Notification} />
          <Tab.Screen name="Calculator" component={Calculator} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
