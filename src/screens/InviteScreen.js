import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

// icon
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// theme
import theme from '../themes/AppTheme';

const InviteScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name='info-circle' size={80} color={theme.colors.primary} />
        <Text style={styles.text}>Coming Soon!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default InviteScreen;
