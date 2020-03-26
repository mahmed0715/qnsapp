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
  render() {
    console.log('nav', this.props.navigation)
    const title = this.props.navigation.getParam('title', 'Qns App');
    const id = this.props.navigation.getParam('id', '')
    return (
        <Header transparent>
          <Left style={[appStyles.row, {maxWidth:'20%'}]}>
            <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.openDrawer()}>
              <Svgicon color={Colors.black} name="menu" />
            </Button>
          </Left>
          <Body style={{justifyContent:'flex-start', alignItems:'flex-start'}}>
    <Text style={{fontSize: 20 , color: 'black'}}>{id ? id + '.' : ''} {title}</Text>
          </Body>
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