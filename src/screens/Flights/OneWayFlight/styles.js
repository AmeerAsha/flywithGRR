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
Departurelist:{
    backgroundColor:"#E5634D",
    borderRadius:10,
    marginLeft:10,
    color:"white",
    width:"100%",
    position:"relative"
},
DepartureText:{
   fontSize:15,
   color:"white",
   margin:10

},
dateBox: {
  borderColor: "#E5634D",
  backgroundColor: "white",
  borderWidth: 1,
  margin: 10,
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'row',
  padding: 9,
},
calendar:{
fontSize:30,
color:"#E5634D",
marginRight:40,
marginLeft:50,
position:"relative"
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
  flightCount:{
    marginTop:10,marginLeft:10,
    fontSize:20,
    marginBottom:10
},
content: {
  padding: 10,
  borderRadius: 8,
  marginBottom:15
},
contentTop: {
  flexDirection: 'row',
  paddingBottom: 10,
  borderBottomWidth: 1,
},
line: {
  width: '100%',
  height: 1,
  borderWidth: 0.5,
  borderStyle: 'dashed',
},
contentLine: {
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
dot: {
  width: 12,
  height: 12,
  borderRadius: 6,
  position: 'absolute',
},
contentBottom: {
  flexDirection: 'row',
  marginTop: 10,
  justifyContent: 'space-between',
},
bottomLeft: {flexDirection: 'row', alignItems: 'center'},
image: {width: 40, height: 32, marginRight: 10, borderRadius: 16},
resultsbox:{borderColor:"gray",borderWidth:1,borderRadius:5,height:60,backgroundColor:"#E5E4E2",flex:1,flexDirection:"row"},
cities:{marginTop:8,marginLeft:10,},
dates:{marginLeft:10},
editicon:{
  marginTop:10,
  marginLeft:60,
  color:"#E5634D"
  
},
edit:{
  marginLeft:60,
 color:"#E5634D",
 fontWeight:"bold"

}
});