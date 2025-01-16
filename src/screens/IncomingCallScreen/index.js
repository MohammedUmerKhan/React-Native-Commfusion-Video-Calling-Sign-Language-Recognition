import React, {useContext, useEffect} from 'react';
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
import instance from '../../constants/axiosInstance';
import {Avatar, IconButton} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {getInitials, getRandomColor} from '../../helpers/utils';
import styles from './styles';
import InCallManager from 'react-native-incall-manager';
import userDataContext from '../../context/user/userDataContext';
import socketContext from '../../context/socket/socketContext';
import {sendRingResponse} from '../../helpers/socketManager';
const App = ({navigation, route}) => {
  const {calleeId, callerData} = route.params;
  const {Id, disability_type, fname, lname, profile_picture} = callerData;
  profilePictureUri = `${instance.defaults.baseURL}profile_pictures/${profile_picture}`;

  // Get initials if profilePictureUri is empty
  const initials = !profile_picture ? getInitials(fname, lname) : null;
  useEffect(() => {
    console.log(
      'Incoming Call : ',
      Id,
      disability_type,
      fname,
      lname,
      profile_picture,
    );
    socket.on('endRinging', handleEndRinging);
    InCallManager.start({
      media: 'video',
      ringback: '_BUNDLE_',
    });

    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);

    return () => {
      InCallManager.stop({busytone: '_DTMF_'});
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  // Reject call
  const hangupCall = () => {
    sendRingResponse(socket, 'reject', 'None', callerData.Id);
    //
    InCallManager.stop({busytone: '_DTMF_'});
    setTimeout(() => {
      navigation.goBack();
    }, 2000); // 2 seconds
  };
  // Accept call
  const acceptCall = () => {
    sendRingResponse(socket, 'accept', userData, callerData.Id);
    InCallManager.stop();
    const isCaller = false;
    let userId = Id;
    navigation.navigate('VideoCall', {
      userId,
      fname,
      lname,
      disability_type,
      profilePictureUri,
      isCaller,
    });
  };

  //Context
  const {userData, setUserData} = useContext(userDataContext);
  const {socket, setSocket} = useContext(socketContext);

  // For handling caller end ringing
  const handleEndRinging = () => {
    socket.off('endRinging', handleEndRinging);
    InCallManager.stop();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/images/extra/background.png')}>
        <View style={styles.callerInfoContainer}>
          <View style={styles.avatarContainer}>
            {!profile_picture ? ( // If profile picture is empty, render Avatar.Text
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
          <Text style={styles.callerNameText}>{fname + ' ' + lname}</Text>
          <Text style={styles.callInfoText}>CommFusion video call</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.hangupButtonContainer}>
            <TouchableOpacity onPress={hangupCall} style={styles.hangupButton}>
              <Icon name="phone-hangup" style={styles.iconHangup} />
            </TouchableOpacity>
          </View>
          <View style={styles.acceptButtonContainer}>
            <TouchableOpacity onPress={acceptCall} style={styles.acceptButton}>
              {/* Assuming CallAnswer is a custom component */}
              <Icon name="phone-in-talk" style={styles.iconAccept} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;
