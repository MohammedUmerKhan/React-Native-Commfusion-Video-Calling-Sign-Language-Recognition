import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export default styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomWidth: 4,
    borderBottomColor: '#efeff0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 18,
    color: 'black',
    flex: 1.9,
    justifyContent: 'center',
  },
  pickerContainer: {
    flex: 1.5,
    borderWidth: 2,
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: '#c4c4c7',
  },
  sliderContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 37,
  },
});
