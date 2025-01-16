import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingItem = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Icon name="chevron-right" style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#C7C7C7',
    borderRadius: 30,
    backgroundColor: '#E5E4E2',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingVertical: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
  },
  arrowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  arrowIcon: {
    fontSize: 30,
  },
});

export default SettingItem;
