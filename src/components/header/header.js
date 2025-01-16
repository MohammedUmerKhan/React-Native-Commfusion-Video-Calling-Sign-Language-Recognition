import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({navigation, isHome, title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          {isHome ? (
            <Text style={styles.title}>
              <Text style={[styles.titleText, {color: '#3498db'}]}>Comm</Text>
              <Text style={styles.titleText}>Fusion</Text>
            </Text>
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search Contacts')}>
            <Icon name="magnify" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Add Contact');
            }}>
            <Icon name="account-plus" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            <Icon name="cog" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 35,
    paddingRight: 8,
  },
});

export default Header;
