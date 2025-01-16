import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import ImageUploadModal from '../modal/imageUploadModal'; // Import the ImageUploadModal component
import instance from '../../constants/axiosInstance';
const ProfilePictureUploader = ({defaultImage, onImageUri, defaultV}) => {
  const [image, setImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(defaultImage);
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

  const handleImageUpload = () => {
    setModalVisible(false);
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel && response.assets.length > 0) {
        const selectedImageUri = response.assets[0].uri;
        setImage(selectedImageUri);
        onImageUri(selectedImageUri); // Call onImageUri with selected image URI
        console.log(
          `ProfilePictureUploader->Selected gallery image Url is : ${selectedImageUri}`,
        );
      }
    });
  };

  const handleCameraUpload = () => {
    setModalVisible(false);
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
        onImageUri(selectedImageUri); // Call onImageUri with selected image URI
        console.log(
          `ProfilePictureUploader->Selected camera image Url is : ${selectedImageUri}`,
        );
      }
    });
  };

  return (
    <View
      style={{
        marginTop: 0,
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: '#ededed',
        overflow: 'hidden',
        alignItems: 'center',
      }}>
      <ImageBackground
        style={{
          width: 146,
          height: 146,
          borderRadius: 75,
        }}
        source={
          image
            ? {uri: image}
            : defaultV
            ? require('../../assets/images/extra/profile-icon.png')
            : {uri: defaultImage.profilePictureUri}
        }>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 3,
            marginTop: 82,
            marginLeft: 45,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#ededed',
            overflow: 'hidden',
            backgroundColor: '#ededed',
            opacity: 0.8,
          }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon
              name="camera-outline"
              style={{
                fontSize: 52,
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <ImageUploadModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onGalleryPress={handleImageUpload}
        onCameraPress={requestCameraPermission}
      />
    </View>
  );
};

export default ProfilePictureUploader;
