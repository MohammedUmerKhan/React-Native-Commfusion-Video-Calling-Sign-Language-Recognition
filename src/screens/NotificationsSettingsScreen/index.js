import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import COLORS from '../../constants/colors';
import CustomButton from '../../components/buttons/customButton';

import {updateUserSettings} from '../../helpers/apiHelper';
import DialogWithLoadingIndicator from '../../components/modal/dialogWithLoadingIndicator ';

const App = ({navigation, route}) => {
  // DialogWithLoadingIndicator
  const [progressMessage, setProgressMessage] = useState(
    'Please wait while we update your profile settings',
  );
  const [dialogVisibility, setDialogVisibility] = useState(false);
  // Destructure the params from the route
  const {
    Notifications,
    Ringtone,
    TranscriptionColor,
    TranscriptionFontSize,
    TranscriptionOpacity,
  } = route.params;

  // Now you can use these variables directly
  // console.log(
  //   Notifications,
  //   Ringtone,
  //   TranscriptionColor,
  //   TranscriptionFontSize,
  //   TranscriptionOpacity,
  // );
  const [isEnabled, setIsEnabled] = useState(
    Notifications === 'Enabled' ? true : false,
  );
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [selectedRingtone, setSelectedRingtone] = useState(Ringtone);

  const handleSaveSettings = async () => {
    setDialogVisibility(true);
    let settings = {
      Notifications: isEnabled ? 'Enabled' : 'Disabled',
      Ringtone: selectedRingtone,
    };
    // Call the updateUserSettings function with await
    const updatedSettings = await updateUserSettings(settings);
    setDialogVisibility(false);
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
                borderBottomWidth: 4,
                borderBottomColor: '#efeff0',
              }}>
              <View style={{flex: 1.9}}>
                <Text style={{fontSize: 18, color: 'black'}}>
                  Notifications Sound
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
            <View
              style={{
                padding: 15,
                borderBottomWidth: 4,
                borderBottomColor: '#efeff0',
              }}>
              <Picker
                style={{}}
                selectedValue={selectedRingtone}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedRingtone(itemValue)
                }>
                <Picker.Item label="Marimba" value="Marimba" />
                <Picker.Item label="Opening" value="Opening" />
                <Picker.Item label="Reflection" value="Reflection" />
                <Picker.Item label="Xylophone" value="Xylophone" />
              </Picker>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <CustomButton
              onPress={handleSaveSettings}
              buttonBackgroundColor="#20A0F0"
              textColor="white"
              borderColor="#20A0F0"
              borderWidth={4}
              buttonText="Save"
              buttonWidth="85%"
            />
          </View>
        </ScrollView>
      </View>

      <DialogWithLoadingIndicator
        visible={dialogVisibility}
        title="Updating Settings"
        message={progressMessage}
      />
    </SafeAreaView>
  );
};

export default App;
