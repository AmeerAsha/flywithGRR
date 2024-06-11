import React, {useState, useEffect, useMemo } from 'react';
import {View, ScrollView,SafeAreaView,TextInput, TouchableOpacity} from 'react-native';
import {BaseStyle, Images, useTheme,BaseColor} from "./../../../config";
import APIConfig, { APIACTIVATEURL } from "./../../../Configuration/APIConfig";
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Header,Icon,BookingTime,Tag,FormOption,QuantityPicker,Button,Text,} from './../../../components';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


export default function FlightSearch({navigation}) {
    const [isOneWay, setIsOneWay] = useState(false);
    const [journeyType, setJourneyType] = useState("0");
    const [value, setValue]= useState(0)
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
    const dateDepartureShown = moment(departureDate).format('dddd, DD MMM yyyy');
    const dateReturnShown = moment(returnDate).format('dddd, DD MMM yyyy');
    const newDate = new Date(departureDate).setDate(xyz)
    const xyz = departureDate.getDate()+1
    console.log(dateReturnShown)
           
    const {colors} = useTheme();
    const {t} = useTranslation();

  const [round, setRound] = useState(true);
  const [regular, setRegular] = useState(true)
  const [student, setStudent] = useState(false)
  const [seniorcitizen, setSeniorCitizen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState();

  var journeytype = [
    {label: 'Return', value: 0 },
    {label: 'One Way', value: 1 }
  ];
const handleJourneyType = (value) => {
  if (value === "1") {
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
    }else{
      setDLocations("")
    }
    setDisplayFrom(text);
}

const handleReturnLocationChange = (text) => {
  
  if (text.trim().length > 2) {
      getRLocation(text)
  }else{
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
  

  

  /**
   * select FlightType
   * @param {*} round
   */
  const onSetFlightType = round => {
    setRound(round);
  };

  

  
  const onSetRegular =regular => {
    setStudent(false);
    setSeniorCitizen(false)  
    setRegular(regular)
  };
  const onSetStudent = student => {
    setRegular(false);
    setSeniorCitizen(false)  
    setStudent(student)
  };

  const onSetSeniorCitizen = seniorcitizen => {
    setStudent(false);
    setRegular(false) 
    setSeniorCitizen(seniorcitizen) 
  };


  /**
   * onSelect Flight
   * @param {*} type
   */
  

  return (
    <View style={{flex:1}}>
      <Header title={t('')}/>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView contentContainerStyle={styles.contain} style={{flex: 1}}>
          <View><RadioForm
          radio_props={journeytype}
          initial={value}
          onPress={(value)=>handleJourneyType(value)}
          labelHorizontal
          formHorizontal
          labelColor="black"
          buttonColor="black"
          selectedButtonColor="#E5634D"
          buttonSize={17}
          labelStyle={{fontSize:18, marginRight:10}}
        /></View>
          
          <View>
        <Text body1 bold style={styles.from}>
          {t('FROM')}
        </Text>
        <TextInput
        id="displayFrom"  name="displayFrom" value={displayFrom} onChangeText={(text)=>handleDepartureLocationChange(text)}  placeholder="Departure" autoComplete="off" 
        style={styles.Textinput}
        />
        <View style={styles.Departurelist}>
          {Dlocations ? 
          Dlocations.map(location => <View><TouchableOpacity onPress={selectdepartureLocationHandle.bind(null, location)} ><Text style={styles.DepartureText}><Icon1 name="flight-takeoff" color={BaseColor.whiteColor} size={25}/>  {location.airportName},{location.cityName},({location.airportCode})</Text></TouchableOpacity></View>):""}
        
        </View>
        
      <Text body1 bold style={styles.from}>
          {t('TO')}
        </Text>
        <TextInput
        id="displayTo"  name="displayTo" value={displayTo} onChangeText={(text)=>handleReturnLocationChange(text)}  placeholder="Arrival" autoComplete="off" 
        style={styles.Textinput}
        />
        <View style={styles.Departurelist}>
          {Rlocations ? 
          Rlocations.map(location => <View><TouchableOpacity onPress={selectReturnLocationHandle.bind(null, location)}><Text style={styles.DepartureText}><Icon1 name="flight-land" color={BaseColor.whiteColor} size={25} />  {location.airportName},{location.cityName},({location.airportCode})</Text></TouchableOpacity></View>):""}
        
        </View>
        
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
        
    <TouchableOpacity
              onPress={showDatepicker.bind(null, 'to')}
              style={styles.dateBox}
          >
            <Text body1 regular>{dateReturnShown}</Text>
            <Icon1 name="calendar-month" style={styles.calendar} />
          </TouchableOpacity>
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
          <Text body1 bold style={{marginTop:30,marginHorizontal:100}}>
          {t('TRAVELLERS')}
        </Text>
          
          <View style={{marginTop:5, flexDirection: 'row'}}>
          
            <QuantityPicker
              label={t('adults')}
              detail={`>= 12 ${t('years')}`}
              value={1}
            />
            <QuantityPicker
              label={t('children')}
              detail={`2 - 12 ${t('years')}`}
              value={1}
              style={{marginHorizontal: 15}}
            />
            <QuantityPicker
              label={t('infants')}
              detail={`<= 2 ${t('years')}`}
              value={1}
            />
          </View>
          <View style={styles.PassengerType}>
            <Tag
              outline={!regular}
              primary={regular}
              round
              onPress={onSetRegular}
              style={{marginHorizontal: 10}}>
              {t('REGULAR')}
            </Tag>
            <Tag
              outline={!student}
              primary={student}
              round
              onPress={onSetStudent}
              style={{marginHorizontal: 10}}>
              {t('STUDENT')}
            </Tag>
            <Tag
              outline={!seniorcitizen}
              primary={seniorcitizen}
              round
              onPress={onSetSeniorCitizen}
              style={{marginHorizontal: 10}}>
              {t('SENIOR CITIZEN')}
            </Tag>
          </View>
          <View style={{padding: 20,marginHorizontal:40}}>
          <Button
            loading={loading}
            full
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                navigation.navigate('FlightResult');
                setLoading(false);
              }, 500);
            }}>
            {t('search')}
          </Button>
        </View>
        </ScrollView>
        
      </SafeAreaView>
    </View>
  );
}
