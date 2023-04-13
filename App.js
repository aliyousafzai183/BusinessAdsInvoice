import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// screens
import InvoiceList from './src/screens/InvoiceListScreen';
import ViewInvoice from './src/screens/ViewInvoiceScreen';
import AddInvoice from './src/screens/AddInvoiceScreen';
import InviteScreen from './src/screens/InviteScreen';

// theme
import theme from './src/themes/AppTheme';

// icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={{ uri: 'https://images.pexels.com/photos/6289029/pexels-photo-6289029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} style={styles.drawerImage} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();
const Main = () => {
  return (
    <Drawer.Navigator
      initialRouteName='List'
      screenOptions={{
        headerTitle: "Business Ads Invoice",
        headerTitleAlign: 'center',
        headerTintColor: theme.colors.headerText,
        drawerActiveBackgroundColor: theme.colors.secondary,
        drawerActiveTintColor: theme.colors.text,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="All Invoices" component={InvoiceList} />
      <Drawer.Screen name="Invite" component={InviteScreen} />
    </Drawer.Navigator>
  )
}

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName='Main'
        screenOptions={{
          headerTintColor: theme.colors.headerText,
          headerTitleAlign: 'center',
          drawerActiveBackgroundColor: theme.colors.secondary,
          drawerActiveTintColor: theme.colors.text,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Stack.Screen
          name='Main'
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='View'
          component={ViewInvoice}
          options={{
            headerTitle: 'Update Invoice',
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { /* handle delete icon press */ }}>
                  <Entypo name='trash' size={24} color='white' style={{ marginRight: 16 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { /* handle pdf icon press */ }}>
                  <FontAwesome name='file-pdf-o' size={24} color='white' style={{ marginRight: 16 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { /* handle printer icon press */ }}>
                  <FontAwesome name='print' size={24} color='white' />
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <Stack.Screen
          name='Add'
          component={AddInvoice}
          options={{ headerTitle: 'Add Invoice' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 230,
    backgroundColor: theme.colors.background,
    justifyContent: 'flex-start'
  },
  drawerImage: {
    width: 280,
    height: 210,
  },
});

export default App;