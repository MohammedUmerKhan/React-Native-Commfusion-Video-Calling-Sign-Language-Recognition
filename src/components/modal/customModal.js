import React from 'react';
import {Modal, View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CustomModal = ({visible, message, destinationScreen, onClose}) => {
  const navigation = useNavigation();

  const handleYes = () => {
    if (destinationScreen) {
      navigation.navigate(destinationScreen);
    }
  };

  const handleNo = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleNo}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <Text>{message}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <Button title="Yes" onPress={handleYes} />
            <Button title="No" onPress={handleNo} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
