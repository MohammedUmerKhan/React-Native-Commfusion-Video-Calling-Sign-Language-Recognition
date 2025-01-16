import {getUserData} from './asyncHelpers';
import {NODE_SERVER_URI} from '../constants/contantsServer';

import {io} from 'socket.io-client';
import {useNavigation} from '@react-navigation/native';

// let clientSocket;
let socketPath = '/socket.io';
// Event handlers
const establishConnection = userId => {
  console.log(userId);
  console.log(NODE_SERVER_URI);
  try {
    clientSocket = io(NODE_SERVER_URI, {
      path: socketPath,
      transports: ['websocket'],
      query: {
        query: userId,
      },
      //   reconnectionDelay: 1000, // wait 1 second before attempting to reconnect
      //   reconnectionAttempts: 5, // attempt to reconnect up to 5 times
    });

    clientSocket.on('connect', () => {
      console.log('Connected to socket server');
    });
    clientSocket.on('connect_error', () => {
      console.log('Socket server is offline');
    });
    clientSocket.on('newCall', data => {
      console.log('New call from', data.callerId);
    });

    clientSocket.on('callAnswered', data => {
      console.log('Call answered by', data.callee);
    });

    clientSocket.on('ICEcandidate', data => {
      console.log('ICE candidate from', data.sender);
    });
  } catch (error) {
    console.error('Error connecting to socket server:', error);
  }
  return clientSocket; // <--- Add this line
};

const connectToSocketServer = async () => {
  try {
    const userData = await getUserData(); // Retrieve user data
    const userId = userData.Id; // Get the user ID from user data
    const clientSocket = establishConnection(userId); // Establish connection to socket server
    return clientSocket;
  } catch (error) {
    console.error('Error connecting to socket server:', error);
  }
};

// sends event so server
const initiateRingOnly = (clientSocket, calleeId, callerData) => {
  try {
    clientSocket.emit('ringOnly', {calleeId: calleeId, callerData: callerData});
  } catch (error) {
    console.error('Error initiating ring only:', error);
  }
};

const sendRingResponse = (clientSocket, response, userData, callerId) => {
  try {
    clientSocket.emit('ringResponse', {
      response: response,
      userData: userData,
      callerId: callerId,
    });
  } catch (error) {
    console.error('Error sending ring response:', error);
  }
};
// caller ended ringing
const endRinging = (clientSocket, callerId, calleeId) => {
  try {
    clientSocket.emit('endRinging', {callerId: callerId, calleeId: calleeId});
  } catch (error) {
    console.error('Error ending ringing:', error);
  }
};
const sendOffer = (clientSocket, otherUserId, callerId, offer) => {
  try {
    clientSocket.emit('offer', {
      otherUserId,
      callerId,
      offer,
    });
  } catch (error) {
    console.error('Error making call:', error);
  }
};

const sendAnswer = (clientSocket, otherUserId, callerId, answer) => {
  try {
    clientSocket.emit('answer', {
      otherUserId,
      callerId,
      answer,
    });
  } catch (error) {
    console.error('Error answering call:', error);
  }
};

const sendIceCandidate = (clientSocket, otherUserId, candidate) => {
  try {
    clientSocket.emit('ICEcandidate', {
      otherUserId,
      candidate,
    });
  } catch (error) {
    console.error('Error sending ICE candidate:', error);
  }
};

const terminateConnection = clientSocket => {
  try {
    clientSocket.disconnect();
  } catch (error) {
    console.error('Error disconnecting from socket server:', error);
  }
};

export {
  establishConnection,
  initiateRingOnly, // Export the new method
  sendRingResponse,
  sendOffer,
  sendAnswer,
  endRinging,
  sendIceCandidate,
  terminateConnection,
  connectToSocketServer,
};

//adding and removing event handlers
// clientSocket.off('eventName', handlerFunction);
// clientSocket.on('newEvent', (data) => {
//   console.log('New event received:', data);
// });
