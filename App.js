import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper'; // Import PaperProvider
import AuthNavigator from './src/navigation/authNavigator';
import SocketState from './src/context/socket/socketState';
import UserState from './src/context/user/userState';

const App = () => {
  return (
    <UserState>
      <SocketState>
        <PaperProvider>
          <NavigationContainer>
            {/* AuthNavigator for authentication screens */}
            <AuthNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SocketState>
    </UserState>
  );
};

export default App;
