import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from './../../../config';

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
  textInput: {
    height: 60,
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: '100%',
    borderWidth:0.5,
    borderColor:BaseColor.orangeColor
  },
  contentActionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  title:{
    textAlign:"center",
    marginTop:50,
    color:BaseColor.orangeColor
 },
});