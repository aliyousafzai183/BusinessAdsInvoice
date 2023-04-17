import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';

// db
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

// theme
import theme from '../themes/AppTheme';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const handleMinimizeKeyboard = () => {
    Keyboard.dismiss();
  };

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
        [fromPerson, toPerson, number, title, cost, discount, totalCost, date],
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.saveButton, { width: '83%' }]} onPress={handleSave}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.showMoreButton} onPress={handleMinimizeKeyboard}>
          <MaterialCommunityIcons name="keyboard-off-outline" size={20} color={theme.colors.background} />
        </TouchableOpacity>
      </View>
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

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  showMoreButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    width: '13%',
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});


export default AddInvoice;