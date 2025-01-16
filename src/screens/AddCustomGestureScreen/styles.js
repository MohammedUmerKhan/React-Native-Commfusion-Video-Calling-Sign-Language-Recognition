// styles.js
import {StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: 20,
    // borderWidth: 2,
  },
  text: {
    textAlign: 'center',
    color: 'black',
  },
  imageContainer: {
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ededed',
  },
  image: {
    height: 350,
    width: 250,
  },
  textInputContainer: {
    // borderWidth: 2,
    // borderColor: '#ededed',
    width: '100%',
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  item: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonContainer: {
    // borderWidth: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    marginBottom: 10,
  },
  uploadedText: {
    marginTop: 10,
  },
});
