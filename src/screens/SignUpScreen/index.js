import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import DatetimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from '../../constants/axiosInstance';
import CustomInput from '../../components/input/customInput';
import CustomButton from '../../components/buttons/customButton';
import CustomDateInput from '../../components/input/customDateInput';
import DialogWithLoadingIndicator from '../../components/modal/dialogWithLoadingIndicator ';

const App = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDisability, setSelectedDisability] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [selectedDisabilityError, setSelectedDisabilityError] = useState('');
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || dateOfBirth;
      setDateOfBirth(currentDate.toDateString());
      if (Platform.OS === 'android') {
        toggleDatepicker();
      }
    } else {
      toggleDatepicker();
    }
  };

  const handleSignUp = async () => {
    // Reset errors
    setFullNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setDateOfBirthError('');
    setSelectedDisabilityError('');

    // Validate form fields
    if (!fullName.trim()) {
      setFullNameError('Full name cannot be empty');
      return;
    }
    // Check if full name consists of both first name and last name
    const fullNameParts = fullName.trim().split(' ');
    if (fullNameParts.length < 2) {
      setFullNameError('Please enter both first name and last name');
      return;
    }
    console.log(
      `Full name parts First Name: ${fullNameParts[0]} and Last Name: ${fullNameParts[1]}`,
    );

    if (!email.trim()) {
      setEmailError('Email cannot be empty');
      return;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Invalid email format');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Password cannot be empty');
      return;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm password cannot be empty');
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    if (!dateOfBirth.trim()) {
      setDateOfBirthError('Date of birth cannot be empty');
      return;
    }
    if (!selectedDisability) {
      setSelectedDisabilityError('Please select accessibility needs');
      return;
    }

    // navigation.navigate('Login');
    try {
      setDialogVisibility(true);
      // Format date of birth
      const dob = new Date(dateOfBirth);
      const formattedDob = `${dob.getFullYear()}-${(dob.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${dob.getDate().toString().padStart(2, '0')}`;

      // Log all data to console
      console.log('First Name:', fullNameParts[0]);
      console.log('Last Name:', fullNameParts[1]);
      console.log('Email:', email);
      console.log('Date of Birth:', formattedDob);
      console.log('Selected Disability:', selectedDisability);

      // Make POST request to signup endpoint
      const response = await axios.post('/user/signup', {
        fname: fullNameParts[0],
        lname: fullNameParts[1],
        DateOfBirth: formattedDob,
        password: password,
        email: email,
        disability_type: selectedDisability,
        bio_status: '',
      });

      // Log response data
      console.log('Signup successful:', response.data);
      setDialogVisibility(false);
      // Navigate to the next screen
      navigation.navigate('Login');
    } catch (error) {
      // Handle signup error
      setDialogVisibility(false);
      if (error.response) {
        console.log('Error' + error.response.data.detail);
        setEmailError('Email is already registered');
      } else {
        console.error('Signup error:', error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.login_title}>Sign up</Text>
          <Text style={styles.below_login}>Enter your details to sign up</Text>
          <CustomInput
            placeholder="Enter your full name"
            iconName="account-outline"
            onChangeText={text => setFullName(text)}
            error={fullNameError}
          />
          <CustomInput
            placeholder="Enter your email"
            iconName="email-outline"
            onChangeText={text => setEmail(text)}
            error={emailError}
          />
          <CustomInput
            placeholder="Enter your password"
            iconName="lock-outline"
            password={true}
            onChangeText={text => setPassword(text)}
            error={passwordError}
          />
          <CustomInput
            placeholder="Confirm your password"
            iconName="lock-outline"
            password={true}
            onChangeText={text => setConfirmPassword(text)}
            error={confirmPasswordError}
          />
          {!showPicker && (
            <CustomDateInput
              placeholder="Select your date of birth"
              iconName="calendar"
              value={dateOfBirth}
              onPress={toggleDatepicker}
              error={dateOfBirthError}
            />
          )}

          {showPicker && (
            <DatetimePicker
              mode="date"
              display="spinner"
              value={new Date()}
              onChange={onChange}
            />
          )}
          <View
            style={[
              styles.pickerContainer,
              selectedDisabilityError
                ? {borderColor: 'red', borderWidth: 3}
                : null,
            ]}>
            <Icon name="human-queue" style={styles.iconPicker} />
            <Picker
              style={[styles.picker]}
              selectedValue={selectedDisability}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDisability(itemValue)
              }>
              <Picker.Item label="Select accessibility needs" value="" />
              <Picker.Item label="No accessibility needs" value="General" />
              <Picker.Item label="Deaf & Mute" value="Deaf and Mute" />
              {/* <Picker.Item label="Mute / Speech Impaired" value="mute" /> */}
              <Picker.Item label="Blind" value="Blind" />
            </Picker>
          </View>
          {selectedDisabilityError !== '' && (
            <Text style={styles.error}>{selectedDisabilityError}</Text>
          )}
          <CustomButton
            onPress={handleSignUp}
            buttonBackgroundColor="#20A0F0"
            textColor="white"
            borderColor="#20A0F0"
            borderWidth={4}
            buttonText="Sign up"
            buttonWidth="85%"
          />

          {/* Sign Up text with onPress handler */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.text_signup}>
              Already have an account? <Text style={styles.signup}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <DialogWithLoadingIndicator
          visible={dialogVisibility} // Set to true to show the dialog, false to hide it
          title="Setting Up Your Account" // Title of the dialog
          message="Thanks for signing up! We're creating your account." // Message to display alongside the loading indicator
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
