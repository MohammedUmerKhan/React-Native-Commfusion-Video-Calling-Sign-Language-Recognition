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
  login_title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.blue1,
  },
  below_login: {
    fontSize: 15,
    color: 'grey',
    marginBottom: 34,
  },
  text_signup: {
    marginTop: 23,
  },
  signup: {
    color: COLORS.blue1,
  },
  error: {
    color: 'red',
    marginTop: 23,
  },
});
