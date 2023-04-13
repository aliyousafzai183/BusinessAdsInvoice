import React, {useState} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

const InvoiceList = ({navigation}) => {
  
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'black'}}>List Invoice Screen</Text>
      <Button title='View Invoice' onPress={()=>navigation.navigate('View')}/>
      <Button title='Add Invoice' onPress={()=>navigation.navigate('Add')}/>
    </View>
  )
}

export default InvoiceList;