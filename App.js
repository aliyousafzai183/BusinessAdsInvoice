import React from 'react';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// screens
import InvoiceList from './src/screens/InvoiceListScreen';
import ViewInvoice from './src/screens/ViewInvoiceScreen';
import AddInvoice from './src/screens/AddInvoiceScreen';
import InviteScreen from './src/screens/InviteScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import ProfileScreen from './src/screens/ProfileScreen';


const Drawer = createDrawerNavigator();
const Main = () => {
  return (
    <Drawer.Navigator initialRouteName='List'>
      <Drawer.Screen name="List" component={InvoiceList} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Invite" component={InviteScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  )
}

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen
          name='Main'
          component={Main}
          options={{headerShown:false}}
        />
        <Stack.Screen name='View' component={ViewInvoice} />
        <Stack.Screen name='Add' component={AddInvoice} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;