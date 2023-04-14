import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

// theme
import theme from '../themes/AppTheme';

// redux
import { connect } from 'react-redux';

const InvoiceComponent = ({ data, navigation, changeId }) => {

  const handlePress = () => {
    changeId(data.id);
    navigation.navigate('View', {
      id: data.id,
      title: data.title,
      toPerson: data.toPerson,
      fromPerson: data.fromPerson,
      cost: data.cost,
      discount: data.discount,
      totalCost: data.totalCost,
      number: data.number,
      date: data.date
    });
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
        <Text style={styles.invoice}>INV00{data.id}</Text>
        <Text style={styles.price}>$ {data.cost}</Text>
      </View>
    </TouchableOpacity>
  )

};

const mapDispatchToProps = (dispatch) => {
  return {
    changeId: (newId) => dispatch({ type: 'SET_ID', payload: { id: newId } }),
  };
};

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
    color: theme.colors.text
  },
  date: {
    fontSize: 12,
    color: theme.colors.dateColor,
  },
  invoice: {
    fontSize: 14,
    color: theme.colors.text

  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text

  },
});


export default connect(null, mapDispatchToProps)(InvoiceComponent);
