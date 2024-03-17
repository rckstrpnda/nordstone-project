/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../styles/theme';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {FIREBASE_STORAGE} from '../../utils/firebase';
import {useFocusEffect} from '@react-navigation/native';
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (error) {
    console.log(error);
  }
};
const ImageUpload = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  };
  async function uploadFile(uri, filename, folder) {
    if (!filename) return;
    const storageRef = ref(FIREBASE_STORAGE, `${folder}/${filename}`);
    const blobFile = await uriToBlob(uri);
    try {
      uploadBytes(storageRef, blobFile).then(async snapshot => {
        console.log('snapshot', snapshot);
        const url = await getDownloadURL(storageRef);
        return url;
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  useFocusEffect(
    useCallback(() => {
      const getImageUrl = () => {
        const ImageRef = ref(FIREBASE_STORAGE, 'Pictures/Image.jpg');
        getDownloadURL(ImageRef)
          .then(url => {
            setImageUrl(() => {
              return url;
            });
          })
          .catch(error => {
            console.log(error);
          });
      };
      setInterval(function () {
        getImageUrl();
      }, 10000);
    }, []),
  );
  return (
    <View>
      <Modal
        transparent={true}
        visible={popup}
        onRequestClose={() => {
          setPopup(() => {
            return false;
          });
        }}>
        <View
          style={{
            width: 150,
            height: 100,
            backgroundColor: theme.color.white,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            position: 'absolute',
            top: '40%',
          }}>
          <TouchableOpacity
            style={{marginBottom: 15}}
            onPress={() => {
              requestCameraPermission();
              ImagePicker.openCamera({
                width: 300,
                height: 400,
                useFrontCamera: true,
              })
                .then(image => {
                  if (image) {
                    console.log(image);
                    setSelectedImage(() => {
                      return image;
                    });
                    setPopup(() => {
                      return false;
                    });
                  } else {
                    console.log('Image selection was canceled.');
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }}>
            <Text style={{color: theme.color.black}}>From Camera</Text>
          </TouchableOpacity>
          <View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: theme.color.black,
            }}
          />
          <TouchableOpacity
            style={{
              marginTop: 15,
            }}
            onPress={() => {
              ImagePicker.openPicker({
                width: 300,
                height: 400,
              })
                .then(image => {
                  if (image) {
                    console.log(image);
                    setSelectedImage(() => {
                      return image;
                    });
                    setPopup(() => {
                      return false;
                    });
                  } else {
                    console.log('Image selection was canceled.');
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }}>
            <Text style={{color: theme.color.black}}>From Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <GestureHandlerRootView style={{padding: 20, alignItems: 'center'}}>
        <ScrollView>
          <Text style={{color: theme.color.black, fontSize: 24}}>
            Upload Image
          </Text>
          {selectedImage === undefined ? (
            <TouchableOpacity
              style={{
                width: 200,
                height: 300,
                backgroundColor: theme.color.grey,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
              onPress={() => {
                requestCameraPermission();
                setPopup(() => {
                  return true;
                });
              }}>
              <Image
                source={require('../../styles/png/addphoto.png')}
                style={{height: 37, width: 41, resizeMode: 'contain'}}
              />

              <Text style={{color: theme.color.black, fontSize: 24}}>
                Tap to Select Image
              </Text>
            </TouchableOpacity>
          ) : (
            <Image
              source={{
                uri: selectedImage?.path,
              }}
              style={{width: 200, height: 400, marginBottom: 30}}
            />
          )}
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
              var temp = selectedImage?.path.split('/');
              console.log(imageUrl);
              uploadFile(selectedImage.path, 'Image.jpg', 'Pictures');
              setSelectedImage(undefined);
            }}>
            <Text style={{color: theme.color.white, fontSize: 16}}>
              Tap to Upload
            </Text>
          </TouchableOpacity>
          <Text style={{color: theme.color.black, fontSize: 24}}>
            Uploaded Image
          </Text>
          {imageUrl ? (
            <Image
              source={{
                uri: imageUrl,
              }}
              style={{width: 200, height: 400}}
            />
          ) : (
            <TouchableOpacity
              style={{
                width: 200,
                height: 400,
                backgroundColor: theme.color.grey,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Image
                source={require('../../styles/png/addphoto.png')}
                style={{height: 37, width: 41, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          )}
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default ImageUpload;
