import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import COLORS from '../../constants/colors';
import axios from '../../constants/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Portal, Dialog} from 'react-native-paper';

import CustomInput from '../../components/input/customInput';
import CustomButton from '../../components/buttons/customButton';
import DialogWithLoadingIndicator from '../../components/modal/dialogWithLoadingIndicator ';
import {clearUserData, storeUserData} from '../../helpers/asyncHelpers';
import {connectToSocketServer} from '../../helpers/socketManager';
import socketContext from '../../context/socket/socketContext';

const App = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogVisibility, setDialogVisibility] = useState(false);
  //Context
  const {socket, setSocket} = useContext(socketContext);
  const handleLogin = async () => {
    // Reset errors and error message
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    // Validate inputs
    if (email.trim() === '') {
      setEmailError('Email cannot be empty');
      return;
    }
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Invalid email format');
      return;
    }
    if (password.trim() === '') {
      setPasswordError('Password cannot be empty');
      return;
    }

    try {
      setDialogVisibility(true);
      // Make POST request to login endpoint
      const response = await axios.post('/user/login', {
        email: email,
        password: password,
      });

      // Handle successful login response
      // console.log('Login successful->');
      // console.log(JSON.stringify(response.data, null, 2));
      // Store user data in AsyncStorage
      // await clearUserData();
      await storeUserData(response.data);

      // This is to establish connection with the socket server
      const newSocket = await connectToSocketServer();
      setSocket(newSocket);
      // Check for ProfileSetup
      let chkForProfileSetup = response.data.bio_status;
      // Navigate to the next screen after user data is successfully stored
      setDialogVisibility(false);
      navigation.navigate(chkForProfileSetup === '' ? 'ProfileSetup' : 'Home');
    } catch (error) {
      setDialogVisibility(false);
      // Handle login error
      console.log('Login error:', error.response.data);
      setErrorMessage(error.response.data.detail);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.login_title}>Login</Text>
          <Text style={styles.below_login}>Enter your details to Login</Text>
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
          {errorMessage !== '' && (
            <Text style={styles.error}>{errorMessage}</Text>
          )}
          <CustomButton
            onPress={handleLogin}
            buttonBackgroundColor="#20A0F0"
            textColor="white"
            borderColor="#20A0F0"
            borderWidth={4}
            buttonText="Login"
            buttonWidth="85%"
          />
          {/* Sign Up text with onPress handler */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.text_signup}>
              Don't have an account? <Text style={styles.signup}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <DialogWithLoadingIndicator
          visible={dialogVisibility} // Set to true to show the dialog, false to hide it
          title="Logging In" // Title of the dialog
          message="Please wait while we authenticate your credentials" // Message to display alongside the loading indicator
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
