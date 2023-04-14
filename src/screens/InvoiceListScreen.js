import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';

// theme
import theme from '../themes/AppTheme';

// component
import InvoiceComponent from '../components/InvoiceComponent';

// data
import data from '../model/db';

// icons
import Feather from 'react-native-vector-icons/Feather';


// function
const InvoiceList = ({ navigation }) => {

  const [searchText, setSearchText] = useState('');
  const [invoices, setInvoices] = useState(data);

  const handleSearch = (text) => {
    setSearchText(text);
  }

  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => {
      return (
        <InvoiceComponent data={item} navigation={navigation}/>
      )
  }

  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleNewInvoice = () => {
    navigation.navigate('Add');
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={searchText}
        placeholder='Search by name'
        placeholderTextColor={theme.colors.headerText}
        style={styles.search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleNewInvoice}
      >
        <Feather name="plus" size={30} color={theme.colors.background}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '2%'
  }, 

  search: {
    paddingHorizontal: 25,
    backgroundColor: theme.colors.secondary,
    borderRadius: 20,
    color:theme.colors.headerText,
    marginBottom: '3%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  list: {
    marginBottom: 60
  },

  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export default InvoiceList;
