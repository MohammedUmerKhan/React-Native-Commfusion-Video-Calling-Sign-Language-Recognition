import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

const CustomGestureUploader = ({number, defaultImage, onChange, onPress}) => {
  const [image, setImage] = useState('');
  const handlePress = () => {
    // Call the onPress prop function (passed from parent)
    onPress(number); // Pass the uploader's index (number)
  };

  const requestCameraPermission = async () => {
    try {
      const grantedCamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const grantedStorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'App Storage Permission',
          message: 'App needs access to your storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (
        grantedCamera === PermissionsAndroid.RESULTS.GRANTED &&
        grantedStorage === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera & storage permission given');
        // Proceed with launching the camera
        handleCameraUpload();
      } else {
        console.log('Camera or storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleCameraUpload = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    console.log('entered handle Camera upload');
    launchCamera(options, response => {
      console.log('entered Camera ');
      if (
        response &&
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const selectedImageUri = response.assets[0].uri;
        setImage(selectedImageUri);
        console.log('Image Number:', number); // Log the image URI
        console.log('Image URI:', selectedImageUri); // Log the image URI
        // Call the onChange callback with the selected image URI
        onChange(selectedImageUri);
      }
    });
  };

  const handleImageBackgroundPress = () => {
    if (image) {
      console.log('Image is set');
      handlePress();
    } else {
      // Display a toast indicating the user to click on the camera icon
      ToastAndroid.show(
        'Click on camera icon to take picture',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={handleImageBackgroundPress}>
        <ImageBackground
          style={styles.imageBackground}
          source={image ? {uri: image} : defaultImage}>
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity onPress={handleCameraUpload}>
              <Icon name="camera-outline" style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: 130,
    height: 160,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: '#ededed',
    overflow: 'hidden',
    alignItems: 'center',
  },
  touchable: {
    flex: 1,
  },
  imageBackground: {
    width: 126,
    height: 158,
    borderRadius: 15,
  },
  cameraButtonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    marginTop: 65,
    marginLeft: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ededed',
    overflow: 'hidden',
    backgroundColor: '#ededed',
    opacity: 0.8,
  },
  cameraIcon: {
    fontSize: 52,
  },
});

export default CustomGestureUploader;
