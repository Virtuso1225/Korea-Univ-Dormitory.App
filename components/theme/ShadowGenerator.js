import React from 'react';
import { View, StyleSheet } from 'react-native';

const ShadowGenerator = ({ children }) => {
  return (
    <View style={styles.topShadow}>
      <View style={styles.bottomShadow}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  topShadow: {
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#ffffff',
  },
  bottomShadow: {
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#d4d2cf',
  },
});

export default ShadowGenerator;
