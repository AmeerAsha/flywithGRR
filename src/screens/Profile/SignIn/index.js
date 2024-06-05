import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AuthActions} from './../../../actions';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, useTheme} from './../../../config';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from './../../../components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function SignIn({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({email: true, password: true});

  /**
   * call when action login
   *
   */
  const onLogin = () => {
    if (email == '' || password == '') {
      setSuccess({
        ...success,
        email: false,
        password: false,
      });
    } else {
      setLoading(true);
      dispatch(
        AuthActions.authentication(true, response => {
          setLoading(false);
          navigation.goBack();
        }),
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text title1 style={styles.title}        
      >{t('Sign In')}</Text>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <View style={styles.contain}>
            <TextInput
            full
              onChangeText={text => setEmail(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  email: true,
                });
              }}
              placeholder={t('Email')}
              success={success.email}
              value={email}
              style={styles.textInput}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={text => setPassword(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  password: true,
                });
              }}
              placeholder={t('Password')}
              secureTextEntry={true}
              success={success.password}
              value={password}
              
            />
            <Button
              style={{marginTop: 20}}
              full
              loading={loading}
              onPress={() => {
                onLogin();
              }}>
              {t('Log In')}
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text title3  style={{marginTop: 25}}>
                {t('Forgot Password ?')}
              </Text>
            </TouchableOpacity>
            <View style={styles.contentActionBottom}>
            <Text body1 grayColor>
                {t("Don't have an account yet? Please")}
              </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{marginHorizontal:10}}>
              <Text body1 bold primaryColor>
                {t("Sign Up")}
              </Text>
            </TouchableOpacity>
            
          </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
