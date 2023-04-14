import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Root from './src/screens/Root';

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;