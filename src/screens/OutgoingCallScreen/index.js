import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, IconButton} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {getInitials, getRandomColor} from '../../helpers/utils';
import styles from './styles';
import {processCall} from '../../helpers/callManager';
import InCallManager from 'react-native-incall-manager'; // Import InCallManager
import {
  endRinging,
  initiateCall,
  initiateRingOnly,
} from '../../helpers/socketManager';
import socketContext from '../../context/socket/socketContext';
import userDataContext from '../../context/user/userDataContext';
const App = ({navigation, route}) => {
  // Get Context
  const {socket, setSocket} = useContext(socketContext);
  const {userData, setUserData} = useContext(userDataContext);

  // Destructure the params from the route
  const {
    userId,
    fname,
    lname,
    username,
    disability_type,
    profilePictureUri,
    userStatus,
    isOnline,
  } = route.params;
  const [isRinging, setIsRinging] = useState(false);
  const [callInfo, setCallInfo] = useState('Ringing');
  // Get initials if profilePictureUri is empty
  const initials = !profilePictureUri ? getInitials(fname, lname) : null;
  // For Ringing other client
  const handleClientOffline = data => {
    console.log('Ringing event received:', data);
    handleEndCall(data);
  };
  // callee accepted or rejected call
  const handleCallResponse = data => {
    const {response, userData, callerId} = data;
    if (response == 'accept') {
      //navigate to video call screen
      InCallManager.stop();
      socket.off('response', handleCallResponse);
      socket.off('clientOffline', handleClientOffline);
      const isCaller = true;
      navigation.navigate('VideoCall', {
        userId,
        fname,
        lname,
        disability_type,
        profilePictureUri,
        isCaller,
      });
    } else if (response == 'reject') {
      //reject call
      handleEndCall('Rejected');
    }
  };

  // handle calling function
  useEffect(() => {
    console.log('Outgoing Call : ' + profilePictureUri);
    socket.on('clientOffline', handleClientOffline);
    socket.on('response', handleCallResponse);

    // ring respose ringResponse
    let callerData = {
      Id: userData.Id,
      disability_type: userData.disability_type,
      fname: userData.fname,
      lname: userData.lname,
      profile_picture: userData.profile_picture,
    };
    // console.log(callerData);
    initiateRingOnly(socket, userId, callerData);
    InCallManager.start({
      media: 'video',
      // ringback: require('../../assets/ringtones/dial.mp3'),
      ringback: '_BUNDLE_',
    });

    console.log(userData);
    console.log('________________');
    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);
    // InCallManager.setKeepScreenOn(true);
    // InCallManager.setForceSpeakerphoneOn(true);
    //initiateRingOnly(userId);
    return () => {
      InCallManager.stop();
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  //handle end call
  const handleEndCall = info => {
    setCallInfo(info);
    socket.off('response', handleCallResponse);
    socket.off('clientOffline', handleClientOffline);
    InCallManager.stop({busytone: '_DTMF_'});
    setTimeout(() => {
      navigation.goBack();
    }, 2000); // 2 seconds
  };
  const handleEndRinging = info => {
    setCallInfo(info);
    endRinging(socket, userData.Id, userId);
    socket.off('response', handleCallResponse);
    socket.off('clientOffline', handleClientOffline);
    InCallManager.stop({busytone: '_DTMF_'});
    setTimeout(() => {
      navigation.goBack();
    }, 2000); // 2 seconds
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/images/extra/background.png')}>
        <View style={styles.callInfoContainer}>
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
          <Text style={styles.otherUserId}>{fname + ' ' + lname}</Text>
          <Text style={styles.callingText}>{callInfo}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleEndRinging('Call ended')}
            style={styles.endCallButton}>
            <Icon name="phone-hangup" style={styles.iconHangup} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;
