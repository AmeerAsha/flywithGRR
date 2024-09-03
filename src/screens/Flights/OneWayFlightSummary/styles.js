import {StyleSheet} from 'react-native';
import { BaseColor, BaseStyle ,useTheme} from '../../../config'

export default StyleSheet.create({
    TopView:{
        flex:1,
        flexDirection:"row",
        backgroundColor:"white",
        marginTop:20,
        paddingHorizontal:5,
        paddingVertical:20
    },
    contain: {
        paddingHorizontal: 10,
      },
      planesymbol:{
        margin:10,
        color:"#CE3426"
      },
      planeView:{
        backgroundColor:"#ffe2e0",
        marginBottom:18,
        marginLeft:3,
        borderRadius:5,
        
      },
      cabin:{
        color:"#088675",
        marginLeft:4
      },
      cities:{
        color:"#233D7F",
        marginLeft:2,
        marginBottom:5
      },
      date:{
        color:"#9B9B9B",
        marginLeft:4
      },
      content:{
        flex:1,
        flexDirection:"column",
        marginLeft:2
      },
      bottomLeft:{flexDirection: 'row',justifyContent:"flex-start",marginHorizontal:15},
      dep:{
        marginLeft:10,
        color:BaseColor.dividerColor
      },
      depView:{
        backgroundColor:"#ffe2e0",
        paddingHorizontal:8,
        paddingVertical:8,
        marginBottom:5,
        borderRadius:5
        
      },
      line: {
        width: '50%',
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
      line: {
  width: '50%',
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
contentinfo:{
  flex:1.5,
  alignItems:"center",
  margin:10
  
},
fareRules:{
  marginHorizontal:50,
  backgroundColor:"#E5634D",
  borderRadius:5,
  paddingHorizontal:8,
  paddingVertical:8
},
faretxt:{
  color:"white"
},
close:{
color:"#E5634D",

},
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
  backgroundColor: 'white',
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  height: 400,
},
btmView:{
  flex:1,
  
  backgroundColor:"white",
  marginTop:40,
  paddingHorizontal:5,
  paddingVertical:20
},
payment1:{
  flex:1,
  marginLeft:30,
  paddingVertical:10,
  flexDirection:"row",
  marginTop:40,
},
payment2:{
  flex:1,
  marginLeft:30,
  paddingVertical:10,
  flexDirection:"row",
  marginTop:10,
},
price1:{
  marginLeft:100
},
price2:{
  marginLeft:42
},
price3:{
  marginLeft:100,
  color:"#cb3022"
},
line1: {
  width: '80%',
  height: 0.1,
  borderWidth: 0.3,
  borderStyle: "dotted",
  marginLeft:30,
  marginTop:30,
  marginBottom:10
},
lastview:{
    flex:1,
    flexDirection:"row",
    marginTop:10,
    paddingHorizontal:5,
    
}

})