import React, {useState, useEffect, useContext} from 'react';
import {View, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native';
import VideoCallButton from '../../components/buttons/videoCallButton';
import styles from './styles';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
// import {countCameras} from '../../helpers/webrtcHelperFunctions';
import socketContext from '../../context/socket/socketContext';
import {
  sendAnswer,
  sendIceCandidate,
  sendOffer,
} from '../../helpers/socketManager';
import {
  switchCamera,
  toggleCamera,
  toggleMic,
} from '../../helpers/webrtcButtons';

import userDataContext from '../../context/user/userDataContext';

const App = ({navigation, route}) => {
  // Route
  // Destructure the params from the route
  const {userId, fname, lname, disability_type, profilePictureUri, isCaller} =
    route.params;
  // States
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  // Create a new RTCPeerConnection instance
  const [peerConnection, setPeerConnection] = useState(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {urls: 'stun:stun.l.google.com:19302'},
          {urls: 'stun:stun1.l.google.com:19302'},
          {urls: 'stun:stun2.l.google.com:19302'},
          {urls: 'stun:stun4.l.google.com:19302'},
        ],
      }),
  );

  // Add event listener for iceconnectionstatechange
  peerConnection.oniceconnectionstatechange = () => {
    console.log(
      'ICE connection state changed to: ',
      peerConnection.iceConnectionState,
    );
  };
  //Context API
  const {socket, setSocket} = useContext(socketContext);
  const {userData, setUserData} = useContext(userDataContext);

  // When the component mounts
  useEffect(() => {
    // Handle the video call
    async function startVideoCall() {
      // add tracks
      await addTracksToPeerConnection(peerConnection);

      // If this user is the caller, create an offer
      if (isCaller) {
        try {
          // create an offer
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          console.log('Offer created and set as local description');
          // sending offer to the other user
          console.log('sending offer to the other client');
          let otherUserId = userId;
          let callerId = userData.Id;
          sendOffer(socket, otherUserId, callerId, offer);
        } catch (error) {
          // Handle any errors
          console.error('Error creating or setting local description:', error);
        }
      }

      // Rest of your code
      // Event listeners
      // Listen for offer from the other peer
      socket.on('offer', async data => {
        try {
          let {otherUserId, callerId, offer} = data;
          // console.log('offer Event : ' + offer);
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(offer),
          );
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          sendAnswer(socket, userData.Id, callerId, answer);
          // socket.emit('answer', {answer: pc.localDescription});
        } catch (error) {
          // Handle any errors
          console.error('Error handling offer:', error);
        }
      });

      // Listen for answer from the other peer
      socket.on('answer', data => {
        let {otherUserId, callerId, answer} = data;
        // console.log('Answer Event : ' + answer);
        peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      });

      peerConnection.ontrack = event => {
        // console.log('Set Remote Stream : ' + event.streams[0]);
        setRemoteStream(event.streams[0]);
        // Log the remote tracks
        const receivers = peerConnection.getReceivers();
        const remoteTracks = receivers.map(receiver => receiver.track);
        console.log('Remote tracks:', remoteTracks);
      };
      // Handle ICE candidates
      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          console.log('New ICE candidate received:', event.candidate);
          sendIceCandidate(socket, userId, event.candidate);
        } else {
          console.log('All ICE candidates have been sent');
        }
      };

      // Listen for ICE candidates from the other peer
      socket.on('ICEcandidate', data => {
        // console.log('_______Receiveing ICE Candidates :' + data.otherUserId);
        if (data.candidate) {
          peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      });
    }
    // Listen for hangup
    socket.on('hangup', data => {
      let {userId} = data;
      navigation.navigate('Home');
    });
    startVideoCall();
    // Cleanup function to remove event listeners
    return () => {
      // Close the peer connection
      if (peerConnection) {
        peerConnection
          .getSenders()
          .forEach(sender => peerConnection.removeTrack(sender));
        peerConnection.close();
      }

      // Stop the local media stream
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }

      // Remove all event listeners
      socket.off('offer');
      socket.off('answer');
      socket.off('ICEcandidate');
      socket.off('hangup');

      // Reset state
      setLocalStream(null);
      setRemoteStream(null);
      setPeerConnection(null);
    };
  }, [peerConnection]);
  const hangUpCall = () => {
    // Emit a 'hangup' event from the socket
    socket.emit('hangupCall', userId);
    navigation.navigate('Home');
  };
  //  functions
  async function addTracksToPeerConnection(peerConnection) {
    try {
      // console.log('_______________Once for each only __________');
      // Get the local media stream
      const localStream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      // Set local Stream
      setLocalStream(localStream);
      console.log('Adding tracks to peer connection...');

      // Log the tracks of the local stream
      // console.log('Local stream tracks:', localStream.getTracks());

      // Add tracks from the local stream to the peer connection
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });
      // Log the senders of the peer connection
      // console.log('Peer connection senders:', peerConnection.getSenders());
      const senders = peerConnection.getSenders();
      const localTracks = senders.map(sender => sender.track);
      // console.log('Local tracks:', localTracks);
    } catch (error) {
      console.error('Error adding tracks to peer connection:', error);
    }
  }
  // Other Buttons Functionality
  const [localMicOn, setLocalMicOn] = useState(true);
  const [localWebcamOn, setLocalWebcamOn] = useState(true);
  const [cameraSwitch, setCameraSwitch] = useState(true);

  const VideoOff = null;
  const MicOff = null;
  const MicOn = null;

  //! log Remote State
  useEffect(() => {
    console.log('Remote stream state changed:', remoteStream);
  }, [remoteStream]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.streamContainer}>
        {/*Remote Stream>*/}
        {remoteStream ? (
          <>
            <RTCView
              objectFit={'cover'}
              style={styles.streamView}
              streamURL={remoteStream.toURL()}
              zOrder={0}
            />
            {/* <Text style={{color: 'white', fontSize: 56}}>
        Remote Stream is active
      </Text> */}
          </>
        ) : (
          <ActivityIndicator size="large" color="#fff" style={{flex: 1}} />
        )}

        {/*Local Stream>*/}
        <View style={styles.localStreamContainer}>
          {localStream ? (
            <RTCView
              mirror={true}
              objectFit={'cover'}
              style={[styles.localStream]}
              streamURL={localStream.toURL()}
              zOrder={1}
            />
          ) : (
            <ActivityIndicator size="large" color="#fff" style={{flex: 1}} />
          )}
        </View>
        <View style={styles.iconRow}>
          <VideoCallButton
            backgroundColor="red"
            onPress={() => hangUpCall()}
            iconName="phone-hangup"
            iconSize={30}
            iconColor="#fff"
          />
          <VideoCallButton
            backgroundColor="#fff"
            onPress={() => toggleMic(localStream, localMicOn, setLocalMicOn)}
            iconName={localMicOn ? 'microphone' : 'microphone-off'}
            iconSize={30}
            iconColor="#808080"
          />
          <VideoCallButton
            backgroundColor="#fff"
            onPress={() =>
              toggleCamera(localStream, localWebcamOn, setLocalWebcamOn)
            }
            iconName={localWebcamOn ? 'video' : 'video-off'}
            iconSize={30}
            iconColor="#808080"
          />
          <VideoCallButton
            backgroundColor="#fff"
            onPress={() =>
              switchCamera(localStream, cameraSwitch, setCameraSwitch)
            }
            iconName={
              cameraSwitch ? 'camera-rear-variant' : 'camera-front-variant'
            }
            iconSize={30}
            iconColor="#808080"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
