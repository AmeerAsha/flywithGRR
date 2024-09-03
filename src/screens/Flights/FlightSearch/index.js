import React, { useState, useEffect, useRef} from 'react';
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
import airports from "../../Data/AirportList.json"

export default function FlightSearch({navigation}) {
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);
  const [isOneWay, setIsOneWay] = useState(false);
  const [journeyType, setJourneyType] = useState("ROUNDTRIP");
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
  const [cabinClass, setCabinClass] = useState("ECONOMY");
  const [preffered, setPreferred] = useState("REGULAR");
  const [userId, setUserId] = useState("00000000-0000-0000-0000-000000000000");
  const [agentId, setAgentId] = useState("00000000-0000-0000-0000-000000000000");
  const [requestedBy, setRequestedBy] = useState("CUSTOMER");
  const [loading, setLoading] = useState(false);
  const [departureResults, setDepartureResults] = useState([]);
  const [returnResults, setReturnResults] = useState([]);
  const dateDepartureShown = moment(departureDate).format('dddd, DD MMM yyyy');
  const dateReturnShown = moment(returnDate).format('dddd, DD MMM yyyy');
  const newDate = new Date(returnDate).setDate(1)
  const xyz = departureDate.getDate() + 1
  console.log(newDate)

  const { colors } = useTheme();
  const { t } = useTranslation();
  const inputDRef = useRef(null);
  const inputRRef = useRef(null);
  

  var journeytype = [
    { label: 'Return', value: "ROUNDTRIP" },
    { label: 'One Way', value: "ONEWAY" }
  ];
  const handleJourneyType = (value) => {
    if (value === "ONEWAY") {
      setIsOneWay(true)
     }
    else {
      setIsOneWay(false)
    }
    setJourneyType(value)
    console.log(journeyType)
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
  { label: 'ECONOMY', value: "ECONOMY" },
  { label: 'BUSINESS', value: "BUSINESS" },
  { label: 'FIRST', value: "FIRST" }
];

const handleClassType = (value) => {
  setCabinClass(value)
  
}

var PreferredItems = [
  { label: 'REGULAR', value: "REGULAR" },
  { label: 'STUDENT', value: "STUDENT" },
  { label: 'SENIOR CITIZEN', value: "SENIOR_CITIZEN" }
];

const handlePrefferedType = (value) => {
  setPreferred(value)
  
}
const departureDate1 = moment(departureDate).format('YYYY-MM-DD')
const returnDate1 =  moment(returnDate).format('YYYY-MM-DD') 

const handleDepartureAirportSearch = (value) => {
  
  setDisplayFrom(value);
  if (value.length > 0) {
      const filteredAirports = airports
          .filter(airport =>
              airport.airportCode.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 10);
      setDepartureResults(filteredAirports);
      if (filteredAirports.length === 0) {
          const filteredAirports1 = airports
              .filter(airport =>
                  airport.cityName.toLowerCase().includes(value.toLowerCase())
              )
              .slice(0, 10);
          setDepartureResults(filteredAirports1);
      }
  } else {
      setDepartureResults([]);
  }
};
const handleDepartureAirportClick = () => {
  setReturnResults([]);
  let filteredAirports = airports.filter(function (p) {
      return p.display === true
  }).slice(0, 10);
  setDepartureResults(filteredAirports);
  //inputDRef.current.select();
};

const handleDepartureSelect = (data) => {
  if (data.countryCode !== "IN") {
      setIsDomestic("INT")
  }
  var DF = data.airportName + ", " + data.cityName + "(" + data.airportCode + ")";
  setDisplayFrom(DF);
  setLocationFrom(data.airportCode)
  setCityFrom(data.cityName);
  setFrom(data.cityName);
  setDepartureResults([]);
}
const handleReturnAirportSearch = (e) => {
  const value = e.target.value;
  setDisplayTo(value);
  if (value.length > 0) {
      const filteredAirports = airports
          .filter(airport =>
              airport.airportCode.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 10);
      setReturnResults(filteredAirports);
      if (filteredAirports.length === 0) {
          const filteredAirports1 = airports
              .filter(airport =>
                  airport.cityName.toLowerCase().includes(value.toLowerCase())
              )
              .slice(0, 10);
          setReturnResults(filteredAirports1);
      }
  } else {
      setReturnResults([]);
  }
};
const handleReturnAirportClick = (e) => {
  setDepartureResults([]);
  let filteredAirports = airports.filter(function (p) {
      return p.display === true
  }).slice(0, 10);
  setReturnResults(filteredAirports);
 // inputRRef.current.select();
};

