import React from "react";
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import {
  Button,
  Text,
  Header, Left, Body, Title, Right
} from 'native-base';

import appStyles from '../theme/appStyles';
import svgs from '../assets/svgs';
import { Colors, Layout, ActionTypes } from '../constants';
import Logo from './Logo';
import Svgicon from './Svgicon';


import ModalBox from './ModalBox';
import SetLanguage from './SetLanguage';


class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visibleModal:false
    }
  }
  capitalize = (s) => {
    if (typeof s != 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  render() {
    console.log('nav in header:', this.props.navigation);
    const title = this.props.navigation.getParam('title');
    const id = this.props.navigation.getParam('id', '')
    console.log('nav in header:', title, id)
    return (
        <Header transparent style={{backgroundColor: '#228392'}}>
          {/* <Left style={[appStyles.row, {maxWidth:'20%'}]}> */}
            {/* <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.openDrawer()}>
              <Svgicon color={Colors.black} name="menu" />
            </Button> */}
          {/* </Left> */}
          <View style={{justifyContent:'center', alignItems:'center'}}>
    <Text style={{fontSize: 20 , color: 'white', textAlign:'center'}}> {title?this.capitalize(title) : 'QNS Academy'}</Text>
          </View>
        </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
      showModal: () => {
        dispatch({ type: ActionTypes.SHOWMODAL, showModal: true })
      },
    };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Headers);