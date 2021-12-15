import React from "react";
import { View, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import {
  Button,
  Text,
  Header, Left, Body, Icon, Title, Right, Container
} from 'native-base';

import appStyles from '../theme/appStyles';
import svgs from '../assets/svgs';
import { Colors, Layout, ActionTypes } from '../constants';
import Logo from './Logo';
import Svgicon from './Svgicon';

import { getCurrentRoute } from '../utils/common';
import ModalBox from './ModalBox';
import SetLanguage from './SetLanguage';
import { DrawerActions, NavigationActions } from "react-navigation";
import TrackPlayer from 'react-native-track-player';
import { Screens } from "../constants";
let backHandlerClickCount = 0;
class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visibleModal:false
    }
  }

  onBackPress = () => {
    const { state } = this.props;
    const currentRoute = getCurrentRoute(state);
     console.log("getCurrentRoute", currentRoute);
    backHandlerClickCount++;
    setTimeout(() => {
      backHandlerClickCount = 0;
    }, 100);
    if (currentRoute == Screens.DrawerStack.route && backHandlerClickCount < 2) {
      dispatchEvent(DrawerActions.closeDrawer);
    }
    if (currentRoute == Screens.Home.route || currentRoute == Screens.SignIn.route || backHandlerClickCount > 1) {
      console.log('exiting app')
      BackHandler.exitApp();
      return true;
    }
    TrackPlayer.stop();

    // TrackPlayer.reset();
    // dispatch(NavigationActions.back());
    this.props.back(NavigationActions.back)
    return true;
  };
  capitalize = (s) => {
    if (typeof s != 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  render() {
    // console.log('nav in header:', this.props.navigation);
    const title = this.props.navigation.getParam('title');
    const id = this.props.navigation.getParam('id', '')
    // console.log('nav in header:', title, id)
    return (
      // <Container>
        <Header transparent style={{backgroundColor: '#228392', borderColor:'black', borderWidth:0}}>
          <Left >
            {!this.props.home?
          <Button transparent onPress={this.onBackPress}>
          <Icon name="arrow-back" />
            </Button>:null
  }
          </Left>
          <Body>

          <Text style={{fontSize: 20 , color: 'white', textAlign:'center'}}> {title?this.capitalize(title) : 'QNS Academy'}</Text>

          </Body>
          {/* <Right>
            <Button transparent>
              <Text>Text</Text>
            </Button>
          </Right> */}
        </Header>
      // </Container>
    //     <Header transparent style={{backgroundColor: '#228392', borderColor:'black', borderWidth:3}}>
    //       <View style={[appStyles.row, {maxWidth:'20%', borderWidth: 1, borderColor:'red'}]}>
    //         <Button transparent style={appStyles.menuBtn} onPress={() => {
    //           alert('back')
    //         }}>
    //           <Svgicon color={Colors.black} name="menu" />
    //         </Button>
    //        </View>
    //       <View style={{justifyContent:'center', alignItems:'center'}}>
    //         <Text>Back</Text>
    // <Text style={{fontSize: 20 , color: 'white', textAlign:'center'}}> {title?this.capitalize(title) : 'QNS Academy'}</Text>
    //       </View>
    //     </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      showModal: () => {
        dispatch({ type: ActionTypes.SHOWMODAL, showModal: true })
      },
      back: (p) => {
        dispatch(p())
      },
    };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Headers);
