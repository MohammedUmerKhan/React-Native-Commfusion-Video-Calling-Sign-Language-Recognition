import {
  CREATE_PEER_CONNECTION,
  ADD_STREAM,
  REMOVE_STREAM,
  SET_LOCAL_DESCRIPTION,
  SET_REMOTE_DESCRIPTION,
  SET_ICE_CANDIDATE,
} from '../actions/webrtcActions';

const initialState = {
  peerConnection: null,
  streams: [],
  localDescription: null,
  remoteDescription: null,
  iceCandidates: [],
};

export default function webrtcReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PEER_CONNECTION:
      return {...state, peerConnection: action.peerConnection};
    case ADD_STREAM:
      return {...state, streams: [...state.streams, action.stream]};
    case REMOVE_STREAM:
      return {...state, streams: []};
    case SET_LOCAL_DESCRIPTION:
      return {...state, localDescription: action.description};
    case SET_REMOTE_DESCRIPTION:
      return {...state, remoteDescription: action.description};
    case SET_ICE_CANDIDATE:
      return {
        ...state,
        iceCandidates: [...state.iceCandidates, action.candidate],
      };
    default:
      return state;
  }
}
