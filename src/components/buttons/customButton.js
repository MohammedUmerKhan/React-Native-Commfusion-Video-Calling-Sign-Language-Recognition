import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const CustomButton = ({
  onPress,
  buttonBackgroundColor = '#20A0F0',
  textColor = 'white',
  borderColor = '#20A0F0',
  borderWidth = 4,
  buttonText = 'Login',
  buttonWidth = '80%',
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: buttonBackgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
          width: buttonWidth,
        },
      ]}
      onPress={onPress}>
      <Text style={[styles.buttonText, {color: textColor}]}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 25, // This makes the button rounded
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 22,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default CustomButton;