const handleReturnSelect = (data) => {
  var DF = data.airportName + ", " + data.cityName + "(" + data.airportCode + ")";
  if (data.countryCode !== "IN") {
      setIsDomestic("INT")
  }
  setDisplayTo(DF);
  setLocationTo(data.airportCode)
  setCityTo(data.cityName);
  setTo(data.cityName);
  setReturnResults([]);
}
const handleSearch = () => {
 
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
          navigation.navigate("OneWayFlight",{journeyType,locationFrom,locationTo,displayFrom,displayTo,adults,kids,infants,cabinClass,departureDate1,returnDate1,cityFrom,cityTo,userId,from,to,requestedBy,isOneWay});
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
        <ScrollView contentContainerStyle={styles.contain} style={{ flex: 1 }} scrollEnabled={outerScrollEnabled}>
          <View><RadioForm
            radio_props={journeytype}
            initial={0}
            onPress={handleJourneyType}
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
              id="displayFrom" name="displayFrom" value={displayFrom} ref={inputDRef} onChangeText={(text) => handleDepartureAirportSearch(text)} onPress={handleDepartureAirportClick} onFocus={handleDepartureAirportClick} placeholder="Search for an airport" autoComplete="off"
              style={styles.Textinput}
            />
            {departureResults.length > 0 &&(
              <View style={styles.listContainer}>
             <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
            onTouchStart={() => setOuterScrollEnabled(false)} 
          onTouchEnd={() => setOuterScrollEnabled(true)}   
          >
              {departureResults.map((airport) =>(
                <TouchableOpacity key={airport.airportCode} onPress={()=>handleDepartureSelect(airport)}>
                <Text style={styles.DepartureText}><Icon1 name="flight-takeoff" color={BaseColor.whiteColor} size={25} />  {airport.cityName} ({airport.airportCode})</Text>
                <View style={{flex:1,flexDirection:"row"}}>
                  <View><Text style={styles.DepartureText1}>{airport.airportName}</Text></View>
                  <View style={{flex:1,justifyContent:"flex-end"}}><Text style={styles.DepartureText2}>{airport.countryName}</Text></View>
                  </View>
                  </TouchableOpacity>
                   ) )}
             </ScrollView>
             </View>
            ) }
              
            <Text body1 bold style={styles.from}>
              {t('TO')}
            </Text>
            <TextInput
              id="displayTo" name="displayTo" value={displayTo} ref={inputRRef} onChangeText={(text) => handleReturnAirportSearch(text)} onPress={handleReturnAirportClick} onFocus={handleReturnAirportClick} placeholder="Search for an airport" autoComplete="off"
              style={styles.Textinput}
            />
            {returnResults.length > 0 &&(
              <View style={styles.listContainer}>
             <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
            onTouchStart={() => setOuterScrollEnabled(false)} 
          onTouchEnd={() => setOuterScrollEnabled(true)}   
          >
              {returnResults.map((airport) =>(
                <TouchableOpacity key={airport.airportCode} onPress={()=> handleReturnSelect(airport)}>
                <Text style={styles.DepartureText}><Icon1 name="flight-land" color={BaseColor.whiteColor} size={25} />  {airport.cityName} ({airport.airportCode})</Text>
                <View style={{flex:1,flexDirection:"row"}}>
                  <View><Text style={styles.DepartureText1}>{airport.airportName}</Text></View>
                  <View style={{flex:1,justifyContent:"flex-end"}}><Text style={styles.DepartureText2}>{airport.countryName}</Text></View>
                  </View>
                  </TouchableOpacity>
                  ) )}
             </ScrollView>
             </View>
            )}
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
               <View><Text body1 regular>{dateReturnShown}</Text></View> 
                <View><Icon1 name="calendar-month" style={styles.calendar} /></View>
                
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
            initial={0}
            onPress={handleClassType}
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
            initial={0}
            onPress={handlePrefferedType}
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
              onPress={() => handleSearch()}>
              {t('search')}
            </Button>
          </View>
        </ScrollView>

      </SafeAreaView>
    </View>
  );
}
