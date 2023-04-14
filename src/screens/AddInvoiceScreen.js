import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

// db
// import db from '../model/openDb';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

// theme
import theme from '../themes/AppTheme';

const AddInvoice = ({ navigation }) => {
  const [fromPerson, setFrom] = useState('');
  const [toPerson, setTo] = useState('');
  const [number, setNumber] = useState('');
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [discount, setDiscount] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [date, setDate] = useState();


  const calculateTotalCost = (cost, discount) => {
    const total = cost - discount;
    return total.toFixed(2); // limit to 2 decimal places
  }

  const handleDiscountChange = (value) => {
    const total = calculateTotalCost(cost, value);
    setDiscount(value);
    setTotalCost(total);
  }

  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  }

  const handleSave = () => {
    if (!fromPerson || !toPerson || !title || !cost || !discount) {
      Alert.alert(
        'Missing Fields',
        'Please fill all required fields.',
        [{ text: 'OK', style: 'cancel' }],
        { cancelable: true }
      );
      return;
    }
    const currentDate = getFormattedDate();
    setDate(currentDate);

    

    // Add the invoice data to the database
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO invoices (fromPerson, toPerson, number, title, cost, discount, totalCost, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [fromPerson, toPerson, number, title, cost, discount, totalCost, currentDate],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
           navigation.navigate('Main');
          } else alert('Registration Failed');
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>From *</Text>
        <TextInput
          style={styles.input}
          value={fromPerson}
          onChangeText={setFrom}
          placeholder='Your name or organization'
          placeholderTextColor={theme.colors.text}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>To *</Text>
        <TextInput
          style={styles.input}
          value={toPerson}
          onChangeText={setTo}
          placeholder='Recipient name'
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
        <Text style={styles.inputGroupHeader}>Title *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder='Invoice title'
          placeholderTextColor={theme.colors.text}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputGroupHeader}>Cost *</Text>
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
        <Text style={styles.inputGroupHeader}>Discount *</Text>
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
        <TextInput
          style={styles.input}
          value={totalCost}
          placeholder='Total cost after discount'
          placeholderTextColor={theme.colors.text}
          keyboardType='numeric'
          editable={false} // disable editing
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },

  inputGroup: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inputGroupHeader: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 13,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 5,
    width: '30%',
    textAlign: 'center',
    color: theme.colors.headerText
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    width: '65%',
    color: theme.colors.text
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


export default AddInvoice;