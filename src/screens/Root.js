import React, { useEffect} from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// screens
import InvoiceList from './InvoiceListScreen';
import ViewInvoice from './ViewInvoiceScreen';
import AddInvoice from './AddInvoiceScreen';
import InviteScreen from './InviteScreen';

// theme
import theme from '../themes/AppTheme';

// icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

// db
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

// redux
import { connect } from 'react-redux';

// controllers
import {handleDelete} from '../controller/controller';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={require('../images/drawerImage.jpg')} style={styles.drawerImage} />
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
      <Drawer.Screen
        name="Invite"
        component={InviteScreen}
        options={{ headerTitle: 'Invite Friends' }}
      />
    </Drawer.Navigator>
  )
}

const Stack = createNativeStackNavigator();
const Root = ({id}) => {

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS invoices (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  fromPerson TEXT NOT NULL,
                  toPerson TEXT NOT NULL,
                  number TEXT,
                  title TEXT NOT NULL,
                  cost REAL NOT NULL,
                  discount REAL NOT NULL,
                  totalCost REAL NOT NULL,
                  date TEXT NOT NULL
                )`,
              [],
              () => console.log('Table created successfully.'),
              error => console.log(error)
            );
          }
        }
      );
    });
  }, []);

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
          options={{
            headerShown: false,
          }}

        />
        <Stack.Screen
          name='View'
          component={ViewInvoice}
          options={{
            headerTitle: 'Update Invoice',
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <FontAwesome name='print' size={24} color='white' style={{ marginRight: 16 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome name='file-pdf-o' size={24} color='white' style={{ marginRight: 16 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleDelete(id) }}>
                  <Entypo name='trash' size={24} color='white' />
                </TouchableOpacity>
              </View>
            ),
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
};

const mapStateToProps = (state) => ({
  id: state.id
});

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

export default connect(mapStateToProps, null)(Root);