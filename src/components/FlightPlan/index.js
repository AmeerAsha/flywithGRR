import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, Text} from './../../components';
import styles from './styles';
import {useTheme} from './../../config';
import {useTranslation} from 'react-i18next';
import Sample from '../../screens/Sample';
import FlightPlan1 from '../FlightPlan1';

export default function FlightPlan(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {style, from, fromCode, to, toCode, round, onPressFrom, onPressTo} =
    props;
  return (
    
      
       <FlightPlan1/>
        
        
        
      
      
      
    
  );
}

FlightPlan.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  round: PropTypes.bool,
  fromCode: PropTypes.string,
  toCode: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  onPressFrom: PropTypes.func,
  onPressTo: PropTypes.func,
};

FlightPlan.defaultProps = {
  style: {},
  round: true,
  fromCode: 'SIN',
  toCode: 'SYD',
  from: 'Singapore',
  to: 'Sydney',
  onPressFrom: () => {},
  onPressTo: () => {},
};
