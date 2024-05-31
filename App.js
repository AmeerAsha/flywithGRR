import React from 'react';
import {store, persistor} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
//import Navigator from './navigation';
import FlightSearch from './src/screens/Flights/SearchFlight';

console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FlightSearch />
      </PersistGate>
    </Provider>
  );
}

