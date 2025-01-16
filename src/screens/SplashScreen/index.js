import React from 'react';
import {Text, View, Image, SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';

const App = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('Auth');
  }, 2000); //5000 milliseconds
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.box1}>
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
        <View>
          <Text style={styles.font2}>One App , Countless Conversations</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
