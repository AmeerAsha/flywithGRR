import React from 'react';
import {store, persistor} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './src/navigation1/navigation1';

console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}



