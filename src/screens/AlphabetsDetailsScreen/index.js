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
          <AlphabetButton
            title="Alphabet"
            description="A"
            buttonColor="#fbffde"
            navigation={navigation}
            screenName="Play"
          />
          <AlphabetButton
            title="Alphabet"
            description="B"
            buttonColor="#ffc4f4"
            navigation={navigation}
            screenName="Play"
          />
          <AlphabetButton
            title="Alphabet"
            description="C"
            buttonColor="#5dff9b"
            navigation={navigation}
            screenName="Play"
          />
          {/* Add calls for other alphabets and space */}
          <AlphabetButton
            title="Alphabet"
            description="Z"
            buttonColor="#b2d8ff"
            navigation={navigation}
            screenName="Play"
          />
          <AlphabetButton
            title="Space"
            description=""
            buttonColor="#fdd1d1"
            navigation={navigation}
            screenName="Play"
          />
          <AlphabetButton
            title="Nothing"
            description=""
            buttonColor="#f5ffd2"
            navigation={navigation}
            screenName="Play"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
