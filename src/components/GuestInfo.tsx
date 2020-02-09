import React from 'react';
import { View, StyleSheet } from 'react-native';
import InfoBlock from './InfoBlock';
import { getGuestInfoIcon } from '../helpers/icons';

/* ------------- Props and State ------------- */

/* ------------- Class ------------- */
class GuestInfo extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <InfoBlock
          renderIcon={getGuestInfoIcon}
          text="Only for authenticated users"
          subtext="Don't be a guest. Create an account"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GuestInfo;