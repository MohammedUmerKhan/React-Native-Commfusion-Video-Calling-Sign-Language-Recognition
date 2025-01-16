import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A0E',
    // paddingHorizontal: 2,
    // paddingVertical: 2,
    // borderWidth: 2,
    // borderColor: 'red',
  },
  streamContainer: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    backgroundColor: 'black',
  },
  streamView: {
    flex: 1,
  },
  localStreamContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    width: 140,
    height: 250,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  localStream: {
    marginTop: 0,
    flex: 1,
  },
  iconRow: {
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 12,
    position: 'absolute',
    bottom: 12,
  },
  iconContainer: {
    borderWidth: 1.5,
    borderColor: '#2B3034',
    borderWidth: 2,
  },
});
