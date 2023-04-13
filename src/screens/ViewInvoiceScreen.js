import React from 'react';
import {
  Text,
  View,
} from 'react-native';

// data
import data from '../model/db';

const ViewInvoice = ({ route }) => {
  const { id } = route.params;
  const invoice = data.find(item => item.id === id);
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'black' }}>View Invoice Screen with id {id}</Text>
      <Text>Title: {invoice.title}</Text>
      <Text>Date: {invoice.date}</Text>
      <Text>Invoice No: {invoice.invoiceNo}</Text>
      <Text>Cost: {invoice.cost}</Text>
    </View>
  )
}

export default ViewInvoice;
