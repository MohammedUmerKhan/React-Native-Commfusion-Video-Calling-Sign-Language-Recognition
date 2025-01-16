import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export default styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    //    backgroundColor: 'grey',
    paddingTop: 50,
  },
  profile_title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.blue1,
  },
  below_profile: {
    fontSize: 15,
    color: 'grey',
  },
  chip: {
    marginTop: 10,
    borderRadius: 34,
    backgroundColor: '#d6ecfd',
  },
});
