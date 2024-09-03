import { Modal, StatusBar, TouchableOpacity, View, Animated ,StyleSheet,Text} from 'react-native';
import React, { useRef, useState } from 'react';
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
import HotelSearch from '../screens/Hotel/HotelSearch';
import AboutUs from '../screens/AboutUs/index.';
import SignIn from '../screens/Profile/SignIn';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();


const Bottomnavigation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
    const {colors} = useTheme();
    const font = useFont();
    const {t} = useTranslation();
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
    
  return (
    <>
    <StatusBar />
    <TouchableOpacity style={styles.fareRules} onPress={openModal}><Text body2 style={{textAlign:"center"}}><Icon4 name="drag-horizontal-variant"  size={40}/></Text></TouchableOpacity>
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
            tabBarActiveTintColor: BaseColor.blueColor,
            tabBarInactiveTintColor: BaseColor.whiteColor,
            tabBarStyle: [
              {
                display: 'flex',
                backgroundColor:colors.primary,
                borderTopLeftRadius:50,
                borderTopRightRadius:50,
                height:70
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
          <Tab.Screen name='Login'component={SignIn}/> 
          
        </Tab.Navigator>
        
    </>
  );
};
const styles =StyleSheet.create({
  modal:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between"
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.primary,
      padding: 20,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      height: 70,
    },

})

export default Bottomnavigation;
