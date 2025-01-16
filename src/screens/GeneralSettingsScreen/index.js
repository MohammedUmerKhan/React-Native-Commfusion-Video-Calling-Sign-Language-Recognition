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
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import COLORS from '../../constants/colors';

import CustomModal from '../../components/modal/customModal';
import CustomButton from '../../components/buttons/customButton';
import DialogWithLoadingIndicator from '../../components/modal/dialogWithLoadingIndicator ';
import {updateUserSettings} from '../../helpers/apiHelper';

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
  const [selectedFontSize, setSelectedFontSize] = useState(
    TranscriptionFontSize,
  );
  const [selectedFontColor, setSelectedFontColor] =
    useState(TranscriptionColor);
  let convertedO = parseInt(TranscriptionOpacity);
  const [opacityValue, setOpacityValue] = useState(convertedO);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSaveSettings = async () => {
    setDialogVisibility(true);
    let settings = {
      TranscriptionColor: selectedFontColor,
      TranscriptionFontSize: selectedFontSize,
      TranscriptionOpacity: opacityValue.toString(),
    };
    // Call the updateUserSettings function with await
    const updatedSettings = await updateUserSettings(settings);
    setDialogVisibility(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.sectionContainer}>
              <Text style={styles.labelText}>Font Size</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={{backgroundColor: '#f7f2f2'}}
                  selectedValue={selectedFontSize}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedFontSize(itemValue)
                  }
                  mode="dropdown"
                  itemStyle={{paddingLeft: 30, paddingRight: 0}} // Adjust padding as needed
                >
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="21" value="21" />
                  <Picker.Item label="22" value="22" />
                  <Picker.Item label="23" value="23" />
                  <Picker.Item label="24" value="24" />
                  <Picker.Item label="25" value="25" />
                </Picker>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.labelText}>Font Color</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={{backgroundColor: '#f7f2f2'}}
                  selectedValue={selectedFontColor}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedFontColor(itemValue)
                  }
                  mode="dropdown"
                  itemStyle={{paddingLeft: 30, paddingRight: 0}} // Adjust padding as needed
                >
                  <Picker.Item label="Black" value="black" />
                  <Picker.Item label="White" value="white" />
                  <Picker.Item label="Red" value="red" />
                  <Picker.Item label="Green" value="green" />
                  <Picker.Item label="Blue" value="blue" />
                  <Picker.Item label="Yellow" value="yellow" />
                </Picker>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.labelText}>Opacity</Text>
              <View style={styles.sliderContainer}>
                <Slider
                  style={{width: 200, height: 40, marginBottom: -13}}
                  minimumValue={0}
                  maximumValue={10}
                  step={1} // Specify the step interval
                  minimumTrackTintColor="#007AFF"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#007AFF"
                  onValueChange={newValue => {
                    setOpacityValue(newValue);
                    // console.log('Slider value changed to:', newValue);
                  }}
                  value={opacityValue}
                />
                <Text>Value: {opacityValue}</Text>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.labelText}>Delete Account</Text>
              <View style={styles.deleteIconContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Icon
                    name={'account-remove-outline'}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
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
          </View>
          <CustomModal
            visible={modalVisible}
            message="Are you sure you want to delete your account?"
            destinationScreen="Login" // Adjust this according to your navigation setup
            onClose={closeModal}
          />
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
