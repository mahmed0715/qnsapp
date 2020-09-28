import React, { useEffect } from 'react';
// import { Input } from 'react-native-elements';

import { Keyboard } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const localNotification = { title: 'Mustak Ahmed', body: 'Done!' , android: {
    priority: 'max',
    vibrate: [0, 250, 250, 250],
    color: '#FF0000',
  },};
const schedulingOptions = {
    time: new Date().getTime() + 121,
  };
const onSubmit = text => {
  Keyboard.dismiss();
  const schedulingOptions = {
    time: new Date().getTime() + Number(text),
  };
  // Notifications show only when app is not active.
  // (ie. another app being used or device's screen is locked)
  Notifications.scheduleLocalNotificationAsync(
    localNotification,
    schedulingOptions,
  );
};
const handleNotification = () => {
  console.warn('ok! got your notif');
};

const askNotification = async () => {
    Notifications.presentLocalNotificationAsync({
        title: 'Reminder',
        body: 'This is an important reminder!!!!',
        android: {
          priority: 'high',
          vibrate: [0, 250, 250, 250],
          color: '#FF0000',
        },
      });
    // Notifications.scheduleLocalNotificationAsync(
    //     localNotification,
    //     schedulingOptions,
    //   );
  // We need to ask for Notification permissions for ios devices
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && status === 'granted')
    console.log('Notification permissions granted.');
};

const TimerNotification = () => {
  useEffect(() => {
    askNotification();

    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener = Notifications.addListener(handleNotification);
    return () => listener.remove();
  }, []);

  return null;
};

export default TimerNotification;


// export type NotificationContent = {
//     // Notification title - the bold text displayed above the rest of the content
//     title: string | null;
//     // On iOS - subtitle - the bold text displayed between title and the rest of the content
//     // On Android - subText - the display depends on the platform
//     subtitle: string | null;
//     // Notification body - the main content of the notification
//     body: string | null;
//     // Data associated with the notification, not displayed
//     data: { [key: string]: unknown };
//     // Application badge number associated with the notification
//     badge: number | null;
//     sound: 'default' | 'defaultCritical' | 'custom' | null;
//   } & (
//     | {
//         // iOS-specific additions
//         // See https://developer.apple.com/documentation/usernotifications/unnotificationcontent?language=objc
//         // for more information on specific fields.
//         launchImageName: string | null;
//         attachments: {
//           identifier: string | null;
//           url: string | null;
//           type: string | null;
//         }[];
//         summaryArgument?: string | null;
//         summaryArgumentCount?: number;
//         categoryIdentifier: string | null;
//         threadIdentifier: string | null;
//         targetContentIdentifier?: string;
//       }
//     | {
//         // Android-specific additions
//         // See https://developer.android.com/reference/android/app/Notification.html#fields
//         // for more information on specific fields.
//         priority?: AndroidNotificationPriority;
//         vibrationPattern?: number[];
//         // Format: '#AARRGGBB'
//         color?: string;
//       }
//     );