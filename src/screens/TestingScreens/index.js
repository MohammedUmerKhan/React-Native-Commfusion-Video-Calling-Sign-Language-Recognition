import React from 'react';
import {View, Button, Text} from 'react-native';

import {Avatar, IconButton} from 'react-native-paper';
const App = () => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'green',
        // backgroundColor: 'red',
      }}>
      <View
        style={{borderColor: 'yellow', borderWidth: 3, flex: 1, width: '100%'}}>
        <View style={{borderWidth: 2, alignItems: 'center'}}>
          <Avatar.Image
            style={{backgroundColor: '#fff'}}
            source={require('../../assets/images/extra/profile-icon.png')}
            size={80}
          />
        </View>
        <View style={{borderWidth: 2, alignItems: 'center'}}>
          <Text style={{fontSize: 24, fontWeight: '600'}}>Username Here</Text>
        </View>
        <View style={{borderWidth: 2, alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '400'}}>
            User Status will be displayed here
          </Text>
        </View>
        <View
          style={{
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              borderWidth: 2,
              alignItems: 'center',
              flex: 1,
            }}>
            <IconButton icon="account-cancel" size={40} onPress={() => {}} />
          </View>
          <View style={{borderWidth: 2, alignItems: 'center', flex: 1}}>
            <IconButton icon="video" size={40} onPress={() => {}} />
          </View>
        </View>
        <View
          style={{
            borderWidth: 2,
            alignItems: 'center',
            flexDirection: 'row',
            borderColor: 'cyan',
            padding: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: '600'}}>
            Accessibility Needs:
          </Text>
          <Text style={{fontSize: 20}}>
            Accessibility needs like deaf will come here
          </Text>
        </View>
      </View>
    </View>
  );
};

export default App;
