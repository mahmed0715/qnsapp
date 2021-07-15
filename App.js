// Imports: Dependencies
import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import TrackPlayer from 'react-native-track-player';
import * as Font from 'expo-font';
// import * as Font from 'expo-font';

/*import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';*/
import { FontAwesome, Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';

import { StyleProvider, Root } from 'native-base';
import getTheme from './app/theme/components';
import material from './app/theme/variables/material';

// Imports: Navigation
import ReduxNavigation from './app/navigation/ReduxNavigation';

// Imports: Redux Persist Persister
import { store, persistor } from './app/store/store';
// import { I18nManager } from 'react-native';

// I18nManager.forceRTL(false);
console.disableYellowBox = true;

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

// React Native: App
export default class App extends React.Component {
  constructor(){
    
    super();
    this.state = {
      isReady: false,
    }
  }

  async componentWillMount() {
    TrackPlayer.registerPlaybackService(() => require('./app/components/service.js'));
    await Font.loadAsync({
      // 'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      ...Ionicons.font,
      ...FontAwesome.font,
      ...AntDesign.font,
      ...MaterialIcons.font,
      'Font-Light': require('./app/assets/fonts/Montserrat-Light.ttf'),
      'Font-Regular': require('./app/assets/fonts/Montserrat-Regular.ttf'),
      'Font-Semibold': require('./app/assets/fonts/Montserrat-SemiBold.ttf'),
      'Font-Bold': require('./app/assets/fonts/Montserrat-Bold.ttf'),
    });
    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return (
        <ActivityIndicator />
      );
    }
    return (
      // Redux: Global Store
      <Provider store={store}>
        <PersistGate 
          loading={<ActivityIndicator />}
          persistor={persistor}
        >
          <StyleProvider style={getTheme(material)}>
            <Root>
              <ReduxNavigation />
            </Root>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
};