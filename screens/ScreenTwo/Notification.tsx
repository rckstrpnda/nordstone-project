/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import theme from '../../styles/theme';
import notifee from '@notifee/react-native';

const Notification = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification From nordstone',
      body: `this is the assigment for notification ${Date.now()}`,
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  return (
    <View
      style={{
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50%',
      }}>
      <TouchableOpacity
        style={{
          height: 200,
          width: 200,
          backgroundColor: theme.color.red,
          borderRadius: 100,
        }}
        onPress={onDisplayNotification}
      />
    </View>
  );
};

export default Notification;
