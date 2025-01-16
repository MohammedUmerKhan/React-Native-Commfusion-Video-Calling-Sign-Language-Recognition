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
  },
  text_signup: {
    marginTop: 23,
  },
  signup: {
    color: COLORS.blue1,
  },
  pickerContainer: {
    borderRadius: 50, // Adjust this value to change the roundness
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    alignItems: 'center',
    height: 60,
    padding: 0,
    width: '85%',
    backgroundColor: '#ebf5fc',
    flexDirection: 'row',
    marginTop: 30,
  },

  picker: {
    height: 50, // Adjust the height as needed
    width: '85%', // Make sure it spans the entire width
    backgroundColor: '#ebf5fc', // Set background color
    borderWidth: 3, // Add border for clarity
    fontSize: 18,
  },
  iconPicker: {
    fontSize: 40,
    color: COLORS.blue1,
    marginLeft: 11,
  },
  error: {
    color: 'red',
  },
});
