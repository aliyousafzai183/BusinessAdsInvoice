import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

// theme
import theme from '../themes/AppTheme';

// component
import InvoiceComponent from '../components/InvoiceComponent';

// data
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

// icons
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

// function
const InvoiceList = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [searchText, setSearchText] = useState('');
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM invoices',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setInvoices(temp);
          }
        );
      });
    };
  
    fetchInvoices();
  
    const reloadInvoices = navigation.addListener('focus', fetchInvoices);
    return reloadInvoices;
  }, [invoices, isFocused]);
     

  const handleSearch = (text) => {
    setSearchText(text);
  }

  // used by FlatList
  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => {
    return (
      <InvoiceComponent data={item} navigation={navigation} />
    )
  }

  const filteredData = invoices.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleNewInvoice = () => {
    navigation.navigate('Add');
  }

  const { width, height } = Dimensions.get('window');
  const searchBarWidth = width - 40;
  const addButtonSize = height * 0.08;
  const addButtonBottom = height * 0.05;
  const addButtonRight = width * 0.05;

  return (
    <View style={styles.container}>
      <TextInput
        value={searchText}
        placeholder='Search by name'
        placeholderTextColor={theme.colors.headerText}
        style={[styles.search, { width: searchBarWidth }]}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
      />

      <TouchableOpacity
        style={[
          styles.addButton,
          {
            width: addButtonSize,
            height: addButtonSize,
            bottom: addButtonBottom,
            right: addButtonRight
          }
        ]}
        onPress={handleNewInvoice}
      >
        <Feather name="plus" size={30} color={theme.colors.background} />
      </TouchableOpacity>
    </View>
  )
}

export default InvoiceList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: height*0.02,
    paddingHorizontal: width*0.02,
    width: '100%',
    
  },
  search: {
    paddingHorizontal: width * 0.05,
    backgroundColor: theme.colors.secondary,
    borderRadius: height * 0.04,
    color: theme.colors.headerText,
    marginBottom: height * 0.03,
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
    marginBottom: height * 0.1,
  },
  addButton: {
    position: 'absolute',
    bottom: height * 0.05,
    right: width * 0.05,
    backgroundColor: theme.colors.primary,
    borderRadius: height * 0.1,
    width: height * 0.1,
    height: height * 0.1,
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
    fontSize: height * 0.05,
    fontWeight: 'bold',
  },
});