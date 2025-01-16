import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './styles';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomInput from '../../components/input/customInput';
import CustomButton from '../../components/buttons/customButton';
import ProfilePictureUploader from '../../components/input/profilePictureUploader';
import UserProfileItem from '../../components/userProfileItem/userProfileItem';
import SettingItem from '../../components/settingItem/settingItem';

const App = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              borderBottomWidth: 4,
              borderBottomColor: '#efeff0',
            }}>
            <View style={{flex: 1.9}}>
              <Text style={{fontSize: 22}}>Current Version</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 22}}> 0.0.1</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;
