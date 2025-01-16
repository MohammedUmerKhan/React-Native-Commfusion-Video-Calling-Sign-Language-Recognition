// AlphabetButton.js
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const AlphabetButton = ({
  title,
  description,
  buttonColor,
  navigation,
  screenName,
}) => {
  const handlePress = () => {
    // Handle button press here
    navigation.navigate('Play Gesture');
  };

  return (
    <View style={[styles.container, {backgroundColor: buttonColor}]}>
      <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Icon name="play-circle-outline" style={styles.playButton} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 140,
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 30,
    borderWidth: 5,
    borderColor: '#ededed',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Adjust padding as needed
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
    textAlign: 'center', // Center the text horizontally
    color: '#6c7b83',
  },
  description: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 5,
    textAlign: 'center', // Center the text horizontally
    color: '#6d6d6d',
  },
  playButton: {
    fontSize: 50,
    color: COLORS.white,
    color: '#6d6d6d',
  },
});

export default AlphabetButton;
