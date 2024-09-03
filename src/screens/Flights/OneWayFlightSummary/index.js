import React, { useEffect, useState,useRef } from 'react'
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View, Modal, Animated ,Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BaseColor, BaseStyle ,useTheme} from '../../../config'
import styles from './styles';
import moment from 'moment';
import PageLoader from "../../Layout/PageLoader";
import { Text } from '../../../components';
import { Images } from '../../../config';
import Icon1 from 'react-native-vector-icons/AntDesign'
const OneWayFlightSummary = ({route,navigation}) => {
  const [loading, setLoading] = useState(true);
  const [segments, setSegments] = useState([]);
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [baseprice, setBasePrice] = useState(0)
    const [tax, setTax] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalFare, setTotalFare] = useState(0)
    const [convenienceFee, setConvenienceFee] = useState(0)
    const [gst, setGST] = useState(0)
    const [gstAmount, setGSTAmount] = useState(0)

    const {flightsdata,searchData} = route.params;
    useEffect(()=>{
            //setFlightData(state.flightsdata)
            setSegments(flightsdata.tFSegments)
            setBasePrice(flightsdata.tFPriceDetails.basePrice)
            setTax(flightsdata.tFPriceDetails.tax)
            setTotalPrice(flightsdata.tFPriceDetails.totalPrice)
            setTotalFare(flightsdata.tFPriceDetails.totalFare)
            setConvenienceFee(flightsdata.tFPriceDetails.convenienceFee)
            setGST(flightsdata.tFPriceDetails.gst)
            setGSTAmount(flightsdata.tFPriceDetails.gstAmount)
           // setFlightPriceData(flightsdata.tfPriceDetails);
     },
     
     []);
     function getTimeFromMins(mins) {
      var h = mins / 60 | 0, m = mins % 60 | 0;
      var durationformat = h + "h " + m + "m";
      return durationformat;
    };
    const openModal = () => {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Final position (on-screen)
        duration: 300, // Duration of the animation
        useNativeDriver: true,
      }).start();
    };
  
    const closeModal = () => {
      Animated.timing(slideAnim, {
        toValue: 300, // Back to initial position (off-screen)
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false)); // Close the modal after the animation
    };
    const HandleFlightSearch = () => {
      navigation.navigate('OneWayFlight')
    }
  return (
    <SafeAreaView style={BaseStyle.safeAreaView}
    edges={['right', 'left', 'bottom']}>
      
      <ScrollView  contentContainerStyle={styles.contain} style={{ flex: 1 }}>
        <View style={styles.TopView}>
          <View style={styles.planeView}><Icon name="plane" size={23} style={styles.planesymbol} solid /></View>
        <View style={styles.content}>
        <Text body2 bold style={styles.cabin}>{searchData.cabinClass} CLASS</Text>
        <Text headline bold style={styles.cities}>{searchData.cityFrom}({searchData.locationFrom})  <Icon name="arrow-right"size={25} color={BaseColor.grayColor} />  {searchData.cityTo}({searchData.locationTo})</Text>
        <Text body2 bold style={styles.date}>{moment(searchData.departureDate).format('DD MMM YYYY')}</Text>
        </View>
        </View>
        <View style={styles.TopView}>
        {segments.length > 0 ? segments.map((seg, index) =>
        <View>
          <View style={styles.bottomLeft}>
            <View style={styles.depView}>
            <Text body2 semibold style={{color:"#CE3426"}}>Departure</Text>
            </View>
          
          <Text body2 style={styles.dep}>{moment(seg.tFDepartureData.departureDateTime).format('DD MMM YYYY')}</Text>
          <TouchableOpacity style={styles.fareRules} onPress={openModal}><Text body2 style={styles.faretxt}>Fare Rules</Text></TouchableOpacity>
          <Modal transparent visible={modalVisible} animationType="none">
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
              <View style={styles.modal}>
              <Text title3 bold primaryColor>Fare Rules</Text>
              <TouchableOpacity onPress={closeModal}><Text style={styles.close}><Icon1 name="closecircle"  size={25}/></Text></TouchableOpacity>
              </View>
              
            </Animated.View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
          </View>
          <View style={styles.bottomLeft}>
             <Image source={Images.A0} style={styles.image}/>   
          <View>
            <Text body1 semibold accentColor>
            {seg.airline}
            </Text>
            <Text caption2 light>
            {seg.equimentType + "-" + seg.flightNumber}
            </Text>
          </View>
        </View>
        <View style={styles.contentinfo}>
          <Text headline black>
          {moment(seg.tFArrivalData.arrivalDateTime).format('hh:mm A')}
          </Text>
          <Text style={{color:BaseColor.dividerColor}}>{seg.tFDepartureData.airportName}, {seg.tFDepartureData.city}</Text>
          <View style={styles.contentLine}>
            <View style={styles.line} />
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
          {getTimeFromMins(seg.duration)}
          </Text>
          <Text headline black>
          {moment(seg.tFArrivalData.arrivalDateTime).format('hh:mm A')}
          </Text>
          <Text style={{color:BaseColor.dividerColor}}>{seg.tFArrivalData.airportName}, {seg.tFArrivalData.city}</Text>
        </View>
        </View>
      )
        
        :""}
        </View>
        <View style={styles.btmView}>
          <Text title3 bold>Payment Summary</Text>
          <View style={styles.payment1}>
            <Text body1>Base Fare</Text>
            <Text body1 bold style={styles.price1}>INR {Math.round(baseprice)}</Text>
          </View>
          <View style={styles.payment2}>
            <Text body1>Tax & Service Fee</Text>
            <Text body1 bold style={styles.price2}>INR {Math.round(tax)}</Text>
          </View>
          <View style={styles.line1} />
          <View style={styles.payment2}>
            <Text body1 bold>Total Price</Text>
            <Text body1 bold style={styles.price3}>INR {Math.round(totalPrice)}</Text>
          </View>
          <View style={styles.lastview}>
           <View style={{backgroundColor:"#cb3022",paddingHorizontal:10,paddingVertical:20,marginLeft:10,borderRadius:7}}><TouchableOpacity onPress={() => {navigation.goBack();}}><Text headline bold whiteColor>Back to Flights List</Text></TouchableOpacity></View> 
            <View style={{backgroundColor:"blue",paddingHorizontal:30,paddingVertical:20,marginLeft:30,borderRadius:7}} ><TouchableOpacity><Text headline bold whiteColor>Submit</Text></TouchableOpacity></View>
          </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default OneWayFlightSummary
