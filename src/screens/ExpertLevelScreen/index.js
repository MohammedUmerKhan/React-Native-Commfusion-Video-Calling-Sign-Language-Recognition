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

const App = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
};

export default App;
