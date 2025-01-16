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

import styles from './styles';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Searchbar, Snackbar} from 'react-native-paper';
import CustomInput from '../../components/input/customInput';
import CustomButton from '../../components/buttons/customButton';
import ProfilePictureUploader from '../../components/input/profilePictureUploader';
import UserProfileItem from '../../components/userProfileItem/userProfileItem';
import SettingItem from '../../components/settingItem/settingItem';
import SegmentedButtonWithSelectedCheck from '../../components/buttons/segmentedButtonWithSelectedCheck';
import ContactDetails from '../../components/contact/contactDetails';

const App = ({navigation, route}) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Destructure the params from the route
  const {
    userId, // Accessing userId prop
    fname,
    lname,
    username,
    disability_type,
    profilePictureUri,
    userStatus,
    isOnline,
  } = route.params;

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <ScrollView>
          <View style={styles.container}>
            <ContactDetails
              userId={userId}
              fname={fname}
              lname={lname}
              disability_type={disability_type}
              profilePictureUri={profilePictureUri}
              username={username}
              userStatus={userStatus}
              isOnline={isOnline}
              setSnackbarVisible={setSnackbarVisible}
              setSnackbarMessage={setSnackbarMessage}
            />
          </View>
        </ScrollView>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}>
          {snackbarMessage}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

export default App;
