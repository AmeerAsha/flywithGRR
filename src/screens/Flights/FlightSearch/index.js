import React, { useState, useEffect, useMemo } from 'react';
import { View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { BaseStyle, Images, useTheme, BaseColor } from "./../../../config";
import APIConfig, { APIACTIVATEURL } from "./../../../Configuration/APIConfig";
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Header, Icon, BookingTime, Tag, FormOption, QuantityPicker, Button, Text, } from './../../../components';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


export default function FlightSearch({ navigation }) {
  const [isOneWay, setIsOneWay] = useState(false);
  const [journeyType, setJourneyType] = useState("0");
  const [value, setValue] = useState(0)
  const [displayFrom, setDisplayFrom] = useState('Shamshabad Rajiv Gandhi Intl Arpt, Hyderabad(HYD)');
  const [displayTo, setDisplayTo] = useState('Chhatrapati Shivaji, Mumbai(BOM)');
  const [Dlocations, setDLocations] = useState([]);
  const [Rlocations, setRLocations] = useState([]);
  const [isDomestic, setIsDomestic] = useState("DOM");
  const [locationFrom, setLocationFrom] = useState('HYD');
  const [locationTo, setLocationTo] = useState('BOM');
  const [cityFrom, setCityFrom] = useState('Hyderabad');
  const [cityTo, setCityTo] = useState('Mumbai');
  const [from, setFrom] = useState('Hyderabad, India');
  const [to, setTo] = useState('Mumbai, India');
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState(0);
  const [preffered, setPreferred] = useState(0);
  const [userId, setUserId] = useState("00000000-0000-0000-0000-000000000000");
  const [agentId, setAgentId] = useState("00000000-0000-0000-0000-000000000000");
  const [requestedBy, setRequestedBy] = useState("CUSTOMER");
  const [loading, setLoading] = useState(false);
  const dateDepartureShown = moment(departureDate).format('dddd, DD MMM yyyy');
  const dateReturnShown = moment(returnDate).format('dddd, DD MMM yyyy');
  const newDate = new Date(returnDate).setDate(1)
  const xyz = departureDate.getDate() + 1
  console.log(newDate)

  const { colors } = useTheme();
  const { t } = useTranslation();
  
  

  var journeytype = [
    { label: 'Return', value: 0 },
    { label: 'One Way', value: 1 }
  ];
  const handleJourneyType = (value) => {
    if (value === 1) {
      setIsOneWay(true)

      console.log(value)
    }
    else {
      setIsOneWay(false);

    }
    setJourneyType(value)
  }
 
  const getDLocation = async (location) => {
    const response = await axios.get(APIACTIVATEURL + 'Airport/search?searchkey=' + location);
    if (response.data.data !== null) {
      setDLocations(response.data.data)
    }
  }
  const getRLocation = async (location) => {
    const response = await axios.get(APIACTIVATEURL + 'Airport/search?searchkey=' + location);
    if (response.data.data !== null) {
      setRLocations(response.data.data)
    }
  }

  const handleDepartureLocationChange = (text) => {

    if (text.trim().length > 2) {
      getDLocation(text)
      console.log(text)
    } else {
      setDLocations("")
    }
    setDisplayFrom(text);
  }

  const handleReturnLocationChange = (text) => {

    if (text.trim().length > 2) {
      getRLocation(text)
    } else {
      setRLocations("")
    }
    setDisplayTo(text);
  }

  const selectdepartureLocationHandle = (data) => {
    if (data.countryCode !== "IN") {
      setIsDomestic("INT")
    }
    var DF = data.airportName + ", " + data.cityName + "(" + data.airportCode + ")";
    setDisplayFrom(DF);
    setLocationFrom(data.airportCode)
    setDLocations('')
    setCityFrom(data.cityName);
    setFrom(data.cityName + ", " + data.countryName);
  }

  const selectReturnLocationHandle = (data) => {
    var DF = data.airportName + ", " + data.cityName + "(" + data.airportCode + ")";
    if (data.countryCode !== "IN") {
      setIsDomestic("INT")
    }
    setDisplayTo(DF);
    setLocationTo(data.airportCode)
    setRLocations('')
    setCityTo(data.cityName);
    setTo(data.cityName + ", " + data.countryName);
  }

  const handleDepartureDate = (event, selectedDate) => {
    if (selectedDate !== null) {
      setDepartureDate(selectedDate)
      addDays(selectedDate)
      setShowFrom(false);

    }
  }
  const handleReturnDate = (event, selectedDate) => {
    if (selectedDate !== null) {
      setReturnDate(selectedDate)

      setShowTo(false);
    }
  }
  const addDays = (departureDate) => {
    if (departureDate === undefined) {
      departureDate = new Date();
    }
    const newDate = new Date(departureDate);

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

  const handleIncreaseAdults = () => {
    setAdults(parseFloat(adults + 1))
}

const handleDecreaseAdults = () => {
  if (adults !== 1) {
      setAdults(parseFloat(adults - 1))
  }
}
  
const handleIncreaseKids = () => {
  setKids(parseFloat(kids + 1))
}
const handleDecreaseKids = () => {
  if (kids !== 0) {
      setKids(parseFloat(kids - 1))
  }
}
const handleIncreaseInfants = () => {
  setInfants(parseFloat(infants + 1))
}
const handleDecreaseInfants = () => {
  if (infants !== 0) {
      setInfants(parseFloat(infants - 1))
  }
}

var CabinItems = [
  { label: 'ECONOMY', value: 0 },
  { label: 'BUSINESS', value: 1 },
  { label: 'FIRST', value: 2 }
];

const handleClassType = (value) => {
  setCabinClass(value)
}

var PreferredItems = [
  { label: 'REGULAR', value: 0 },
  { label: 'STUDENT', value: 1 },
  { label: 'SENIOR CITIZEN', value: 2 }
];

const handlePrefferedType = (value) => {
  setPreferred(value)
}

const handleSearch = (e) => {
  e.preventDefault();
  const searchQuery = {
    "journeyType": journeyType,
    "locationFrom": locationFrom,
    "locationTo": locationTo,
    "displayFrom": displayFrom,
    "displayTo": displayTo,
    "adults": adults,
    "kids": kids,
    "infants": infants,
    "cabinClass": cabinClass,
    "departureDate": moment(departureDate).format('YYYY-MM-DD'),
    "returnDate": moment(returnDate).format('YYYY-MM-DD'),
    "cityFrom": cityFrom,
    "cityTo": cityTo,
    "userId": userId,
    "agentId": agentId,
    "from": from,
    "to": to,
    "requestedBy": requestedBy,
    "isOneWay":isOneWay
}
if (isOneWay) {
  navigation.navigate("OneWayFlight");
}
else {
    if (isDomestic === "INT") {
      navigation.navigate('/oneway-flights/' + adults + "/" + kids + "/" + infants + "/" + isDomestic, { state: { searchQuery } });
    }
    else {
      navigation.navigate('/roundtrip-flights/' + adults + "/" + kids + "/" + infants + "/" + isDomestic, { state: { searchQuery } });
    }
}


}

  return (
    <View style={{ flex: 1 }}>
      <Header title={t('')} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView contentContainerStyle={styles.contain} style={{ flex: 1 }}>
          <View><RadioForm
            radio_props={journeytype}
            initial={value}
            onPress={(value) => handleJourneyType(value)}
            labelHorizontal
            formHorizontal
            labelColor="black"
            buttonColor="black"
            selectedButtonColor="#E5634D"
            buttonSize={17}
            labelStyle={{ fontSize: 18, marginRight: 10 }}
          /></View>

          <View>
            <Text body1 bold style={styles.from}>
              {t('FROM')}
            </Text>
            <TextInput
              id="displayFrom" name="displayFrom" value={displayFrom} onChangeText={(text) => handleDepartureLocationChange(text)} placeholder="Departure" autoComplete="off"
              style={styles.Textinput}
            />
            {Dlocations ?
              Dlocations.map(location => <View style={styles.Departurelist}><TouchableOpacity onPress={selectdepartureLocationHandle.bind(null, location)} ><Text style={styles.DepartureText}><Icon1 name="flight-takeoff" color={BaseColor.whiteColor} size={25} />  {location.airportName},{location.cityName},({location.airportCode})</Text></TouchableOpacity></View>) : ""}
            <Text body1 bold style={styles.from}>
              {t('TO')}
            </Text>
            <TextInput
              id="displayTo" name="displayTo" value={displayTo} onChangeText={(text) => handleReturnLocationChange(text)} placeholder="Arrival" autoComplete="off"
              style={styles.Textinput}
            />
            {Rlocations ?
              Rlocations.map(location => <View style={styles.Departurelist}><TouchableOpacity onPress={selectReturnLocationHandle.bind(null, location)}><Text style={styles.DepartureText}><Icon1 name="flight-land" color={BaseColor.whiteColor} size={25} />  {location.airportName},{location.cityName},({location.airportCode})</Text></TouchableOpacity></View>) : ""}
          </View>
          <View>
            <Text body1 bold style={styles.from}>
              {t('DEPATURE DATE')}
            </Text>
            <TouchableOpacity
              onPress={showDatepicker.bind(null, 'from')}
              style={styles.dateBox}
            ><View>
                <Text body1 regular>{dateDepartureShown}</Text></View>
              <Icon1 name="calendar-month" style={styles.calendar} />
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
            <Text body1 bold style={styles.from}>
              {t('RETURN DATE')}
            </Text>
            {!isOneWay ?
              <TouchableOpacity
                onPress={showDatepicker.bind(null, 'to')}
                style={styles.dateBox}
              >
                <Text body1 regular>{dateReturnShown}</Text>
                <Icon1 name="calendar-month" style={styles.calendar} />
              </TouchableOpacity> :
              <TouchableOpacity
                onPress={showDatepicker.bind(null, '')}
                style={styles.dateBox}
              >
                <Text body1 regular>{dateReturnShown}</Text>
                <Icon1 name="calendar-month" style={styles.calendar} />
              </TouchableOpacity>}

            {showTo &&
              <DateTimePicker
                value={returnDate}
                mode={'date'}
                is24Hour={true}
                onChange={handleReturnDate}
                name="returnDate"
                minimumDate={departureDate}
              />
            }

          </View>
          <Text body1 bold style={styles.from}>
            {t('TRAVELLERS')}
          </Text>
          <View style={{flex:1,flexDirection:"row"}}>
          <View style={styles.contentPicker}>
            <Text body1 numberOfLines={1} style={{ marginBottom: 5 }}>
              {t('Adults')}
            </Text>
            <TouchableOpacity onPress={handleIncreaseAdults}>
              <Icon name="plus-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text title1>{adults}</Text>
            <TouchableOpacity onPress={handleDecreaseAdults}>
              <Icon name="minus-circle" size={24} color={BaseColor.grayColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentPicker}>
            <Text body1 numberOfLines={1} style={{ marginBottom: 5 }}>
              {t('Kids')}
            </Text>
            <TouchableOpacity onPress={handleIncreaseKids}>
              <Icon name="plus-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text title1>{kids}</Text>
            <TouchableOpacity onPress={handleDecreaseKids}>
              <Icon name="minus-circle" size={24} color={BaseColor.grayColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.contentPicker}>
            <Text body1 numberOfLines={1} style={{ marginBottom: 5 }}>
              {t('Infants')}
            </Text>
            <TouchableOpacity onPress={handleIncreaseInfants}>
              <Icon name="plus-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text title1>{infants}</Text>
            <TouchableOpacity onPress={handleDecreaseInfants}>
              <Icon name="minus-circle" size={24} color={BaseColor.grayColor} />
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.from}><RadioForm
            radio_props={CabinItems}
            initial={cabinClass}
            onPress={e => handleClassType(e)}
            labelHorizontal
            formHorizontal
            labelColor="black"
            buttonColor="black"
            selectedButtonColor="#E5634D"
            buttonSize={15}
            labelStyle={{ fontSize: 15, marginRight: 10 }}
          /></View>
          <View style={styles.from1}><RadioForm
            radio_props={PreferredItems}
            initial={preffered}
            onPress={e => handlePrefferedType(e)}
            labelHorizontal
            formHorizontal
            labelColor="black"
            buttonColor="black"
            selectedButtonColor="#E5634D"
            buttonSize={15}
            labelStyle={{ fontSize: 13, marginRight: 6 }}
          /></View>
          <View style={{ padding: 20, marginHorizontal: 40 }}>
            <Button
              loading={loading}
              full
              onPress={e => handleSearch(e)}>
              {t('search')}
            </Button>
          </View>
        </ScrollView>

      </SafeAreaView>
    </View>
  );
}
