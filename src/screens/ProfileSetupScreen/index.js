import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView, StatusBar, ScrollView} from 'react-native';

import {Snackbar} from 'react-native-paper';

import styles from './styles';
import COLORS from '../../constants/colors';
import {Chip} from 'react-native-paper';
import CustomInput from '../../components/input/customInput';
import CustomButton from '../../components/buttons/customButton';
import ProfilePictureUploader from '../../components/input/profilePictureUploader';
import DialogWithLoadingIndicator from '../../components/modal/dialogWithLoadingIndicator ';
import axios from '../../constants/axiosInstance';
import {
  clearUserData,
  getUserData,
  storeUserData,
} from '../../helpers/asyncHelpers';

const App = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [progressMessage, setProgressMessage] = useState(
    'Please wait while we set up your profile',
  );
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [bioStatus, setBioStatus] = useState('');
  const [userId, setUserId] = useState(0);
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    getUserStorageData();
  }, []);

  const getUserStorageData = async () => {
    try {
      const userData = await getUserData();
      if (userData) {
        const storedUsername = userData.username;
        setUsername(storedUsername);
        setUserId(userData.Id);
      } else {
        console.log('No user data found.');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const handleImageUri = uri => {
    setImageUri(uri);
    console.log('Image URI:', uri);
  };
  const handleNextButtonPress = async () => {
    setDialogVisibility(true);

    try {
      const response = await axios.put('/user/update-bio-status', {
        user_id: userId,
        bio_status: bioStatus,
      });

      if (response.status === 200) {
        console.log('API Response:', JSON.stringify(response.data, null, 2));
        setDialogVisibility(true);
        setProgressMessage(
          'Please wait while we set up your profile\nBio status added successfully',
        );
        // setSnackbarMessage('Bio status added successfully');
        // setSnackbarVisible(true););
        //? This is for setting up default settings
        const settingsResponse = await axios.post(
          `/usersettings/${userId}/default`,
        );

        if (settingsResponse.status === 200) {
          console.log(
            'API Response:',
            JSON.stringify(settingsResponse.data, null, 2),
          );
          setDialogVisibility(true);
        }
        //? Check if image URI is set
        if (imageUri) {
          // Proceed to upload the image
          const formData = new FormData();
          formData.append('profile_picture', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'profile_picture.jpg',
          });

          const uploadResponse = await axios.post(
            `/user/uploadprofilepicture/${userId}`,
            formData,
            {
              headers: {
                accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            },
          );

          if (uploadResponse.status === 200) {
            console.log('Image uploaded successfully');
            setDialogVisibility(true);
            setProgressMessage(
              'Please wait while we set up your profile\nBio status added successfully\nImage uploaded successfully',
            );
          } else {
            console.log(
              'Failed to upload image:',
              JSON.stringify(uploadResponse.data, null, 2),
            );
          }
        }
        // Get user details
        const userDetailsResponse = await axios.get(
          `/user/userdetails/${userId}`,
        );

        if (userDetailsResponse.status === 200) {
          setProgressMessage(prevMessage => prevMessage + '\nfinalizing');

          await clearUserData();

          await storeUserData(userDetailsResponse.data);
          setDialogVisibility(false);
          navigation.navigate('Home');
        } else {
          console.log(
            'Failed to fetch user details:',
            userDetailsResponse.data,
          );
        }
      } else {
        console.log('API Error:', JSON.stringify(response.data, null, 2));
        setDialogVisibility(false);
        setSnackbarMessage('Failed to add bio status');
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error('API Error:', error);
      setDialogVisibility(false);
      setSnackbarMessage('An error occurred. Please try again later.');
      setSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.profile_title}>Profile Setup</Text>
          <Text style={styles.below_profile}>Start shaping your profile</Text>
          <View style={{marginTop: 23}}>
            <ProfilePictureUploader
              // defaultImage={require('../../assets/images/extra/profile-icon.png')}
              onImageUri={handleImageUri}
              defaultV={true}
            />
          </View>
          <Chip
            mode="outlined"
            elevated
            onPress={() => {
              setSnackbarMessage(`This is your username: @${username}`);
              setSnackbarVisible(true);
            }}
            style={styles.chip}>
            @{username}
          </Chip>

          <CustomInput
            placeholder="Hi, I am using CommFusion"
            iconName="emoticon-happy-outline"
            onChangeText={text => setBioStatus(text)}
          />
          <CustomButton
            onPress={handleNextButtonPress}
            buttonBackgroundColor="#20A0F0"
            textColor="white"
            borderColor="#20A0F0"
            borderWidth={4}
            buttonText="Next"
            buttonWidth="85%"
          />
        </View>
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={Snackbar.DURATION_SHORT}>
        {snackbarMessage}
      </Snackbar>
      <DialogWithLoadingIndicator
        visible={dialogVisibility}
        title="Setting Up Profile"
        message={progressMessage}
      />
    </SafeAreaView>
  );
};

export default App;
