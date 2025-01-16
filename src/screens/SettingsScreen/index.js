import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import styles from './styles';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from '../../constants/axiosInstance';
import instance from '../../constants/axiosInstance';
import CustomInput from '../../components/input/customInput';
import CustomButton from '../../components/buttons/customButton';
import ProfilePictureUploader from '../../components/input/profilePictureUploader';
import UserProfileItem from '../../components/userProfileItem/userProfileItem';
import SettingItem from '../../components/settingItem/settingItem';
import {getUserData, getUserSettings} from '../../helpers/asyncHelpers';

const App = ({navigation}) => {
  const [user, setUser] = useState();
  const [fullName, setFullName] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [profilePictureUri, setProfilePictureUri] = useState();
  const [userSettings, setUserSettings] = useState();
  const fetchData = async () => {
    try {
      const userData = await getUserData();
      setUser(userData);
      setFullName(userData.fname + ' ' + userData.lname);
      setFname(userData.fname);
      setLname(userData.lname);
      setProfilePictureUri(userData.profile_picture);
      const userSettingsData = await getUserSettings();
      setUserSettings(userSettingsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <ScrollView>
          <View style={styles.container}>
            {user && (
              <UserProfileItem
                userName={`${user.fname} ${user.lname}`}
                profilePictureUri={
                  user.profile_picture
                    ? `${instance.defaults.baseURL}profile_pictures/${user.profile_picture}`
                    : null
                }
                fname={user.fname}
                lname={user.lname}
                user={user}
                navigation={navigation} // pass your navigation object here
              />
            )}
            <SettingItem
              title="General"
              onPress={() => {
                navigation.navigate('General Settings', userSettings);
              }}
            />
            <SettingItem
              title="Notifications"
              onPress={() => {
                navigation.navigate('Notifications', userSettings);
              }}
            />
            <SettingItem
              title="Terms & Conditions"
              onPress={() => {
                navigation.navigate('Terms & Conditions');
              }}
            />
            <SettingItem
              title="About TalkFusion"
              onPress={() => {
                navigation.navigate('About');
              }}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Auth');
          }}
          style={styles.logoutButton}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Logout</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="logout" style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
