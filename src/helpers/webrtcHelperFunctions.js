// webrtcHelperFunctions.js

import {mediaDevices} from 'react-native-webrtc';

let cameraCount = 0;

const countCameras = async () => {
  try {
    const devices = await mediaDevices.enumerateDevices();

    devices.map(device => {
      if (device.kind !== 'videoinput') {
        return;
      }

      cameraCount = cameraCount + 1;
    });
  } catch (err) {
    // Handle Error
  }

  return cameraCount;
};

export {countCameras};
