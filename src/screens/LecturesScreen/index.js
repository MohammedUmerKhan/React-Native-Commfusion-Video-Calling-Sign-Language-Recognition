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
      <ScrollView>
        <LectureLevelButton
          imageUri="https://reactnative.dev/img/tiny_logo.png"
          buttonText="Favourite Signs"
          backgroundColor="aquamarine"
          navigation={navigation} // pass your navigation object here
          screenName="Favourite Signs"
        />
        <View style={styles.centercontainer}>
          <View style={styles.separator} />
        </View>
        <LectureLevelButton
          imageUri="https://reactnative.dev/img/tiny_logo.png"
          buttonText="Beginner"
          backgroundColor="pink"
          navigation={navigation} // pass your navigation object here
          screenName="Beginner Level"
        />
        <LectureLevelButton
          imageUri="https://reactnative.dev/img/tiny_logo.png"
          buttonText="Intermediate"
          backgroundColor="bisque"
          navigation={navigation} // pass your navigation object here
          screenName="Intermediate Level"
        />
        <LectureLevelButton
          imageUri="https://reactnative.dev/img/tiny_logo.png"
          buttonText="Expert"
          backgroundColor="lightskyblue"
          navigation={navigation} // pass your navigation object here
          screenName="Expert Level"
        />
        <LectureLevelButton
          imageUri="https://reactnative.dev/img/tiny_logo.png"
          buttonText="Custom Gesture"
          backgroundColor="plum"
          navigation={navigation} // pass your navigation object here
          screenName="Custom Gesture"
        />
        <View style={styles.centercontainer}>
          <CustomButton
            onPress={() => {
              navigation.navigate('Add Custom Gesture');
            }}
            buttonBackgroundColor="#20A0F0"
            textColor="white"
            borderColor="#20A0F0"
            borderWidth={4}
            buttonText="Add Custom Gesture"
            buttonWidth="85%"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
