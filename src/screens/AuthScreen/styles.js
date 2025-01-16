import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rectangle: {
    width: '100%',
    height: '44%',
    backgroundColor: '#008ee6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  semicircle: {
    width: '50%',
    height: '30%',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    position: 'absolute',
    bottom: '41%',
    // borderWidth: 2,
    backgroundColor: '#fff',
  },
  container1: {
    alignItems: 'center',
    // backgroundColor: 'green',
    position: 'absolute',
    bottom: '31%',
  },
  logo: {
    width: 134,
    height: 125,
  },
  font1: {
    fontSize: 34,
    fontFamily: '',
    fontWeight: '700',
  },
  font1child1: {
    color: '#20A0F0',
  },
  font1child2: {
    color: '#4A4B4D',
  },
  font2: {
    // backgroundColor: 'red',
    marginTop: 2,
    marginBottom: 10,
    fontSize: 11,
  },
  container2: {
    // backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: '2%', // Adjust this value based on the height of container1
  },
});
