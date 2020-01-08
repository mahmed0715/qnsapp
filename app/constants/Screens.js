import React from 'react'
import { Icon } from 'native-base';
import Strings from './Strings';

export default {
  Title: 'QNS App',
  SignInStack : {
    route: 'SignInStack'
  }, 
  DrawerStack : {
    route: 'DrawerStack'
  },
  Home : {
    route: 'Home',
    icon:'home',
    label: Strings.home,
  },
  QuranStack : {
    route: 'QuranStack'
  },
  QuranList : {
    route: 'QuranList'
  },
  BukhariList : {
    route: 'BukhariList'
  },
  QuranDetails : {
    route: 'QuranDetails'
  },
  Settings : {
    route: 'Settings',
    icon:'settings',
    label: Strings.settings,
  },

  SignOutStack : {
    route: 'SignOutStack'
  }, 
  SignIn : {
    route: 'SignIn'
  }, 
  SignUp : {
    route: 'SignUp'
  }, 
  ForgotPassword : {
    route: 'ForgotPassword'
  }, 
};