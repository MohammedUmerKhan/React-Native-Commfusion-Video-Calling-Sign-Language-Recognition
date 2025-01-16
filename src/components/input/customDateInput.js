import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDateInput = ({
  placeholder = 'Select Date',
  iconName = 'calendar',
  value,
  error,
  onFocus = () => {},
  onPress = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{width: '100%'}}>
        <View
          style={[
            styles.container,
            {borderColor: error ? 'red' : isFocused ? COLORS.blue1 : 'black'},
            {borderWidth: error ? 3 : isFocused ? 3 : 1},
          ]}>
          <Icon name={iconName} style={styles.icon} />
          <TextInput
            placeholder={placeholder}
            style={styles.text_input}
            value={value}
            onFocus={() => {
              onFocus();
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            {...props}
            editable={false} // Disable editing for date input
          />
        </View>
      </TouchableOpacity>
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
    color: 'black',
    paddingLeft: 15,
  },
  icon: {
    fontSize: 30,
    color: COLORS.blue1,
    marginLeft: 15,
    marginRight: 10,
  },
  error: {
    color: 'red',
    marginLeft: 30,
  },
});

export default CustomDateInput;
