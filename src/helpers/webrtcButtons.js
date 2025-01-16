// webrtcButtons.js

// Switches the camera
export function switchCamera(localStream, cameraSwitch, setCameraSwitch) {
  localStream.getVideoTracks().forEach(track => {
    if (typeof track._switchCamera === 'function') {
      track._switchCamera();
      setCameraSwitch(!cameraSwitch);
    }
  });
}

// Toggles the camera on and off
export function toggleCamera(localStream, localWebcamOn, setLocalWebcamOn) {
  const webcamState = !localWebcamOn;
  setLocalWebcamOn(webcamState);
  localStream.getVideoTracks().forEach(track => {
    track.enabled = webcamState;
  });
}

// Toggles the microphone on and off
export function toggleMic(localStream, localMicOn, setLocalMicOn) {
  const micState = !localMicOn;
  setLocalMicOn(micState);
  localStream.getAudioTracks().forEach(track => {
    track.enabled = micState;
  });
}
