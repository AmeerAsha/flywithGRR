import axios from 'axios';
import React, { useState } from 'react'
import {ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import APIConfig, { APIACTIVATEURL } from '../../Configuration/APIConfig';
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import styles from './styles';
import {useTheme,BaseColor} from './../../config';
import {useTranslation} from 'react-i18next';
import {Icon, Text} from './../../components';
import PropTypes from 'prop-types';

export default function FlightPlan1(props){
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

    const {t} = useTranslation();
    const {colors} = useTheme();
    const {round} = props;
    

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
  return (
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
  )
}
FlightPlan1.propTypes = {
  
  round: PropTypes.bool,
  
};

FlightPlan1.defaultProps = {
 
  round: true,
  
};




