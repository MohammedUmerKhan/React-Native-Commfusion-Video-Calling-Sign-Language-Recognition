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
import AlphabetButton from '../../components/buttons/alphabetButton';
import LectureLevelButton from '../../components/lectureLevelButton/lectureLevelButton';
import WordsButton from '../../components/buttons/wordsButton';

const App = ({navigation}) => {
  const handlePress = () => {
    // Handle button press here
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView>
        <View style={styles.container}>
          <WordsButton
            title="Phrase"
            description="How are you"
            buttonColor={'#e7abff'} // Custom button color
            navigation={navigation}
            screenName="Play" // Adjust the screen name as needed
          />
          <WordsButton
            title="Phrase"
            description="I'm fine"
            buttonColor={'#ffabca'} // Custom button color
            navigation={navigation}
            screenName="Play" // Adjust the screen name as needed
          />
          <WordsButton
            title="Phrase"
            description="Where are you from?"
            buttonColor={'#abf2ff'} // Custom button color
            navigation={navigation}
            screenName="Play" // Adjust the screen name as needed
          />
          <WordsButton
            title="Phrase"
            description="I am sorry"
            buttonColor={'#abc8ff'} // Custom button color
            navigation={navigation}
            screenName="Play" // Adjust the screen name as needed
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
