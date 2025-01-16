import {combineReducers} from 'redux';
import webrtcReducer from './webrtcReducer';
// import anotherReducer from './anotherReducer'; // Add other reducers as needed

const rootReducer = combineReducers({
  webrtc: webrtcReducer,
  //   another: anotherReducer,
});

export default rootReducer;
