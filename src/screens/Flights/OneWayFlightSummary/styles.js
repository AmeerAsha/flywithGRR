import {StyleSheet} from 'react-native';


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
        marginBottom:10,
        marginLeft:3,
        
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
      bottomLeft:{flexDirection: 'row', alignItems: 'center',justifyContent:"space-around"},

})