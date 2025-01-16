import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableRipple, Avatar} from 'react-native-paper';
import COLORS from '../../constants/colors';
import FastImage from 'react-native-fast-image';
import {getInitials, getRandomColor} from '../../helpers/utils';
const ContactListItem = ({
  userId, // Accessing userId prop
  fname,
  lname,
  username,
  disability_type,
  profilePictureUri,
  userStatus,
  isOnline,
  navigation,
}) => {
  // Get initials if profilePictureUri is empty
  const initials = !profilePictureUri ? getInitials(fname, lname) : null;
  const handleVideoPress = () => {
    // Handle video press navigation
    // For demonstration, let's navigate to a hypothetical video screen
    // navigation.navigate('VideoCall');
    navigation.navigate('Outgoing Call', {
      userId,
      fname,
      lname,
      username,
      disability_type,
      profilePictureUri,
      userStatus,
      isOnline,
    });
    // console.warn('Outgoing Call');
  };

  const handleProfilePress = () => {
    // Handle profile press navigation
    // For demonstration, let's navigate to user profile details
    navigation.navigate('User Details', {
      userId,
      fname,
      lname,
      username,
      disability_type,
      profilePictureUri,
      userStatus,
      isOnline,
    });
  };
  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={handleProfilePress}
        style={{flex: 5}}
        // rippleColor="#b8b4b4">
        rippleColor="#fff">
        <View style={styles.contactContainer}>
          {!profilePictureUri ? ( // If profile picture is empty, render Avatar.Text
            <Avatar.Text
              size={50}
              label={initials.toUpperCase()}
              style={[
                styles.profilePictureContainer,
                {backgroundColor: getRandomColor()},
              ]}
            />
          ) : (
            <View style={styles.profilePictureContainer}>
              <FastImage
                source={{uri: profilePictureUri}}
                style={styles.profilePicture}
              />
            </View>
          )}
          <View style={styles.userInfoContainer}>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>
                {fname} {lname}
              </Text>
            </View>
            <View style={styles.userStatusContainer}>
              <Text style={styles.userStatus}>
                {userStatus.length > 29
                  ? userStatus.substring(0, 29) + '...'
                  : userStatus}
              </Text>
            </View>
          </View>
          <View style={[styles.statusIndicatorContainer]}>
            <Icon
              name="circle"
              style={[
                styles.statusIndicator,
                {color: isOnline ? COLORS.online : 'grey'},
              ]}
            />
          </View>
        </View>
      </TouchableRipple>
      <TouchableOpacity
        onPress={handleVideoPress}
        style={styles.videoIconContainer}>
        <Icon name="video" style={styles.videoIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#dcdcdc',
    borderBottomWidth: 2,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  contactContainer: {
    // flex: 6.5,
    flexDirection: 'row',
    // borderWidth: 3,
  },
  profilePictureContainer: {
    flex: 1.1,
    borderRadius: 28,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    marginLeft: 0,
    marginRight: 0,
    width: 55,
    height: 55,
    borderWidth: 2,
    borderColor: '#dcdcdc',
  },
  profilePicture: {
    width: 55,
    height: 50,
  },
  userInfoContainer: {
    flex: 5,
    // borderWidth: 2,
    // borderColor: 'yellow',
    flexDirection: 'column',
    paddingLeft: 6,
  },
  userNameContainer: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 0,
    // borderWidth: 2,
    // borderColor: 'green',
  },
  userName: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
  },
  userStatusContainer: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'blue',
    paddingBottom: 6,
  },
  userStatus: {
    color: '#777777',
    fontWeight: '600',
  },
  statusIndicatorContainer: {
    flex: 0.4,
    // borderWidth: 1,
    // borderColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  statusIndicator: {
    fontSize: 15,
  },
  videoIconContainer: {
    // borderWidth: 2,
    // borderColor: 'cyan',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoIcon: {
    fontSize: 37,
    color: COLORS.blue1,
  },
});

export default ContactListItem;
