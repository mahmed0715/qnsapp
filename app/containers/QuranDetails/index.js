import React from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Image, FlatList, TouchableHighlight, ActivityIndicator} from 'react-native'
import _ from 'lodash'; 
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
import {fetchQuranDetails, startLoading, stopLoading} from "../../actions/common";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import theme from '../styles';
import Player from '../../components/Player';
// import RightPlayer from '../../components/RightPlayer';
class QuranDetails extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    const id = props.navigation.getParam('id');
    props.navigation.getParam('player').stop();
    let surah = props.navigation.getParam('surah');
    this.state = {
      // player1:  React.createRef(),
      player:  React.createRef(),
      id: id,
      name: props.navigation.getParam('title'),
      uri: getAudioFileUrl({...surah}), 
      surah: surah,
      currentlyPlaying: 0,
      playList: []
      //{id: parseInt(id), name: surah.name, uri: getAudioFileUrl({...surah}), root: true}
    }
  }
  // setCurrentlyPlaying = (id) => {
    // let { isPlaying } = this.state;
    // isPlaying && this.player.pause();
    // this.state.currentlyPlaying == context.id ? this.setState({isPlaying: true},() => {
    //   this.player.playPause();
    // }):
    //  this.setState({currentlyPlaying : id});
    
  // }
  componentWillMount(){  
    const id = this.props.navigation.getParam('id');
      // const name = this.props.navigation.getParam('name');
      // this.state.player.play({id: id, name: name}, true);
    //  console.log('got qurqan details did mount', JSON.stringify(this.props.quranDetails) , id);
     if(!this.props.quranDetails || !this.props.quranDetails[id]){
      // console.log('dont have quran details in quran details screen, fetching');
      this.props.fetchQuranDetails({id:id});
      }else if(!this.state.playList.length) {
        let playList1 = this.props.quranDetails[id].sort((a, b)=>{return a.id - b.id}).map((ayah)=>{
          return {uri: apiConfig.singleAudioFile(ayah), name: this.state.surah.name + ' : ' + ayah.verse_serial, id: parseInt(ayah.id)}
        });
        // console.log('playlist in quran details existing:', playList, playList1);
        this.setState({playList: playList1}, ()=>{
          // this.state.player && this.state.player.play(playList1[0], true);
        })
      }
  }
  async componentWillUnmount(){
    this.state.player.stop();
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    // console.log('nextprops in quran details:', nextProps.quranDetails);
    const id = nextProps.navigation.getParam('id');
    if(!nextProps.quranDetails || !nextProps.quranDetails[id]){
      // console.log('dont have quran details in quran details screen, fetching');
      this.props.fetchQuranDetails({id});
      }else if(!this.state.playList.length && nextProps.quranDetails[id]){
        let playList1 = nextProps.quranDetails[id].sort((a, b)=>{return a.id - b.id}).map((ayah)=>{
          return {uri: apiConfig.singleAudioFile(ayah), name: this.state.surah.name + ' : ' + ayah.verse_serial, id: parseInt(ayah.id)}
        });
        //  console.log('playlist in quran details', playList, playList1);
        this.setState({playList: playList1}, ()=>{
          //  this.state.player && this.state.player.play(playList1[0], true);
        })
      }
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item}) => {
    return (<Single item={item} 
    startLoading={this.props.startLoading}
    player={this.state.player} 
    soundLoading={this.props.soundLoading}
    hidePlayer={false} />)
  };
  
  render(){
    const id = this.props.navigation.getParam('id');
    return (
      <Container style={appStyles.container}>
      <View 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
        {/* <ImageBackground 
            source={imgs.bg1} 
            style={ { width: Layout.window.width, height: Layout.window.height }}> */}
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
         
{!this.props.quranDetails[id] ?
  (<View style={commonStyles.loading}>
      <ActivityIndicator size='large' color="white" />
    </View>)
  :

          (this.state.player && this.state.player.play ? <FlatList
          
        data={this.props.quranDetails[id]}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={this._keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
        renderItem={this._renderItem}
      />:null)
}

     </Content>
        <Footer>
          
        <Player type={'quranDetails'} book={'quran'} context={id} playList={this.state.playList} onRef={
          ref => {
           this.setState({ player : ref})
          }} />

          
         
        </Footer>
        </View>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    soundLoading: state.common.soundLoading,
    quranDetails: state.common.quranDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: (query) =>{dispatch(startLoading(query))},
    stopLoading: (query) =>{dispatch(stopLoading(query))},
    fetchQuranDetails: (query)=> dispatch(fetchQuranDetails(query))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(QuranDetails);