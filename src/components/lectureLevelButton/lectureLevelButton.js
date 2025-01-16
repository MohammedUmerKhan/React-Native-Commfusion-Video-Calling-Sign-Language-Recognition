import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';

const LectureLevelButton = ({
  imageUri,
  buttonText,
  backgroundColor,
  navigation,
  screenName,
}) => {
  const handlePress = () => {
    navigation.navigate(screenName); // Use screenName prop to navigate
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.button, {backgroundColor: backgroundColor}]}>
        <View
          style={[styles.imageContainer, {backgroundColor: backgroundColor}]}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </View>
        <View
          style={[styles.textContainer, {backgroundColor: backgroundColor}]}>
          <Text style={styles.text}>{buttonText}</Text>
        </View>
        <View
          style={[styles.iconContainer, {backgroundColor: backgroundColor}]}>
          <Icon name="play-circle-outline" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 2,
    borderRadius: 40,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '700',
    color: 'black',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 60,
    color: COLORS.white,
  },
});

export default LectureLevelButton;
