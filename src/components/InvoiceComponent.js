import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

// theme
import theme from '../themes/AppTheme';


const InvoiceComponent = ({ data, navigation }) => {

  const handlePress = () => {
    navigation.navigate('View', { id: data.id });
  }


  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
    >
      <View style={styles.row}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.date}>{data.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.invoice}>{data.invoiceNo}</Text>
        <Text style={styles.price}>$ {data.cost}</Text>
      </View>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: '3%',

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: theme.colors.dateColor,
  },
  invoice: {
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default InvoiceComponent;