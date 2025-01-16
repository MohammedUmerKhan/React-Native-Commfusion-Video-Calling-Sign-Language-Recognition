import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#050A0E',
  },
  callerInfoContainer: {
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'white',
  },
  callerNameText: {
    fontSize: 26,
    marginTop: 12,
    color: '#ffff',
  },
  callInfoText: {
    fontSize: 16,
    color: '#D0D4DD',
  },
  acceptButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'white',
  },
  acceptButton: {
    backgroundColor: 'green',
    borderRadius: 30,
    height: 60,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAccept: {
    fontSize: 40,
    color: '#fff',
  },
  hangupButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'white',
  },
  hangupButton: {
    backgroundColor: 'red',
    borderRadius: 30,
    height: 60,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHangup: {
    fontSize: 40,
    color: '#fff',
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
});
