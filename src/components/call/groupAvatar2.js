import React from 'react';
import {View, StyleSheet} from 'react-native';
import instance from '../../constants/axiosInstance';
import FastImage from 'react-native-fast-image';

const GroupAvatar2 = ({profilePictures}) => {
  return (
    <View style={styles.container}>
      <View style={styles.groupAvatar}>
        {profilePictures.map((uri, index) => (
          <FastImage
            key={index}
            source={{
              uri: `${instance.defaults.baseURL}profile_pictures/${uri}`,
            }}
            style={[
              styles.profilePicture,
              {zIndex: profilePictures.length - index},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40, // To make it circular
    overflow: 'hidden', // Mask profile pictures outside the circle
    flexDirection: 'column', // Arrange profile pictures horizontally
    borderWidth: 2,
    // borderWidth: 3,
    borderColor: '#dcdcdc',
    padding: 0,
  },
  profilePicture: {
    borderColor: 'white',
    flex: 1,
    width: 80,
    marginLeft: -2,
    marginVertical: -0.5,
    // aspectRatio: 1, // Maintain aspect ratio
    borderRadius: 1, // To make individual profile pictures circular
    borderWidth: 1, // Optional: Add border for better separation
    // borderColor: '#fff', // Optional: Border color to match background
    margin: 1, // Add margin for better separation
  },
});

export default GroupAvatar2;
