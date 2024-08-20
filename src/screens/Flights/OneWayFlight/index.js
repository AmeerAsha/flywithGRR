import React, { useState, useEffect} from 'react';
import { View, ScrollView, SafeAreaView, TextInput, TouchableOpacity ,RefreshControl,Animated,Image} from 'react-native';
import { BaseStyle, Images, useTheme, BaseColor } from "./../../../config";

import APIConfig, { APIACTIVATEURL } from "./../../../Configuration/APIConfig";
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
import styles from './styles';
import PageLoader from "../../Layout/PageLoader";
import { useTranslation } from 'react-i18next';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Header, Icon, BookingTime, Tag, FormOption, QuantityPicker, Button, Text, } from './../../../components';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export const getImagePath = (imageName) => {
  switch (imageName) {
    case 'A0':
      return require('./../../../assets/images/0A.png');
    case 'D0':
      return require('./../../../assets/images/0D.png');
    case 'A2':
      return require('./../../../assets/images/2A.png');
    case 'B2':
       return require('./../../../assets/images/2B.png');
    // Add more cases as needed
    // Fallback image
  }
};
const OneWayFlight = ({ navigation,route,imageName}) => {
    const [searchData, setSearchData] = useState({});
    const [flightRequest, setFlightRequest] = useState({});
    const [flights, setFlights] = useState([]);
    const [packages, setPackages] = useState([]);
    const [tempPackages, setTempPackages] = useState([]);
    const [airlines, setAirlines] = useState([]);
    const [stops, setStops] = useState([]);
    const [noFlight, setNoFlight] = useState(false);
    const [airlinesCode, setAirlinesCode] = useState([])

  
  const [Dlocations, setDLocations] = useState([]);
  const [Rlocations, setRLocations] = useState([]);
  const [isDomestic, setIsDomestic] = useState("DOM");
  
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  
  const [preffered, setPreferred] = useState("REGULAR");
  
  const [agentId, setAgentId] = useState("00000000-0000-0000-0000-000000000000");
  
  const [loading, setLoading] = useState(true);
  const dateDepartureShown = moment(departureDate).format('dddd, DD MMM yyyy');
  const dateReturnShown = moment(returnDate).format('dddd, DD MMM yyyy');
  
  const {journeyType,locationFrom,locationTo,displayFrom,displayTo,adults,kids,infants,cabinClass,departureDate1,returnDate1,cityFrom,cityTo,userId,from,to,requestedBy,isOneWay} = route.params;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [refreshing] = useState(false);
  
  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    40,
  );
  

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
  }

  var CabinItems = [
    { label: 'ECONOMY', value: "ECONOMY" },
    { label: 'BUSINESS', value: "BUSINESS" },
    { label: 'FIRST', value: "FIRST" }
  ];
  
  const handleClassType = (value) => {
    setCabinClass(value)
    
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

function getTimeFromMins(mins) {
  var h = mins / 60 | 0, m = mins % 60 | 0;
  var durationformat = h + "h " + m + "m";
  return durationformat;
}
let add = Number(adults) + Number(kids) + Number(infants);
console.log(add);
useEffect(()=>{
 BindPageData();
},

[]);
const depdate = moment(departureDate1).format('DDMMM')



const handleSearch = () => {
  
  
  if (isOneWay) {                
          navigation.navigate("OneWayFlight");
          BindPageData(searchQuery)
      }
      else {
          if (isDomestic === "INT") {                    
              navigation.navigate('/oneway-flights/' + adults + "/" + kids + "/" + infants + "/" + isDomestic, { state: { searchQuery },replace:true });
              BindPageData(searchQuery);
          }
          else {
              navigation.navigate('/roundtrip-flights/' + adults + "/" + kids + "/" + infants + "/" + isDomestic, { state: { searchQuery } });
          }
      
  }
}

const BindPageData = () => {
  const searchQuery = {
    "journeyType": "ONEWAY",
    "locationFrom": locationFrom,
    "locationTo": locationTo,
    "displayFrom": displayFrom,
    "displayTo": displayTo,
    "adults": adults,
    "kids": kids,
    "infants": infants,
    "cabinClass": cabinClass,
    "departureDate": departureDate1,
    "returnDate": returnDate1,
    "cityFrom": cityFrom,
    "cityTo": cityTo,
    "userId": userId,
    "agentId": agentId,
    "from": from,
    "to": to,
    "requestedBy": requestedBy,
    "isOneWay":isOneWay
  }
  setLoading(true)
  GetFlights(searchQuery);
  setSearchData(searchQuery)
  
}

  const GetFlights = (searchQuery) => {
    axios
        .post(APIConfig.APIACTIVATEURL + APIConfig.SEARCHFLIGHTS, searchQuery)
        .then((response) => {
          if (response.data.response.succeeded) {
            setNoFlight(true);
            setFlights(response.data.response.data)
            console.log(response.data.response.data)
            setFlightRequest(response.data)
            setTempPackages(response.data.response.data)
            var ddata = response.data.response.data;
            setStops([...new Set(ddata.map(flight => flight.stops))].sort((a, b) => a - b));
            setAirlines([...new Set(ddata.flatMap(flight => flight.tFSegments.map(segment => segment.airline)))]);
            setLoading(false);
        }
        else {
            setNoFlight(false);
            setLoading(false);
        }
        }).catch(function (error) {
          setNoFlight(false);
          setLoading(false);
          console.log(error)
      });
};
const handleSubmit =(flightsdata)=> {
  navigation.navigate('OneWayFlightSummary',{flightsdata,searchData})
}

const renderContent = () => {
  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, 40],
    outputRange: [0, -40],
    extrapolate: 'clamp',
  });
  return (
    <View style={{flex: 1}}>
      <Animated.FlatList
        contentContainerStyle={{
          paddingTop: 50,
        }}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={() => {}}
          />
        }
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollAnim,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        
        
        />
        </View>
    );
  };

  
  return (
    <View style={{ flex: 1 }}>
      <Header title={t('')}
      renderLeft={() => {
        return (
          <Icon
            name="arrow-left"
            size={20}
            color={colors.primary}
            enableRTL={true}
          />
        );
      }}
      onPressLeft={() => {
        navigation.goBack();
      }} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
          {loading === true ? <PageLoader></PageLoader> :
          <ScrollView  contentContainerStyle={styles.contain} style={{ flex: 1 }}>
            <View style={styles.resultsbox}>
          <View >
            <Text body1 bold style={styles.cities}>{cityFrom} to {cityTo}</Text>
          <View style={{flex:1,flexDirection:"row"}}>
          <Text body2 semibold color={BaseColor.greenColor} style={styles.dates}>{depdate}  |</Text>
          {kids && infants ?(
            <Text body2 semibold color={BaseColor.greenColor} style={styles.dates}>{add} Travellers |</Text>
          ):(
            <Text body2 semibold color={BaseColor.greenColor} style={styles.dates}>{adults} Adults |</Text>
          )}
           <Text body2 semibold color={BaseColor.greenColor} style={styles.dates}>{cabinClass}</Text>
          </View>
          </View> 
          <View>
            <TouchableOpacity onPress={() => {
        navigation.goBack();
      }} >
              <Text style={styles.editicon}><Icon1 name="edit"  size={22}/></Text>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
           
          </View>
         </View>
          <View>
          <Text body1 bold style={styles.flightCount}>
              Showing {flights.length} Search Results for {searchData.cityFrom} - {searchData.cityTo}
            </Text>
            <View>
            {flights.length > 0 && flights.map((flight, index) =>
          <View>
            <TouchableOpacity
      style={[styles.content, {backgroundColor: "white"} ]}
      onPress={() => handleSubmit(flight)}
      >
      <View style={[styles.contentTop, {borderBottomColor: colors.border}]}>
        <View style={{flex: 1}}>
        <Text body2 accentColor bold >Departure</Text>
          <Text body2>{moment(flight.tFSegments[0].tFDepartureData.departureDateTime).format('DD MMM yyyy')}</Text>
          <Text body2>{moment(flight.tFSegments[0].tFDepartureData.departureDateTime).format('hh:mm A')}</Text>
          <Text footnote grayColor bold>
          {flight.tFSegments[0].tFDepartureData.airportCode}
          </Text>
        </View>
        <View style={{flex: 1.5, alignItems: 'center'}}>
          <Text headline black>
          {getTimeFromMins(flight.tFSegments[0].duration)}
          </Text>
          <View style={styles.contentLine}>
            <View style={[styles.line, {borderColor: colors.border}]} />
            <Icon
              name="plane"
              color={BaseColor.dividerColor}
              size={24}
              solid
              enableRTL={true}
            />
            <View style={[styles.dot, {backgroundColor: colors.primary}]} />
          </View>
          <Text footnote grayColor bold>
          {flight.stops === 0 ? "Non Stop" : flight.stops == 1 ? "1 Stop" : flight.stops + "Stops"}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text body2 accentColor bold >Arrival</Text>
          <Text body2>{moment(flight.tFSegments.slice(-1)[0].tFArrivalData.arrivalDateTime).format('DD MMM yyyy')}</Text>
          <Text body2>{moment(flight.tFSegments.slice(-1)[0].tFArrivalData.arrivalDateTime).format('hh:mm A')}</Text>
          <Text footnote grayColor bold>
          {flight.tFSegments.slice(-1)[0].tFArrivalData.airportCode}
          </Text>
        </View>
      </View>
      <View style={styles.contentBottom}>
        <View style={styles.bottomLeft}>
          
             
             <Image source={{uri:'file:///assets/images/0A.png'}} style={styles.image}/>
             
          <View>
            <Text body1 semibold accentColor>
            {flight.tFSegments[0].airline}
            </Text>
            <Text caption2 light>
            {flight.tFSegments[0].equimentType + "-" + flight.tFSegments[0].flightNumber}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text title3 bold primaryColor>
          INR {Math.round(flight.tFPriceDetails.totalPrice)}
          </Text>
          
        </View>
      </View>
    </TouchableOpacity>
          </View>
        )}
            </View>
            

          </View>
          </ScrollView>
}
        </SafeAreaView>
    </View>
  )
}

export default OneWayFlight
