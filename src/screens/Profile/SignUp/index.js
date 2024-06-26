import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import {BaseStyle, useTheme} from './../../../config';
import {Header, SafeAreaView, Icon, Button, TextInput,Text} from './../../../components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function SignUp({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    name: true,
    email: true,
    address: true,
  });

  /**
   * call when action signup
   *
   */
  const onSignUp = () => {
    if (name == '' || email == '' || address == '') {
      setSuccess({
        ...success,
        name: name != '' ? true : false,
        email: email != '' ? true : false,
        address: address != '' ? true : false,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('SignIn');
      }, 500);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text title1 style={styles.title}        
      >{t('Register')}</Text>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <View style={styles.contain}>
            <TextInput
              onChangeText={text => setName(text)}
              placeholder={t('Name')}
              success={success.name}
              value={name}
              style={styles.textInput}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
              placeholder={t('Email')}
              keyboardType="email-address"
              success={success.email}
              value={email}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setAddress(text)}
              placeholder={t('Phone Number')}
              success={success.address}
              value={address}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setAddress(text)}
              placeholder={t('Password')}
              success={success.address}
              value={address}
            />
            <Button
              full
              style={{marginTop: 20}}
              loading={loading}
              onPress={() => onSignUp()}>
              {t('Register')}
            </Button>
            <View style={styles.contentActionBottom}>
            <Text body1 grayColor>
                {t("Already have an account? Please")}
              </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={{marginHorizontal:10}}>
              <Text body1 bold primaryColor>
                {t("Sign In")}
              </Text>
            </TouchableOpacity>
            
          </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
