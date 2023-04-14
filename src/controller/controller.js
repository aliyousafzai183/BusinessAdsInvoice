// data
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

  const handleDelete = ({id}) => {
    console.log(id);
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM invoices where id=?',
        [id],
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

  export {handleDelete};
