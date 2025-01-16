// styles.js
import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rectangle: {
    width: 200,
    height: 300,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.blue1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
