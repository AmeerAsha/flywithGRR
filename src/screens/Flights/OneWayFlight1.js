import React from 'react'
import { Text, View } from 'react-native'

const OneWayFlight1 = ({route}) => {
    const {journeyType,locationFrom,locationTo,displayFrom,displayTo,adults,kids,infants,cabinClass,departureDate1,returnDate1,cityFrom,cityTo,userId,from,to,requestedBy,isOneWay} = route.params;
  return (
    <View>
        <Text>{journeyType}</Text>
        <Text>{locationFrom}</Text>
        <Text>{displayFrom}</Text>
        <Text>{adults}</Text>
    </View>
  )
}

export default OneWayFlight1
