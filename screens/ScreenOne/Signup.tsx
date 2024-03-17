/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TextInput, View, TouchableOpacity, Alert} from 'react-native';
import theme from '../../styles/theme';
import {FIREBASE_AUTH} from '../../utils/firebase';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '@firebase/auth';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const auth = FIREBASE_AUTH;
  const SignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      Alert.alert('error occoured', `${error}`);
      console.log(error);
    }
  };
  const Signup = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
    } catch (error) {
      Alert.alert('error occoured', `${error}`);
      console.log(error);
    }
  };
  function validateEmail(emailer) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailer).toLowerCase());
  }
  function isPasswordStrong(password) {
    // At least 8 characters long, 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  return (
    <View style={{padding: 16, alignItems: 'center', marginTop: '50%'}}>
      <View style={{width: '100%'}}>
        <Text
          style={{
            color: theme.color.black,
            paddingHorizontal: 8,
            paddingVertical: 5,
          }}>
          Email
        </Text>
        <TextInput
          style={[
            {
              width: '100%',
              borderWidth: 2,
              borderRadius: 10,
              color: theme.color.black,
              textAlign: 'left',
              paddingHorizontal: 12,
              textAlignVertical: 'center',
              fontSize: 18,
              borderColor: theme.color.grey,
            },
            emailError && {
              borderColor: theme.color.red,
              backgroundColor: theme.color.lightRed,
            },
          ]}
          editable={true}
          onChangeText={value => {
            setEmail(() => {
              return value;
            });
          }}
          value={email}
        />
        <TouchableOpacity
          onPress={() => {
            if (validateEmail(email)) {
              sendPasswordResetEmail(FIREBASE_AUTH, email).then(res => {
                console.log(res);
              });
            } else {
              setEmailError(() => {
                return true;
              });
            }
          }}>
          <Text
            style={{
              color: theme.color.blue,
              paddingHorizontal: 8,
              paddingVertical: 5,
            }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%'}}>
        <Text
          style={{
            color: theme.color.black,
            paddingHorizontal: 8,
            paddingVertical: 5,
          }}>
          Password
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={[
              {
                width: '90%',
                borderWidth: 2,
                borderRadius: 10,
                color: theme.color.black,
                textAlign: 'left',
                paddingHorizontal: 12,
                textAlignVertical: 'center',
                fontSize: 18,
                borderColor: theme.color.grey,
              },
              passwordError && {
                borderColor: theme.color.red,
                backgroundColor: theme.color.lightRed,
              },
            ]}
            editable={true}
            secureTextEntry={!passwordVisible}
            onChangeText={value => {
              setPassword(() => {
                return value;
              });
            }}
            value={password}
          />
          <TouchableOpacity
            style={{marginLeft: 7}}
            onPress={() => {
              setPasswordVisible(value => {
                return !value;
              });
            }}>
            <View
              style={[
                {
                  height: 20,
                  width: 20,
                  borderRadius: 20,
                  backgroundColor: theme.color.white,
                  borderWidth: 2,
                },
                passwordVisible && {backgroundColor: theme.color.red},
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 40,
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={() => {
          if (validateEmail(email)) {
            if (isPasswordStrong(password)) {
              Signup();
            } else {
              setPasswordError(() => {
                return true;
              });
            }
          } else {
            setEmailError(() => {
              return true;
            });
          }
        }}>
        <View
          style={{
            backgroundColor: theme.color.blue,
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text>Sign up</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 40,
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={SignIn}>
        <View
          style={{
            backgroundColor: theme.color.blue,
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text>Log in</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
