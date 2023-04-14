// db
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase({ name: 'mydatabase.db' });

// create Table
db.transaction(tx => {
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
});

export {db}