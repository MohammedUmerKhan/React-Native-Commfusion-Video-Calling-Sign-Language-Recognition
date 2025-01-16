/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import App from './src/screens/TestingScreens/skeletontest';

// import {Provider} from 'react-redux';
// import store from './src/components/redux/store/store';
// const AppReduxWrapper = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

if (__DEV__) {
  require('./ReactotronConfig');
}
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
