
import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableHighlight} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers } from '../../components';
import imgs from '../../assets/images';
import axios from 'axios';
import {fetchQuranList} from "../../actions/common";
import url from '../../config/api';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right, Footer, FooterTab
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import AudioPlayer from '../../components/AudioPlayer';
import Player from '../../components/Player';
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount(){
    if(!this.props.quranList || !this.props.quranList.length){
      console.log('dont have quran list, fetching');
      this.props.fetchQuranList({});
    }
  }
  render(){
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg1} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
            <View style={{padding:16, flex: 1, flexDirection: 'row', flexWrap:'wrap'}}>
              <TouchableHighlight style={{padding:16, margin: 20, borderWidth:2, borderColor:'white'}} onPress={()=>{this.props.navigation.navigate('QuranList', {title: 'Quran Majid'})}}>
                <Text>Quran Majid</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{padding:16, margin: 20, borderWidth:2, borderColor:'white'}} 
              onPress={()=>{this.props.navigation.navigate('QuranList', {title: 'Sohih Al-Bukhari'})}}>
                <Text>Sohih Al-Bukhari</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{padding:16, margin: 20, borderWidth:2, borderColor:'white'}} 
              onPress={()=>{this.props.navigation.navigate('QuranList', {title: 'Sohih Al-Muslim'})}}>
                <Text>Sohih Al-Muslim</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{padding:16, margin: 20, borderWidth:2, borderColor:'white'}} 
              onPress={()=>{this.props.navigation.navigate('QuranList', {title: 'Sohih-al-bukhari'})}}>
                <Text>Sohih Jami-Tirmiji</Text>
              </TouchableHighlight>

            </View>
            {/* <AudioPlayer /> */}
            {/* <Player /> */}
          </Content>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    quranList: state.common.quranList,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuranList: (query)=> dispatch(fetchQuranList(query))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);