/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import theme from '../../styles/theme';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {setDoc, doc, onSnapshot, addDoc, collection} from 'firebase/firestore';
import {FIREBASE_DB} from '../../utils/firebase';
import {useFocusEffect} from '@react-navigation/native';
const TextUpload = () => {
  const [textTobeUploaded, setTextTobeUploaded] = useState('');
  const [textArray, setTextArray] = useState<object[]>();
  async function uploadTextToFirebase(TextObject: object) {
    await addDoc(collection(FIREBASE_DB, 'NordstoneData'), TextObject).then(
      () => {
        setTextTobeUploaded(() => {
          return '';
        });
      },
    );
  }
  useFocusEffect(
    useCallback(() => {
      const unsub = onSnapshot(
        collection(FIREBASE_DB, 'NordstoneData'),
        snapshot => {
          let TempArray = [];
          snapshot.docChanges().forEach(change => {
            console.log(change.doc.data());
            TempArray.push(change.doc.data());
          });
          setTextArray(TempArray);
        },
      );
      setInterval(function () {
        unsub();
      }, 3000);
    }, []),
  );
  // function getUploadedText() {
  //   const unsub = onSnapshot(
  //     doc(FIREBASE_DB, 'NordstoneData', 'UploadedText'),
  //     value => {
  //       console.log(value);
  //     },
  //   );
  // }
  // useEffect(() => {
  //   getUploadedText();
  // }, []);
  return (
    <View style={{padding: 20}}>
      <TextInput
        style={{
          height: 100,
          width: '100%',
          borderRadius: 10,
          borderWidth: 3,
          borderColor: theme.color.grey,
          color: theme.color.black,
          textAlign: 'right',
          textAlignVertical: 'bottom',
          fontSize: 20,
          marginVertical: 20,
          paddingHorizontal: 10,
        }}
        editable={true}
        onChangeText={value => {
          setTextTobeUploaded(() => {
            return value;
          });
        }}
        value={textTobeUploaded}
      />
      <TouchableOpacity
        style={{
          height: 40,
          width: '100%',
          backgroundColor: theme.color.blue,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
          marginBottom: 20,
        }}
        onPress={() => {
          uploadTextToFirebase({Text: textTobeUploaded});
        }}>
        <Text style={{color: theme.color.white, fontSize: 16}}>
          Tap to Upload
        </Text>
      </TouchableOpacity>
      <Text style={{color: theme.color.black, fontSize: 16}}>
        Uploaded Text
      </Text>
      <GestureHandlerRootView>
        <ScrollView>
          {textArray?.map((item, index) => (
            <View
              style={{
                width: '100%',
                borderRadius: 10,
                backgroundColor: theme.color.white,
                marginVertical: 10,
                padding: 10,
                borderWidth: 2,
              }}>
              <Text style={{color: theme.color.black}}>{item?.Text}</Text>
            </View>
          ))}
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default TextUpload;
