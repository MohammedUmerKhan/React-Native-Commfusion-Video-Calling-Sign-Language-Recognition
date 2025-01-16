import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './styles';
import COLORS from '../../constants/colors';

const App = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <ScrollView>
          <View>
            <Text style={styles.text}>
              1. Acceptance of Terms
              {'\n\n'}
              By using CommFusion, you agree to be bound by these terms and
              conditions. If you do not agree to these terms, please do not use
              the application.
              {'\n\n'}
              2. Account Registration
              {'\n\n'}
              Users must create an account to use the application. Users agree
              to provide accurate and complete information during registration.
              Users are responsible for maintaining the confidentiality of their
              account information.
              {'\n\n'}
              3. User Conduct
              {'\n\n'}
              Users must not use the application for any unlawful or harmful
              purpose. Users must respect the privacy and rights of others.
              Users are prohibited from engaging in abusive, harassing, or
              disruptive behavior.
              {'\n\n'}
              4. Privacy and Data Collection
              {'\n\n'}
              We collect and process user data as described in our Privacy
              Policy. Users are responsible for the content they share through
              the application.
              {'\n\n'}
              5. Intellectual Property
              {'\n\n'}
              The application and its content are protected by intellectual
              property laws. Users may not copy, reproduce, or distribute the
              application without permission.
              {'\n\n'}
              6. Availability and Maintenance
              {'\n\n'}
              We strive to maintain the application’s availability, but we do
              not guarantee uninterrupted service.
              {'\n\n'}
              7. Security
              {'\n\n'}
              Users are responsible for maintaining the security of their
              accounts and devices. Users must promptly report any security
              breaches.
              {'\n\n'}
              8. Termination
              {'\n\n'}
              We may terminate or suspend a user’s account for violations of
              these terms. Users may terminate their account at any time by
              following our instructions.
              {'\n\n'}
              9. Limitation of Liability
              {'\n\n'}
              We are not liable for any direct or indirect damages resulting
              from the use of the application.
              {'\n\n'}
              10. Changes to Terms and Conditions
              {'\n\n'}
              We reserve the right to update these terms and will notify users
              of changes. Continued use of the application constitutes
              acceptance of the revised terms.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;
