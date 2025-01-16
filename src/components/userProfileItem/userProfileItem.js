import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableRipple, Avatar} from 'react-native-paper';
import {getInitials, getRandomColor} from '../../helpers/utils';

const UserProfileItem = ({
  userName,
  profilePictureUri,
  fname,
  lname,
  user,
  navigation,
}) => {
  // console.log(user);
  // Get initials if profilePictureUri is empty
  const initials = !profilePictureUri ? getInitials(fname, lname) : null;

  const handlePress = () => {
    // Handle press navigation to user details screen
    navigation.navigate('Profile Settings', {user, profilePictureUri});
    // console.log('User Details');
  };

  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={handlePress}
        // style={{flex: 5}}
        rippleColor="#b8b4b4">
        <View style={styles.itemContainer}>
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
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon name="chevron-right" style={styles.arrowIcon} />
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {borderBottomWidth: 4, borderBottomColor: '#efeff0'},
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  profilePictureContainer: {
    flex: 0.8,
    backgroundColor: 'mintcream',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#dcdcdc',
    overflow: 'hidden',
  },
  profilePicture: {
    width: 77,
    height: 70,
  },
  userInfoContainer: {
    flex: 2,
    // backgroundColor: 'aquamarine',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  arrowContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 40,
  },
});

export default UserProfileItem;
