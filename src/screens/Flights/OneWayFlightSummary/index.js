import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BaseColor, BaseStyle } from '../../../config'
import styles from './styles';
import moment from 'moment';
import PageLoader from "../../Layout/PageLoader";
import { Text } from '../../../components';
import { Images } from '../../../config';

const OneWayFlightSummary = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [segments, setSegments] = useState([])

    const {flightsdata,searchData} = route.params;
    useEffect(()=>{
      setSegments(flightsdata.tFSegments)
     },
     
     []);
     function getTimeFromMins(mins) {
      var h = mins / 60 | 0, m = mins % 60 | 0;
      var durationformat = h + "h " + m + "m";
      return durationformat;
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
          <Text body2 accentColor bold>Departure</Text>
          <Text body2>{moment(seg.tFDepartureData.departureDateTime).format('DD MMM YYYY')}</Text>
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
        <View style={{flex: 1.5, alignItems: 'center'}}>
          <Text headline black>
          {moment(seg.tFArrivalData.arrivalDateTime).format('hh:mm A')}
          </Text>
          <View style={styles.contentLine}>
            <View style={styles.line} />
            <Icon
              name="plane"
              color={BaseColor.dividerColor}
              size={24}
              solid
              enableRTL={true}
            />
            <View style={styles.dot} />
          </View>
          <Text footnote grayColor bold>
          {getTimeFromMins(seg.duration)}
          </Text>
        </View>
        </View>
      )
        
        :""}
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default OneWayFlightSummary
