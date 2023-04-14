// data
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

console.log("In controller");

const handlePrint = (id) => {
    console.log('Print button pressed');
    // code to print invoice
  };

  const handleExportPdf = (id) => {
    console.log('Export PDF button pressed');
    // code to export invoice as PDF
    console.log(id);
  };

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

  export {handleDelete, handleExportPdf, handlePrint};
