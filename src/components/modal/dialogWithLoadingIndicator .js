import React from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import {Portal, Dialog} from 'react-native-paper';
import COLORS from '../../constants/colors';

const DialogWithLoadingIndicator = ({visible, title, message}) => {
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.flexing}>
            <ActivityIndicator
              color={COLORS.blue1}
              size={'large'}
              style={styles.marginRight}
            />
            <Text>{message}</Text>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  flexing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 16,
  },
});

export default DialogWithLoadingIndicator;
