import axios from '../constants/axiosInstance';
import {getUserData, storeUserSettings} from './asyncHelpers';
import {formatSettings} from './utils';
// apiHelper.js

export const handleAxiosError = error => {
  // Log detailed error information
  console.error('Axios request failed:', error);

  // Handle specific error cases
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    console.error(
      'No response received:',
      JSON.stringify(error.request, null, 2),
    );
  } else {
    // Something happened in setting up the request that triggered an error
    console.error('Request setup error:', error.message);
  }
};

// Function to fetch user settings from the API
export const fetchUserSettings = async () => {
  try {
    const userData = await getUserData(); // Retrieve user data
    const userId = userData.Id; // Get the user ID from user data
    // console.log(userId);
    // Make GET request to the endpoint
    const response = await axios.get(`/usersettings/${userId}`, {
      headers: {
        accept: 'application/json',
      },
    });

    // Log the response to the console
    console.log('User settings:', response.data);
    let formattedSettings = formatSettings(response.data);
    //Call Store user settings
    await storeUserSettings(formattedSettings);
    return response.data;
  } catch (error) {
    // console.error('Error fetching user settings:', error);
    handleAxiosError(error);
    return null;
  }
};

// Function to update user settings
export const updateUserSettings = async settings => {
  try {
    const userData = await getUserData(); // Retrieve user data
    const userId = userData.Id; // Get the user ID from user data
    // console.log(userId, settings);

    // Make PUT request to the endpoint
    const response = await axios.put(
      '/usersettings/settings',
      {
        user_id: userId,
        settings: settings,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    // Log the response to the console
    console.log('User settings updated:', response.data);
    let formattedSettings = formatSettings(response.data);
    //Call Store user settings
    await storeUserSettings(formattedSettings);
    return response.data;
  } catch (error) {
    console.error('Error updating user settings:', error);
    return null;
  }
};
