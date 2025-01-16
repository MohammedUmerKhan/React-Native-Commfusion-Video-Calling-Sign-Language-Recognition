import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const App = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Image
          source={require('../../assets/images/extra/a.gif')}
          style={styles.gif}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.text}>Your Text Here</Text>
      <Text style={styles.title}>Your Title Here</Text>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.playPauseButton}>
          <Icon name="play" style={{fontSize: 44, color: 'white'}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
