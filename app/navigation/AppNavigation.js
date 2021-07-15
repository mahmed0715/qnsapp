import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


import { SignIn, SignUp, Forgotpassword, Home, Drawer, Settings, QuranList, QuranDetails, BukhariList, BukhariDetails } from "../containers";
import { Colors, Screens } from "../constants";

const transitionConfig = () => ({
      transitionSpec: {
        duration: 100,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const width = layout.initWidth;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    });

// drawer stack
const DrawerStack = createDrawerNavigator({
  [Screens.Home.route]: { 
    screen: Home 
  }, [Screens.Settings.route]: { 
    screen: Settings 
  },
  [Screens.QuranList.route]: { 
    screen: QuranList 
  },
  [Screens.QuranDetails.route]: { 
    screen: QuranDetails
  },
  [Screens.BukhariList.route]: { 
    screen: BukhariList 
  },
  [Screens.BukhariDetails.route]: { 
    screen: BukhariDetails 
  },
}, {
  gesturesEnabled: true,
  // drawerBackgroundColor: 'rgba(255,255,255,.9)',
  drawerType: 'front',
  hideStatusBar: false,
  statusBarAnimation: 'slide',
  overlayColor: Colors.primaryDark,
  contentOptions: {
    activeTintColor: Colors.lightBlack,
    activeBackgroundColor: Colors.primaryLight,
  },
  transitionConfig: transitionConfig,
  contentComponent: (props) => <Drawer {...props} />,
});

const DrawerNavigation = createStackNavigator({
  [Screens.DrawerStack.route]: { screen: DrawerStack },
  [Screens.QuranList.route]: { 
    screen: QuranList 
  },
  [Screens.QuranDetails.route]: { 
    screen: QuranDetails
  },
  [Screens.BukhariList.route]: { 
    screen: BukhariList 
  },
  [Screens.BukhariDetails.route]: { 
    screen: BukhariDetails 
  },
}, {
  headerMode: 'none',
  transitionConfig: transitionConfig
});

// login stack
const LoginStack = createStackNavigator({
  [Screens.SignIn.route]: { screen: SignIn },
  [Screens.SignUp.route]: { screen: SignUp},
  [Screens.ForgotPassword.route]: { screen: Forgotpassword },
}, {
  headerMode: 'none',
  initialRouteName: Screens.SignIn.route,
  transitionConfig: transitionConfig
});

// Quran navigation stack
const QuranStack = createStackNavigator({
  [Screens.QuranList.route]: { screen: QuranList },
  [Screens.QuranDetails.route]: { screen: QuranDetails}
}, {
  headerMode: 'none',
  title: 'Quran Majid',
  initialRouteName: Screens.QuranList.route,
  transitionConfig: transitionConfig
});
// Quran navigation stack
const BukhariStack = createStackNavigator({
  [Screens.BukhariList.route]: { screen: BukhariList },
  [Screens.BukhariDetails.route]: { screen: BukhariDetails}
}, {
  headerMode: 'none',
  title: 'Quran Majid',
  initialRouteName: Screens.BukhariList.route,
  transitionConfig: transitionConfig
});
// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  [Screens.SignOutStack.route]: { screen: LoginStack },
  [Screens.SignInStack.route]: { screen: DrawerNavigation },
  [Screens.QuranStack.route]: {screen: QuranStack},
  [Screens.BukhariStack.route]: {screen: BukhariStack}
}, {
  headerMode: 'none',
  title: Screens.Title,
  initialRouteName: Screens.SignOutStack.route,
});

export default PrimaryNav