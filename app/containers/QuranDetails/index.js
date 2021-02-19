import React from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Image, FlatList, TouchableHighlight, ActivityIndicator} from 'react-native'
import _ from 'lodash'; 
import { TouchableOpacity} from 'react-native-gesture-handler'
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers } from '../../components';
import commonStyles from '../styles';
import imgs from '../../assets/images';
import apiConfig from '../../config/api';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right,Footer, FooterTab,
  ListItem,
  
} from 'native-base';
import Single from '../../components/Single';
import {getAudioFileUrl} from '../../utils/common';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import {fetchQuranDetails} from "../../actions/common";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import theme from '../styles';

import TrackPlayerComponent from '../../components/TrackPlayerComponent';
import TrackPlayer from 'react-native-track-player';
class QuranDetails extends React.Component {
  constructor(props) {
    super(props);
    const id = props.navigation.getParam('id');
  
    let surah = props.navigation.getParam('surah');
    this.state = {
      id: id,
      name: props.navigation.getParam('title'),
      uri: getAudioFileUrl({...surah}), 
      surah: surah,
      currentlyPlaying: '0',
      playList: [],
      isPlaying: false
    }
  }
 
  componentDidMount(){  
    console.log('mounted details compoenent')
    this.willFocus = this.props.navigation.addListener('willFocus', () => {
      // do something
      console.log('called will focus listener on details');
      this.forceUpdate();
    });
    const id = this.props.navigation.getParam('id');
     if(!this.props.quranDetails || !this.props.quranDetails[id]){
      this.props.fetchQuranDetails({id:id});
      }else if(!this.state.playList.length) {
        let playList1 = this.props.quranDetails[id].sort((a, b)=>{return a.id - b.id}).map((ayah)=>{
          return {uri: apiConfig.singleAudioFile(ayah), name: this.state.surah.name + ' : ' + ayah.verse_serial, id: parseInt(ayah.id)}
        });
        this.setState({playList: playList1}, ()=>{
        })
      }
  }
  async componentWillUnmount(){
    TrackPlayer.stop();
    this.setState({isPlaying: false});
    // TrackPlayer.destroy();
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    const id = nextProps.navigation.getParam('id');
    if(!nextProps.quranDetails || !nextProps.quranDetails[id]){
      this.props.fetchQuranDetails({id});
      }else if(!this.state.playList.length && nextProps.quranDetails[id]){
        let playList1 = nextProps.quranDetails[id].sort((a, b)=>{return a.id - b.id}).map((ayah)=>{
          return {uri: apiConfig.singleAudioFile(ayah), name: this.state.surah.name + ' : ' + ayah.verse_serial, id: parseInt(ayah.id)}
        });
        this.setState({playList: playList1}, ()=>{
        })
      }
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item}) => {
    return (<Single item={item} 
    hidePlayer={false} />)
  };
  
  render(){
    const id = this.props.navigation.getParam('id');
    return (
      <Container style={appStyles.container}>
      <View 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
      
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
         
{!this.props.quranDetails[id] ?
  (<View style={commonStyles.loading}>
      <ActivityIndicator size='large' color="white" />
    </View>)
  :

          (this.state.playList.length ? <FlatList
          
        data={this.props.quranDetails[id]}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={this._keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
        renderItem={this._renderItem}
        extraData={this.state}
      />:null)
}

     </Content>
        <Footer>
        {this.state.playList.length ? <TrackPlayerComponent 
         queue={this.state.playList} type={'quranDetails'} navigation={this.props.navigation}
         book={this.props.navigation.getParam('title')} titlePrefix={`Surah`} />:<View style={commonStyles.loading}>
         <ActivityIndicator size='large' color="white" />
       </View>}
        {/* <Player type={'quranDetails'} book={'quran'} context={id} playList={this.state.playList} onRef={
          ref => {
           this.setState({ player : ref})
          }} /> */}

          
         
        </Footer>
        </View>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    quranDetails: state.common.quranDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuranDetails: (query)=> dispatch(fetchQuranDetails(query))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(QuranDetails);