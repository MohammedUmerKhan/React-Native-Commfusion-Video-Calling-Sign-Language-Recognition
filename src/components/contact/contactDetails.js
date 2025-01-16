import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {Snackbar, Chip} from 'react-native-paper';
import {getInitials, getRandomColor} from '../../helpers/utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const ContactDetails = ({
  userId, // Accessing userId prop
  fname,
  lname,
  username,
  disability_type,
  profilePictureUri,
  userStatus,
  isOnline,
  setSnackbarVisible,
  setSnackbarMessage,
}) => {
  // Get initials if profilePictureUri is empty
  const initials = !profilePictureUri ? getInitials(fname, lname) : null;

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.avatarContainer}>
          {!profilePictureUri ? ( // If profile picture is empty, render Avatar.Text
            <Avatar.Text
              size={100}
              label={initials.toUpperCase()}
              style={[styles.avatar, {backgroundColor: getRandomColor()}]}
            />
          ) : (
            <FastImage
              source={{uri: profilePictureUri}}
              style={styles.avatar}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
        </View>
        <View style={styles.onlineText}>
          <Icon
            name="circle"
            style={[
              {fontSize: 15, marginLeft: 103},
              {color: isOnline ? COLORS.online : 'grey'},
            ]}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.fullName}>
              {fname} {lname}
            </Text>
          </View>
          <Text style={styles.userStatus}>{userStatus}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Chip
            mode="outlined"
            elevated
            onPress={() => {
              setSnackbarMessage(`This is contacts username: @${username}`);
              setSnackbarVisible(true);
            }}
            style={styles.chip}>
            @{username}
          </Chip>
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.iconsCenter}>
            <IconButton
              icon="account-cancel"
              size={40}
              onPress={() => {
                console.log('Block User');
              }}
            />
          </View>
          <View style={styles.iconsCenter}>
            <IconButton
              icon="video"
              size={40}
              onPress={() => {
                console.log('Video Call');
              }}
            />
          </View>
        </View>
        <View style={styles.accessibilityContainer}>
          <Text style={styles.accessibilityLabel}>Accessibility Needs:</Text>
          <Text style={styles.accessibilityText}>{disability_type}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'green',
  },
  detailsContainer: {
    // borderColor: 'yellow',
    // borderWidth: 3,
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  avatarContainer: {
    // borderWidth: 2,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#fff',
  },
  textContainer: {
    // borderWidth: 2,
    alignItems: 'center',
  },
  onlineText: {
    // borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 0,
    marginTop: -20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    // borderWidth: 2,
  },
  nameContainer: {},
  userStatus: {
    fontSize: 18,
    fontWeight: '400',
    // color: 'black',
  },
  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: '#efeff0',
  },
  accessibilityContainer: {
    // borderWidth: 2,
    alignItems: 'center',
    flexDirection: 'row',
    // borderColor: 'cyan',
    padding: 30,
    borderBottomWidth: 3,
    borderBottomColor: '#efeff0',
  },
  accessibilityLabel: {
    fontSize: 20,
    fontWeight: '600',
  },
  accessibilityText: {
    fontSize: 20,
  },
  iconsCenter: {
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    marginTop: 10,
    borderRadius: 34,
    backgroundColor: '#d6ecfd',
    alignItems: 'center',
  },
});

export default ContactDetails;
