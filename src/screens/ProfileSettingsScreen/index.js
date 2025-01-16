import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from '../../constants/axiosInstance';

import styles from './styles';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomInput from '../../components/input/customInput';
import CustomButton from '../../components/buttons/customButton';
import ProfilePictureUploader from '../../components/input/profilePictureUploader';
import UserProfileItem from '../../components/userProfileItem/userProfileItem';
import SettingItem from '../../components/settingItem/settingItem';
import SettingsTextInput from '../../components/input/settingsTextInput';
import DialogWithLoadingIndicator from '../../components/modal/dialogWithLoadingIndicator ';
import {clearUserData, storeUserData} from '../../helpers/asyncHelpers';

const App = ({navigation, route}) => {
  const {
    DateOfBirth,
    Id,
    account_status,
    bio_status,
    disability_type,
    email,
    fname,
    lname,
    online_status,
    password,
    profile_picture,
    registration_date,
    username,
  } = route.params.user;
  const profilePictureUri = route.params.profilePictureUri;
  // placeholders
  const [fullNamePlaceholder, setFullNamePlaceholder] = useState(
    fname + ' ' + lname,
  );
  const [statusPlaceholder, setStatusPlaceholder] = useState(bio_status);
  // Values
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedDisability, setSelectedDisability] = useState(disability_type);
  // Error messages
  const [fullNameError, setFullNameError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  // const [selectedDisability, setSelectedDisability] = useState(disability_type);
  // handle Image upload
  const [imageUri, setImageUri] = useState('');
  const handleImageUri = uri => {
    setImageUri(uri);
    console.log('Image URI:', uri);
  };
  // Progress Dialog Visibility
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [progressMessage, setProgressMessage] = useState(
    'Please wait while we update your profile',
  );
  //Update Function
  const handleUpdate = async () => {
    // Reset errors
    setFullNameError('');
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');

    // Check if full name consists of both first name and last name
    console.log(`FullName; ${fullName}`);
    let fullNameParts;
    let new_fname = '',
      new_lname = '';
    if (fullName.trim()) {
      fullNameParts = fullName.trim().split(' ');
      if (fullName.trim() && fullNameParts.length < 2) {
        setFullNameError('Please enter both first name and last name');
        return;
      }
      new_fname = fullNameParts[0];
      new_lname = fullNameParts[1];

      console.log(
        `Full name parts First Name: ${fullNameParts[0]} and Last Name: ${fullNameParts[1]}`,
      );
    }

    if (!currentPassword.trim()) {
      setCurrentPasswordError('Current Password cannot be empty');
      return;
    }
    //
    if (newPassword || confirmPassword) {
      if (!newPassword) {
        setNewPasswordError(
          "New Password cannot be empty when confirm Password isn't",
        );
        return;
      }
      if (!confirmPassword) {
        setConfirmPasswordError(
          "Confirm Password cannot be empty when New Password isn't",
        );
        return;
      }
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }
    try {
      setDialogVisibility(true);
      console.log('-------------------');

      // Log all data to console
      console.log('First Name:', new_fname);
      console.log('Last Name:', new_lname);
      console.log('Id:', Id);
      console.log('Bio Status:', status);
      console.log('Selected Disability:', selectedDisability);
      console.log('Current Password:', currentPassword);
      console.log('New Password:', newPassword);
      console.log('Image: ' + imageUri);
      //  Make PUT request to Update endpoint
      const response = await axios.put(
        '/user/update-profile',
        {
          user_id: Id,
          current_password: currentPassword,
          new_password: newPassword,
          new_fname: new_fname,
          new_lname: new_lname,
          new_bio_status: status,
          new_disability_type: selectedDisability,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        },
      );
      setProgressMessage(
        'Please wait while we update your profile\nProfile Details Updated successfully',
      );
      // handle Image
      let uploadResponse;
      if (imageUri) {
        // Proceed to upload the image
        const formData = new FormData();
        formData.append('profile_picture', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'profile_picture.jpg',
        });

        uploadResponse = await axios.post(
          `/user/uploadprofilepicture/${Id}`,
          formData,
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          },
        );
      }
      if (uploadResponse) {
        if (uploadResponse.status === 200) {
          console.log('Image uploaded successfully');
          setDialogVisibility(true);
          setProgressMessage(
            'Please wait while we update your profile\nProfile Details Updated successfully\nImage uploaded successfully',
          );
        } else {
          console.log(
            'Failed to upload image:',
            JSON.stringify(uploadResponse.data, null, 2),
          );
        }
      }
      // Get user details
      const userDetailsResponse = await axios.get(`/user/userdetails/${Id}`);

      if (userDetailsResponse.status === 200) {
        await clearUserData();
        await storeUserData(userDetailsResponse.data);
        setDialogVisibility(false);
        navigation.navigate('Settings');
      } else {
        console.log('Failed to fetch user details:', userDetailsResponse.data);
      }

      setDialogVisibility(false);
    } catch (error) {
      // Handle signup error
      setDialogVisibility(false);
      if (error.response) {
        console.log('Error' + error.response.data.detail);
        setCurrentPasswordError('Incorrect current password');
      } else {
        console.error('Update error:', error);
      }
    }
    setDialogVisibility(false);
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <ScrollView>
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 13,
              }}>
              <ProfilePictureUploader
                defaultImage={
                  profilePictureUri == ''
                    ? "require('../../assets/images/extra/profile-icon.png')"
                    : {profilePictureUri}
                }
                onImageUri={handleImageUri}
              />
            </View>
            <View>
              <SettingsTextInput
                title="Full Name"
                placeholder={fullNamePlaceholder}
                value={fullName}
                onChangeText={setFullName}
                error={fullNameError}
              />
              <SettingsTextInput
                title="Status"
                placeholder={statusPlaceholder}
                value={status}
                onChangeText={setStatus}
              />
              <View
                style={{
                  backgroundColor: '#eceaea',
                  marginHorizontal: 39,
                  borderRadius: 43,
                  marginVertical: 5,
                  height: 74,
                  justifyContent: 'center',
                  borderWidth: 1,
                  // alignItems: 'center',
                }}>
                <Picker
                  style={{}}
                  selectedValue={selectedDisability}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedDisability(itemValue)
                  }>
                  <Picker.Item label="No accessibility needs" value="General" />
                  <Picker.Item label="Deaf & Mute" value="Deaf and Mute" />
                  {/* <Picker.Item label="Mute / Speech Impaired" value="mute" /> */}
                  <Picker.Item label="Blind" value="Blind" />
                  {/* <Picker.Item
                    label="Blind / Visually Impaired"
                    value="blind"
                  /> */}
                </Picker>
              </View>
              <SettingsTextInput
                title={'Current Password'}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                isPassword={true}
                error={currentPasswordError}
              />
              <SettingsTextInput
                title={'New Password'}
                value={newPassword}
                onChangeText={setNewPassword}
                isPassword={true}
                error={newPasswordError}
              />
              <SettingsTextInput
                title={'Confirm Password'}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword={true}
                error={confirmPasswordError}
              />
            </View>

            <View style={{alignItems: 'center'}}>
              <CustomButton
                onPress={handleUpdate}
                buttonBackgroundColor="#20A0F0"
                textColor="white"
                borderColor="#20A0F0"
                borderWidth={4}
                buttonText="Save"
                buttonWidth="85%"
              />
            </View>
          </View>
        </ScrollView>

        <DialogWithLoadingIndicator
          visible={dialogVisibility}
          title="Updating Profile"
          message={progressMessage}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
