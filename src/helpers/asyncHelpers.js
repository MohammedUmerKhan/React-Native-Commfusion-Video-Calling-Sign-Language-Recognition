import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to retrieve user data from AsyncStorage
export const getUserData = async () => {
  try {
    // Retrieve user data from AsyncStorage
    const userDataJson = await AsyncStorage.getItem('userData');
    if (userDataJson !== null) {
      // Parse the JSON string to get the user data object
      const userData = JSON.parse(userDataJson);
      return userData;
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

// Helper function to store user data in AsyncStorage
export const storeUserData = async userData => {
  try {
    // Convert user data to JSON string
    const userDataJson = JSON.stringify(userData);
    // Store user data in AsyncStorage
    await AsyncStorage.setItem('userData', userDataJson);
    console.log(
      'User data stored successfully:',
      JSON.stringify(userData, null, 2),
    );
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

// Helper function to clear user data from AsyncStorage
export const clearUserData = async () => {
  try {
    // Remove user data from AsyncStorage
    await AsyncStorage.removeItem('userData');
    console.log('User data cleared successfully');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

// Helper function to check if user data exists in AsyncStorage
export const checkUserDataExists = async () => {
  try {
    // Check if user data exists in AsyncStorage
    const userDataJson = await AsyncStorage.getItem('userData');
    return userDataJson !== null;
  } catch (error) {
    console.error('Error checking user data existence:', error);
    return false;
  }
};

// Helper function to retrieve user settings from AsyncStorage
export const getUserSettings = async () => {
  try {
    // Retrieve user settings from AsyncStorage
    const userSettingsJson = await AsyncStorage.getItem('userSettings');
    if (userSettingsJson !== null) {
      // Parse the JSON string to get the user settings object
      const userSettings = JSON.parse(userSettingsJson);
      return userSettings;
    }
  } catch (error) {
    console.error('Error retrieving user settings:', error);
    return null;
  }
};

// Helper function to store user settings in AsyncStorage
export const storeUserSettings = async userSettings => {
  try {
    // Convert user settings to JSON string
    const userSettingsJson = JSON.stringify(userSettings);
    // Store user settings in AsyncStorage
    await AsyncStorage.setItem('userSettings', userSettingsJson);
    console.log(
      'User settings stored successfully:',
      JSON.stringify(userSettings, null, 2),
    );
  } catch (error) {
    console.error('Error storing user settings:', error);
  }
};

// Helper function to clear user settings from AsyncStorage
export const clearUserSettings = async () => {
  try {
    // Remove user settings from AsyncStorage
    await AsyncStorage.removeItem('userSettings');
    console.log('User settings cleared successfully');
  } catch (error) {
    console.error('Error clearing user settings:', error);
  }
};

// Helper function to check if user settings exist in AsyncStorage
export const checkUserSettingsExistence = async () => {
  try {
    // Check if user settings exist in AsyncStorage
    const userSettingsJson = await AsyncStorage.getItem('userSettings');
    return userSettingsJson !== null;
  } catch (error) {
    console.error('Error checking user settings existence:', error);
    return false;
  }
};
