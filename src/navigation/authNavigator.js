import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native'; // Import Dimensions
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
// Your screen components
import SplashScreen from '../screens/SplashScreen/index';
import AuthScreen from '../screens/AuthScreen/index';
import LoginScreen from '../screens/LoginScreen/index';
import SignUpScreen from '../screens/SignUpScreen/index';
import ProfileSetupScreen from '../screens/ProfileSetupScreen/index';
import HomeScreen from '../screens/HomeScreen/index';
import CallLogScreen from '../screens/CallLogScreen/index';
import LecturesScreen from '../screens/LecturesScreen/index';
import SettingsScreen from '../screens/SettingsScreen/index';
import AboutScreen from '../screens/AboutScreen/index';
import TermsConditions from '../screens/Terms&ConditionsScreen/index';
import NotificationsSettings from '../screens/NotificationsSettingsScreen/index';
import GeneralSettings from '../screens/GeneralSettingsScreen/index';
import ProfileSettings from '../screens/ProfileSettingsScreen/index';
import FavouriteSigns from '../screens/FavouriteSignsScreen/index';
import BeginnerLevel from '../screens/BeginnerLevelScreen/index';
import IntermediateLevel from '../screens/IntermediateLevelScreen/index';
import ExpertLevel from '../screens/ExpertLevelScreen/index';
import CustomGesture from '../screens/CustomGestureScreen/index';
import AddCustomGesture from '../screens/AddCustomGestureScreen/index';
import AlphabetsDetails from '../screens/AlphabetsDetailsScreen/index';
import PhrasesDetails from '../screens/PhrasesDetailsScreen/index';
import AddNewContact from '../screens/AddNewContactScreen/index';
import SearchContacts from '../screens/SearchContantsScreen/index';
import ProfileDetails from '../screens/ProfileDetailsScreen/index';
import PlayGesture from '../screens/PlayGestureScreen/index';
import CallInfo from '../screens/CallInfoScreen/index';
import Contacts from '../screens/ContactsScreen/index';

import OutgoingCall from '../screens/OutgoingCallScreen/index';
import IncomingCall from '../screens/IncomingCallScreen/index';
import VideoCall from '../screens/VideoCallScreen/index';

import Header from '../components/header/header';
import COLORS from '../constants/colors';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
// Define the initial layout
const initialLayout = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainHome"
      screenOptions={{
        tabBarActiveTintColor: COLORS.blue1,
        tabBarInactiveTintColor: 'grey',
      }}
      initialLayout={initialLayout} // Apply the initial layout here
    >
      <Tab.Screen
        name="MainHome"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="CallLog"
        component={CallLogScreen}
        options={{
          title: 'Calls',
          tabBarIcon: ({color}) => (
            <Icon name="phone" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Lectures"
        component={LecturesScreen}
        options={{
          title: 'Lectures',
          tabBarIcon: ({color}) => (
            <Icon name="school" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const AuthNavigator = () => {
  const navigation = useNavigation(); // Use useNavigation hook
  // console.log('AuthNavigator navigation prop:', navigation);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileSetup"
        component={ProfileSetupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Terms & Conditions"
        component={TermsConditions}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsSettings}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="General Settings"
        component={GeneralSettings}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Profile Settings"
        component={ProfileSettings}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Favourite Signs"
        component={FavouriteSigns}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Beginner Level"
        component={BeginnerLevel}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Intermediate Level"
        component={IntermediateLevel}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Expert Level"
        component={ExpertLevel}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Custom Gesture"
        component={CustomGesture}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Add Custom Gesture"
        component={AddCustomGesture}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Alphabets"
        component={AlphabetsDetails}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Phrases"
        component={PhrasesDetails}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Search Contacts"
        component={SearchContacts}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Add Contact"
        component={AddNewContact}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="User Details"
        component={ProfileDetails}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Call Info"
        component={CallInfo}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Play Gesture"
        component={PlayGesture}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Outgoing Call"
        component={OutgoingCall}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Incoming Call"
        component={IncomingCall}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoCall"
        component={VideoCall}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={MainTabNavigator}
        options={{
          header: () => <Header navigation={navigation} isHome={true} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
