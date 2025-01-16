// CustomSignButton.js
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const CustomSignButton = ({
  title,
  description,
  icon,
  buttonColor,
  navigation,
  screenName,
}) => {
  const handlePress = () => {
    // Handle button press here
    // navigation.navigate(screenName);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, {backgroundColor: buttonColor}]}>
      <View style={styles.buttonContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Icon name={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#ededed',
    backgroundColor: COLORS.blue1, // Default button color
    width: '85%',
    height: 80,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6c7b83', // Custom color
    marginRight: 10,
  },
  description: {
    fontSize: 14,
    color: '#6d6d6d', // Custom color
  },
  icon: {
    fontSize: 30,
    color: '#6d6d6d', // Custom color
  },
});

export default CustomSignButton;
