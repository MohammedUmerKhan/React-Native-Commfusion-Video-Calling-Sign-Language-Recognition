// App.js
import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import COLORS from '../../constants/colors';
import Header from '../../components/header/header';
import LectureLevelButton from '../../components/lectureLevelButton/lectureLevelButton';
import CustomButton from '../../components/buttons/customButton';
import CustomSignButton from '../../components/buttons/customSignButton';

const App = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView>
        <CustomSignButton
          title="In Process"
          description="Mohammed Umer Khan"
          icon="timer-sand"
          buttonColor="#fbffde"
          navigation={navigation}
          screenName="Play"
        />
        <CustomSignButton
          title="Rejected"
          description="it's amazing"
          icon="progress-close"
          buttonColor="#ffc4f4"
          navigation={navigation}
          screenName="Play"
        />
      </ScrollView>
    </SafeAreaView>
  );
};
// checkbox-marked-circle-auto-outline
export default App;
