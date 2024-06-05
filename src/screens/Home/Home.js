import React, { useState } from 'react'
import { Text, View,Animated,ScrollView } from 'react-native'
import FlightSearch from '../Flights/FlightSearch'
import {BaseStyle, Images, useTheme} from './../../config';
import styles from './styles';
import * as Utils from './../../utils'


const Home = ({navigation}) => {
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const deltaY = new Animated.Value(0);
  const heightImageBanner = Utils.scaleWithPixel(800);
  const marginTopBanner = heightImageBanner - heightHeader;
  return (
    <ScrollView style={{flex: 1}}>
      <Animated.Image
        source={Images.trip7}
        style={[
          styles.imageBackground,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(100),
                Utils.scaleWithPixel(100),
              ],
              outputRange: [heightImageBanner, heightHeader, 0],
            }),
          },
        ]}
      />

    <FlightSearch style={{flex: 1,margin:30,marginTop:100,borderWidth:0.5,borderRadius:15,backgroundColor:"black",borderColor:"gray"}}/>
    </ScrollView>
  )
}

export default Home
