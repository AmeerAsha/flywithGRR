import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FlightSearch from './screens/Flights/FlightSearch';
import FlightResult from './screens/Flights/FlightResult';
import FlightSummary from './screens/Flights/FlightSummary';
import FlightFilter from './screens/Flights/FlightFilter';
import FlightTicket from './screens/Flights/FlightTicket';
import CheckOut from './screens/Flights/CheckOut';
import BookingDetail from './screens/Flights/BookingDetail';
import SelectFlight from './screens/Flights/SelectFlight';
import PaymentMethod from './screens/Payments/PaymentMethod';
import PreviewPayment from './screens/Payments/PreviewPayment';

const Stack = createStackNavigator();

const Navigation = () => {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
      
          <Stack.Screen name="FlightSearch" component={FlightSearch} options={{headerShown:false}}/>
          <Stack.Screen name="FlightResult" component={FlightResult} options={{headerShown:false}}/>
          <Stack.Screen name="FlightSummary" component={FlightSummary} options={{headerShown:false}}/>
          <Stack.Screen name="FlightFilter" component={FlightFilter} options={{headerShown:false}}/>
          <Stack.Screen name="FlightTicket" component={FlightTicket} options={{headerShown:false}}/>
          <Stack.Screen name="CheckOut" component={CheckOut} options={{headerShown:false}}/>
          <Stack.Screen name="BookingDetail" component={BookingDetail} options={{headerShown:false}}/>
          <Stack.Screen name="SelectFlight" component={SelectFlight} options={{headerShown:false}}/>
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} options={{headerShown:false}}/>
          <Stack.Screen name="PreviewPayment" component={PreviewPayment} options={{headerShown:false}}/>
        </Stack.Navigator>
        
    </NavigationContainer>
  );
};

export default Navigation;