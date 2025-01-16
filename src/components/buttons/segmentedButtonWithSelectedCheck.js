import * as React from 'react';
import {StyleSheet} from 'react-native';
import {List, SegmentedButtons} from 'react-native-paper';

const SegmentedButtonWithSelectedCheck = ({value, setValue, title}) => {
  return (
    <List.Section title={title}>
      <SegmentedButtons
        onValueChange={setValue}
        value={value}
        style={styles.group}
        buttons={[
          {
            icon: 'account',
            value: 'username',
            label: 'Username',
            showSelectedCheck: true,
            style: styles.button,
          },
          {
            icon: 'email',
            value: 'email',
            label: 'Email',
            showSelectedCheck: true,
            style: styles.button,
          },
        ]}
      />
    </List.Section>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  group: {paddingHorizontal: 20, justifyContent: 'center'},
});

export default SegmentedButtonWithSelectedCheck;
