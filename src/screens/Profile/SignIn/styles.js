import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from './../../../config';

export default StyleSheet.create({
  textInput: {
    height: 60,
    backgroundColor: BaseColor.dividerColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: '100%',
    
  },
  contain: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
    
  },
  title:{
     textAlign:"center",
     marginTop:50,
     color:BaseColor.orangeColor
  },
  contentActionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
});