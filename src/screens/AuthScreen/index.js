import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TextBase,
} from 'react-native';
import styles from './styles';
import CustomButton from '../../components/buttons/customButton';
import axios from '../../constants/axiosInstance';
import {handleAxiosError} from '../../helpers/apiHelper';

const App = ({navigation}) => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log('Connect DB.......');
      const res = await axios.get(`/user/check_connection`);
      console.log(res.data);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor="#008ee6" barStyle="light-content" />
      <View style={styles.rectangle} />

      <View style={styles.semicircle} />
      <View style={styles.container1}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/screens/logo.png')}
        />
        <View>
          <Text style={styles.font1}>
            <Text style={styles.font1child1}>Comm</Text>
            <Text style={styles.font1child2}>Fusion</Text>
          </Text>
        </View>
        <Text style={styles.font2}>VIDEO CALLING</Text>

        <Text>Empowering All Voices , All Senses </Text>
        <Text>Breaking Boundaries , Building Bridges</Text>
      </View>
      <View style={styles.container2}>
        <CustomButton
          onPress={() => {
            navigation.navigate('Login');
          }}
          buttonBackgroundColor="#20A0F0"
          textColor="white"
          borderColor="#20A0F0"
          borderWidth={4}
          buttonText="Login"
        />
        <CustomButton
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          buttonBackgroundColor="#fff"
          textColor="#20A0F0"
          borderColor="#20A0F0"
          borderWidth={3}
          buttonText="Create an Account"
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
