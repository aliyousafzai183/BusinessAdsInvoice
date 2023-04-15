import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// theme
import theme from '../themes/AppTheme';

// data
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

// icons
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewInvoice = ({ route, navigation }) => {

  const [from, setFrom] = useState(route.params.fromPerson);
  const [to, setTo] = useState(route.params.toPerson);
  const [cost, setCost] = useState(route.params.cost);
  const [discount, setDiscount] = useState(route.params.discount);
  const [totalCost, setTotalCost] = useState(route.params.totalCost);
  const [number, setNumber] = useState(route.params.number ? route.params.number : "No Mobile Number");
  const [title, setTitle] = useState(route.params.title);
  const [showMore, setShowMore] = useState(false);

  const calculateTotalCost = (cost, discount) => {
    const total = cost - discount;
    return total.toFixed(2); // limit to 2 decimal places
  };

  const handleDiscountChange = (value) => {
    const total = calculateTotalCost(cost, value);
    setDiscount(value);
    setTotalCost(total);
  };

  const handleUpdatePress = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE invoices SET fromPerson=?, toPerson=?, number=?, title=?, cost=?, discount=?, totalCost=? WHERE id=?',
        [from, to, number, title, cost, discount, totalCost, route.params.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            navigation.navigate('Main');
          } else alert('Updation Failed');
        }
      );
    });
  };


  const handleDeletePress = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM invoices where id=?',
        [route.params.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            navigation.navigate('Main');
          } else {
            alert('Please insert a valid User Id');
          }
        }
      );
    });
  };

  const handlePrintPress = () => {
    // Handle print button press
  };

  const handleExportPress = () => {
    // Handle export button press
  };

  const handleShowMorePress = () => {
    setShowMore(!showMore);
  };

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
          value={cost.toString()}
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
          value={discount.toString()}
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
        <Text style={styles.inputGroupNext}> {route.params.date} </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.updateButton, { width: showMore ? 'auto' : '85%' }]} onPress={handleUpdatePress}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        {showMore && (
          <View style={styles.showMoreContainer}>
            <TouchableOpacity style={styles.moreButtons} onPress={handleDeletePress}>
              <Feather name="trash-2" size={20} color={theme.colors.background} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={handlePrintPress}>
              <Feather name="printer" size={20} color={theme.colors.background} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={handleExportPress}>
              <FontAwesome name="file-pdf-o" size={20} color={theme.colors.background} />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.showMoreButton} onPress={handleShowMorePress}>
          <MaterialCommunityIcons name="arrow-expand-left" size={20} color={theme.colors.background} />
        </TouchableOpacity>
      </View>
    </View>
  )
};


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

  inputGroupNext: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 5,
    width: '65%',
    textAlign: 'left',
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    color: theme.colors.text
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
  updateButton: {
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
  moreButtons: {
    backgroundColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'orange',
    marginLeft: '3%',

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  showMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

});


export default ViewInvoice;
