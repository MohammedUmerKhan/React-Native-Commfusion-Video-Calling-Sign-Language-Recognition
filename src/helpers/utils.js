// Function to check the data type of a value
export const checkDataType = value => {
  return Object.prototype.toString.call(value).slice(8, -1);
};

// Function to print a message to the console
export const printToConsole = message => {
  console.log(message);
};

// Function to convert a string to a number
export const stringToNumber = str => {
  return parseFloat(str);
};

// Function to convert a number to a string
export const numberToString = num => {
  return num.toString();
};

// Function to convert a string to a boolean
export const stringToBoolean = str => {
  return str.toLowerCase() === 'true';
};

// Function to convert a boolean to a string
export const booleanToString = bool => {
  return bool.toString();
};

// Function to generate a random color
export const getRandomColor = () => {
  // Generate random values for RGB components
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Return the RGB color string
  return `rgb(${red}, ${green}, ${blue})`;
};

// Function to get initials from first and last name and combine them
export const getInitials = (fname, lname) => {
  const fnameInitial = fname.charAt(0);
  const lnameInitial = lname.charAt(0);
  return fnameInitial + lnameInitial;
};

// Function to group video calls by VideoCallId
export const groupVideoCalls = videoCalls => {
  // Check if videoCalls is an array and contains data
  const organizedVideoCalls = {};
  if (Array.isArray(videoCalls) && videoCalls.length > 0) {
    // Iterate over each user's calls
    videoCalls.forEach(userCalls => {
      // Check if userCalls has the expected property 'user_calls'
      if (
        userCalls &&
        userCalls.user_calls &&
        Array.isArray(userCalls.user_calls)
      ) {
        // Iterate over each call in the user's calls
        userCalls.user_calls.forEach(call => {
          const {VideoCallId} = call;
          // Check if the VideoCallId already exists in the organizedVideoCalls object
          if (VideoCallId in organizedVideoCalls) {
            // If it exists, push the call to the array of calls for that VideoCallId
            organizedVideoCalls[VideoCallId].push(call);
          } else {
            // If it doesn't exist, create a new array with the call and store it in the organizedVideoCalls object
            organizedVideoCalls[VideoCallId] = [call];
          }
        });
      }
    });
  } else {
    console.error(
      'Error: No video calls data found or data format is incorrect.',
    );
  }
  //data manipulation
  // Step 1: Convert the original object into an array of key-value pairs
  const keyValuePairs = Object.entries(organizedVideoCalls);
  // Step 2: Transform each pair into an object
  const dataObject = keyValuePairs.map(([key, value]) => ({
    [key]: value,
  }));

  const res = dataObject.map(item => {
    const key = Object.keys(item)[0]; // Get the key (VideoCallId)
    return {
      id: parseInt(key, 10), // Convert the key to a number
      users: item[key], // Assign the array of user objects
    };
  });

  // Return the organized video calls
  return res;
};

export const generateName = filteredData => {
  // If there's only one remaining object, return its full name
  if (filteredData.length === 1) {
    return `${filteredData[0].Fname} ${filteredData[0].Lname}`;
  }

  // Otherwise, combine all first names with an ampersand
  const combinedNames = filteredData.map(item => item.Fname).join(' & ');
  return combinedNames;
};

export const convertAcceptTime = acceptTime => {
  const date = new Date(acceptTime);
  const month = date.toLocaleString('default', {month: 'long'});
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  return `${month} ${day}, ${formattedHours}:${minutes
    .toString()
    .padStart(2, '0')} ${amPm}`;
};

// settingsFormatter

export const formatSettings = settingsArray => {
  return settingsArray.reduce((acc, setting) => {
    acc[setting.SettingName] = setting.SettingValue;
    return acc;
  }, {});
};

export const someAsyncFunction = async () => {
  // Simulate an asynchronous operation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Async operation complete');
    }, 1000);
  });
};

// // Add event listener (consider platform specific implementation)
// if (Platform.OS === 'ios') {
//   subscriptionRef.current = Dimensions.addEventListener('change', handleOrientationChange);
// } else {
//   subscriptionRef.current = Dimensions.addListener('change', handleOrientationChange);
// }
