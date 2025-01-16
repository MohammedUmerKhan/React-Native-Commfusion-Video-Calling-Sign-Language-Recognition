import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#050A0E',
  },
  callInfoContainer: {
    flex: 1,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    // borderColor: 'white',
    // borderWidth: 4,
  },
  callingText: {
    fontSize: 16,
    color: '#D0D4DD',
  },
  otherUserId: {
    fontSize: 26,
    marginTop: 12,
    color: '#ffff',
    // letterSpacing: 6,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  endCallButton: {
    backgroundColor: 'red',
    borderRadius: 30,
    height: 60,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    // borderWidth: 2,
    // borderColor: 'white',
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#fff',
  },
  iconHangup: {
    fontSize: 40,
    color: '#fff',
  },
});
