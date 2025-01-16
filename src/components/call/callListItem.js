import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableRipple, Avatar} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import COLORS from '../../constants/colors';
import {convertAcceptTime, generateName} from '../../helpers/utils';
import GroupAvatar from './groupAvatar';

const CallListItem = ({callDetails, userId, navigation}) => {
  // console.log(`call Details: ${callDetails}\n userId: ${userId}`);
  const filteredData = callDetails.filter(item => item.Id !== userId);
  const userData = callDetails.filter(item => item.Id === userId);
  const generatedName = generateName(filteredData);
  const formattedTime = convertAcceptTime(userData[0].AcceptTime);
  const profilePictures = filteredData.map(item => item.ProfilePicture);
  const callMade = userData[0].isCaller === 1 ? true : false;

  const handleProfilePress = () => {
    navigation.navigate('Call Info', {
      userId: userId,
      callMade: callMade,
      filteredData: filteredData,
      profilePictures: profilePictures,
      formattedTime: formattedTime,
    });
  };
  const getStatusDisplay = () => {
    if (callMade) {
      return (
        <>
          <Icon
            name="phone-outgoing"
            style={[styles.statusIndicator, {color: COLORS.outgoing}]}
          />
          <Text style={styles.statusText}>{formattedTime}</Text>
        </>
      );
    } else {
      return (
        <>
          <Icon
            name="phone-incoming"
            style={[styles.statusIndicator, {color: COLORS.blue1}]}
          />
          <Text style={styles.statusText}>{formattedTime}</Text>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={handleProfilePress}
        style={{flex: 5}}
        rippleColor="#fff">
        {/* rippleColor="#b8b4b4"> */}

        <View style={styles.callContainer}>
          <GroupAvatar profilePictures={profilePictures} />
          <View style={styles.callInfoContainer}>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{generatedName}</Text>
            </View>
            <View style={styles.statusContainer}>{getStatusDisplay()}</View>
          </View>
          <View
            // onPress={handleVideoPress}
            style={styles.videoIconContainer}>
            <Icon
              name="dots-horizontal-circle-outline"
              style={styles.videoIcon}
            />
          </View>
        </View>
      </TouchableRipple>
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
  callContainer: {
    flex: 6.5,
    flexDirection: 'row',
  },
  profilePictureContainer: {
    flex: 1,
    borderRadius: 35,
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
    height: 55,
  },
  callInfoContainer: {
    flex: 5,
    flexDirection: 'column',
    paddingLeft: 12,
    // borderWidth: 2,
    // borderColor: 'green',
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
  statusContainer: {
    flex: 1,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    fontSize: 21,
    marginRight: 5,
  },
  statusText: {
    color: 'black',
  },
  videoIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoIcon: {
    fontSize: 37,
    color: COLORS.blue1,
  },
});

export default CallListItem;
