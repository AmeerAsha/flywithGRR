import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BaseColor, useTheme, useFont} from './../config';
import {Icon} from './../components';
import {useTranslation} from 'react-i18next';
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Fontisto'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import Home from '../screens/Home/Home';
import FlightSearch from '../screens/Flights/FlightSearch';


import Login from '../screens/Login/Login';
import HotelSearch from '../screens/Hotel/HotelSearch';
import AboutUs from '../screens/AboutUs/index.';


const Tab = createBottomTabNavigator();


const Bottomnavigation = () => {
    const {colors} = useTheme();
    const font = useFont();
    const {t} = useTranslation();
    
  return (
    <>
      <StatusBar />
      
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return <Icon name="home" size={size} color={color} />;
              } else if (route.name === 'Flights') {
                return <Icon1 name="flight-takeoff" size={size} color={color} />;
              } else if (route.name === 'Hotel') {
                return <Icon name="hotel" size={size} color={color} />;
              }else if (route.name === 'AboutUs'){
                return <Icon2 name="persons" size={size} color={color} />;
              }else if (route.name === 'Login'){
                return <Icon3 name="account-circle" size={size} color={color} />;
              } 
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: BaseColor.grayColor,
            tabBarStyle: [
              {
                display: 'flex',
              },
              null,
            ],
            tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: font,
                paddingBottom: 2,
              },
              headerShown:false
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Flights" component={FlightSearch} />
          <Tab.Screen name="Hotel" component={HotelSearch} />
          <Tab.Screen name='AboutUs'component={AboutUs}/>
          <Tab.Screen name='Login'component={Login}/> 
          
        </Tab.Navigator>
        
    </>
  );
};

export default Bottomnavigation;