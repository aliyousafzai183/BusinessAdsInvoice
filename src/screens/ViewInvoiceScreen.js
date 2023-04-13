import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

// theme
import theme from '../themes/AppTheme';

// data
import data from '../model/db';

const ViewInvoice = ({ route }) => {
  const { id } = route.params;
  const invoice = data.find(item => item.id === id);

  const [from, setFrom] = useState(invoice.from);
  const [to, setTo] = useState(invoice.to);
  const [number, setNumber ] = useState(invoice.mobile);
  const [title, setTitle] = useState(invoice.title);
  const [cost, setCost] = useState(invoice.costbeforediscount);
  const [discount, setDiscount] = useState(invoice.discount);
  const [totalCost, setTotalCost] = useState(invoice.cost);


  const calculateTotalCost = (cost, discount) => {
    const total = cost - discount;
    return total.toFixed(2); // limit to 2 decimal places
  }

  const handleDiscountChange = (value) => {
    const total = calculateTotalCost(cost, value);
    setDiscount(value);
    setTotalCost(total);
  }

  const handleUpdate = () => {
    // Save logic here
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>From</Text>
        <TextInput
          style={styles.input}
          value={from}
          onChangeText={setFrom}
          placeholder='Your name or organization'
          placeholderTextColor={theme.colors.text}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>To</Text>
        <TextInput
          style={styles.input}
          value={to}
          onChangeText={setTo}
          placeholder='Recipient name or organization'
          placeholderTextColor={theme.colors.text}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>Mobile</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={setNumber}
          placeholder='Recipient mobile number'
          placeholderTextColor={theme.colors.text}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder='Invoice title'
          placeholderTextColor={theme.colors.text}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>Cost</Text>
        <TextInput
          style={styles.input}
          value={cost}
          onChangeText={setCost}
          placeholder='Total cost before discount'
          placeholderTextColor={theme.colors.text}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>Discount</Text>
        <TextInput
          style={styles.input}
          value={discount}
          onChangeText={handleDiscountChange}
          placeholder='Discount amount'
          placeholderTextColor={theme.colors.text}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>Total Cost</Text>
        <Text style={styles.inputGroupNext}> {totalCost} </Text>

      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>Date</Text>
        <Text style={styles.inputGroupNext}> {invoice.date} </Text>
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleUpdate}
      >
        <Text style={styles.saveButtonText}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor: '#fff',
  },

  inputGroup: {
    marginBottom: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  inputGroupHeader: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 13,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 5,
    width:'30%',
    textAlign:'center'
  },

  inputGroupNext: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 5,
    width:'65%',
    textAlign:'left',
    borderColor:theme.colors.secondary,
    borderWidth:1,
    color:theme.colors.text
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    width:'65%',
    color:theme.colors.text
  },

  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

});


export default ViewInvoice;
