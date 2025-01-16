import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export default styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  textContainer: {},
  text: {
    fontSize: 25,
    fontWeight: '400',
    color: 'black',
  },
  iconContainer: {},
  icon: {
    fontSize: 40,
  },
});
