import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CustomInput = ({
  placeholder = 'Enter information',
  iconName = 'default',
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View>
      <View
        style={[
          styles.container,
          {borderColor: error ? 'red' : isFocused ? COLORS.blue1 : 'black'},
          {borderWidth: error ? 3 : isFocused ? 3 : 1},
        ]}>
        <Icon name={iconName} style={styles.icon} />
        <TextInput
          secureTextEntry={hidePassword}
          placeholder={placeholder}
          style={styles.text_input}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}></TextInput>
        {password && (
          <Icon
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={styles.iconEye}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'light',
    backgroundColor: '#ebf5fc',
  },
  text_input: {
    flex: 1,
    borderRadius: 50,
    height: 60,
    fontSize: 18,
    // borderWidth: 1,
    color: 'black',
    width: '85%',
    paddingLeft: 15,
  },
  icon: {
    fontSize: 40,
    color: COLORS.blue1,
    marginLeft: 11,
  },
  error: {
    color: 'red',
    marginLeft: 30,
  },
  iconEye: {
    fontSize: 30,
    marginRight: 10,
  },
});

export default CustomInput;
