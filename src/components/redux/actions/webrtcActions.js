export const CREATE_PEER_CONNECTION = 'CREATE_PEER_CONNECTION';
export const ADD_STREAM = 'ADD_STREAM';
export const REMOVE_STREAM = 'REMOVE_STREAM';
export const SET_LOCAL_DESCRIPTION = 'SET_LOCAL_DESCRIPTION';
export const SET_REMOTE_DESCRIPTION = 'SET_REMOTE_DESCRIPTION';
export const SET_ICE_CANDIDATE = 'SET_ICE_CANDIDATE';

export function createPeerConnection(peerConnection) {
  return {type: CREATE_PEER_CONNECTION, peerConnection};
}

export function addStream(stream) {
  return {type: ADD_STREAM, stream};
}

export function removeStream() {
  return {type: REMOVE_STREAM};
}

export function setLocalDescription(description) {
  return {type: SET_LOCAL_DESCRIPTION, description};
}

export function setRemoteDescription(description) {
  return {type: SET_REMOTE_DESCRIPTION, description};
}

export function setIceCandidate(candidate) {
  return {type: SET_ICE_CANDIDATE, candidate};
}
