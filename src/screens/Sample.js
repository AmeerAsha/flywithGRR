import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Sample = () => {
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const dateDepartureShown = moment(departureDate).format('dddd, DD MMM yyyy');
    const dateReturnShown = moment(returnDate).format('dddd, DD MMM yyyy');
    

    const handleDepartureDate = (event,selectedDate) => {
      if (selectedDate !== null) {
          setDepartureDate(selectedDate)
          addDays(selectedDate)
          setShowFrom(false);
          
      }
  }
  const handleReturnDate = (event,selectedDate) => {
      if (selectedDate !== null) {
          setReturnDate(selectedDate)
          setShowTo(false);
      }
  }
  const addDays = (departureDate) => {
      if (departureDate === undefined) {
          departureDate = new Date();
      }
      const newDate = new Date(departureDate.getTime());
      
      setReturnDate(newDate.setDate(departureDate.getDate() + 1));
  }

    const showDatepicker = (type) => {
      if (type === 'from') {
        setShowFrom(true);
        setShowTo(false);
      }
  
      if (type === 'to') {
        setShowTo(true);
        setShowFrom(false);
      }
    };
    
  return (
    <View>
      <TouchableOpacity
            
            onPress={showDatepicker.bind(null, 'from')}
          >
            <Text>{dateDepartureShown}</Text>
            <Icon name="calendar-month" size={30} color="#088675" />
          </TouchableOpacity>
          {showFrom && (
            <DateTimePicker
              value={departureDate}
              mode={'date'}
              is24Hour={true}
              onChange={handleDepartureDate}
              name="departureDate" 
              minimumDate={new Date()}
              />
          )}
          <TouchableOpacity
              onPress={showDatepicker.bind(null, 'to')}
          >
            <Text>{dateReturnShown}</Text>
            <Icon name="calendar-month" size={30} color="#088675" />
          </TouchableOpacity>
          {showTo && (
            <DateTimePicker
              value={returnDate}
              mode={'date'}
              is24Hour={true}
              onChange={handleReturnDate}
              name="returnDate" 
              minimumDate={departureDate}
            />
          )}
    </View>
  )
}

export default Sample
