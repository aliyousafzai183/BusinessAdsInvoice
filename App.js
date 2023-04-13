import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

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
import ProfileScreen from './src/screens/ProfileScreen';

// theme
import theme from './src/themes/AppTheme';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={{uri:'https://images.pexels.com/photos/6289029/pexels-photo-6289029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}} style={styles.drawerImage} />
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
        headerTintColor: theme.colors.headerText,
        drawerActiveBackgroundColor: theme.colors.secondary,
        drawerActiveTintColor: theme.colors.text,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="List" component={InvoiceList} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Invite" component={InviteScreen} />
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
          options={{ headerShown: false }}
        />
        <Stack.Screen name='View' component={ViewInvoice} />
        <Stack.Screen name='Add' component={AddInvoice} />
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
    justifyContent:'flex-start'
  },
  drawerImage: {
    width: 280,
    height: 210,
  },
});

export default App;