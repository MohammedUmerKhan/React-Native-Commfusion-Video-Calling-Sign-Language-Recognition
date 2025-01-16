import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import COLORS from '../../constants/colors';

const SettingsTextInput = ({
  title,
  placeholder,
  value,
  error,
  onChangeText,
  isPassword,
  onFocus = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <View
        style={[
          styles.container,
          {borderColor: error ? 'red' : isFocused ? COLORS.blue1 : 'black'},
          {borderWidth: error ? 3 : isFocused ? 3 : 1},
        ]}>
        <Text style={styles.placeholder}>{title}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={isPassword} // Use secureTextEntry prop for password input
            onFocus={() => {
              onFocus();
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 40,
    backgroundColor: '#eceaea',
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  placeholder: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 1,
  },
  inputContainer: {},
  input: {
    fontSize: 16,
    color: 'black',
  },
  error: {
    color: 'red',
    marginLeft: 55,
  },
});

export default SettingsTextInput;
