import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {
    paddingHorizontal: 20,
  },
  flightType: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  PassengerType:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20
  },
  contentRow: {flexDirection: 'row', marginTop: 20},
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colCenter: {flex: 1, alignItems: 'center'},
  from:{
    marginTop:10,marginLeft:10

},
from1:{
  marginTop:15,marginLeft:7

},
Textinput:{
    borderWidth:1,
    borderColor:"#E5634D",
    borderRadius:10,
    margin:10,
    width:"95%",
    fontSize:15,
    backgroundColor:"white"
},

DepartureText:{
   fontSize:15,
   color:"white",
   margin:10,
   fontWeight:"bold"

},
DepartureText1:{
  fontSize:13,
  color:"white",
  marginTop:3,
  marginLeft:40,
  fontWeight:"400"

},
DepartureText2:{
  fontSize:13,
  color:"white",
  marginTop:3,
 textAlign:"right",
  fontWeight:"400",
  marginRight:10
},
dateBox: {
  borderColor: "#E5634D",
  backgroundColor: "white",
  borderWidth: 1,
  margin: 10,
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between', // Space between text and icon
    alignItems: 'center',
  padding: 9,
},
calendar:{
fontSize:30,
color:"#E5634D",


},
centerView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  contentPicker: {
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    maxHeight: 250, // Set a specific max height for the container
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor:"#E5634D",
  },
  scrollView: {
    width: '100%',
    height:'100%'
  },
  scrollContainer: {
    flexGrow: 1, // Ensure the content grows to allow scrolling
  },
});