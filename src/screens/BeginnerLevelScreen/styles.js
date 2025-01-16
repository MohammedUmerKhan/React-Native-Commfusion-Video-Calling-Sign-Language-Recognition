// styles.js
import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    backgroundColor: '#e0dbdb',
    borderRadius: 30,
    height: 10,
    width: '70%',
  },
});
