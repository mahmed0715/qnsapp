import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Image, FlatList, TouchableHighlight, ActivityIndicator} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import commonStyles from '../styles';
import { Logo, Svgicon, Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right,Footer, FooterTab,
  ListItem,
  List
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import {fetchBukhariDetails} from "../../actions/common";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import theme from '../styles';
import Single from '../../components/Single';
import Player from '../../components/Player';
import apiConfig from '../../config/api';


class BukhariDetails extends React.Component {
  constructor(props) {
    super(props);
    let playList = [];
    const id  = props.navigation.getParam('id');
    const contextBookId = props.navigation.getParam('contextBookId');
    if(props.bukhariDetails && props.bukhariDetails[contextBookId] && props.bukhariDetails[contextBookId][id]){
      playList = props.bukhariDetails[contextBookId][id].filter(({audio_file})=>audio_file).map((ayah)=>({uri: apiConfig.singleAudioFile(ayah, 'hadiths'), name: ayah.hadith_serial, id: ayah.id}));
    }
    this.state = {
      playList: playList,
      player: React.createRef(),
      isPlaying: false,
      currentlyPlaying: 1
    }
  }
  setCurrentlyPlaying = (id) => {
    // let { isPlaying } = this.state;
    // isPlaying && this.player.pause();
    // this.state.currentlyPlaying == context.id ? this.setState({isPlaying: true},() => {
    //   this.player.playPause();
    // }):
     this.setState({currentlyPlaying : id});
    
  }

  componentDidMount(){
    const contextBookId = this.props.navigation.getParam('contextBookId');
    
    const id = this.props.navigation.getParam('id');
    if(!this.props.bukhariDetails[contextBookId] || !this.props.bukhariDetails[contextBookId][id]){
      // console.log('dont have bukhari details, fetching', contextBookId, id);
      this.props.fetchBukhariDetails({contextBookId, id});
    }
  }
  componentWillReceiveProps(nextProps){
    // console.log('nexprops:', nextProps.bukhariDetails);
    const contextBookId = nextProps.navigation.getParam('contextBookId');
    
    const id = nextProps.navigation.getParam('id');
    if(!nextProps.bukhariDetails[contextBookId] || !nextProps.bukhariDetails[contextBookId][id]){
      // console.log('dont have bukhari details, fetching', contextBookId, id);
      this.props.fetchBukhariDetails({contextBookId, id});
    } else if(nextProps.bukhariDetails && nextProps.bukhariDetails[contextBookId] && nextProps.bukhariDetails[contextBookId][id]){
      const playList = nextProps.bukhariDetails[contextBookId][id].filter(({audio_file}) => audio_file).map((ayah)=>({uri: apiConfig.singleAudioFile(ayah, 'hadiths'), name: ayah.hadith_serial, id: ayah.id}))
      .filter(({uri})=>uri);
      this.setState({playList: playList});
      this.state.playList.length && this.state.player.play({...this.state.playList[0]}, true);
    }
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item} ) => {
    return (
     <Single item={item}  player={this.state.player} 
      setCurrentlyPlaying={this.setCurrentlyPlaying.bind(this)} 
     currentlyPlaying={this.state.currentlyPlaying} 
     hidePlayer={true} />

    )
  };
  render(){
    const contextBookId = this.props.navigation.getParam('contextBookId');
    
    const id = this.props.navigation.getParam('id');
    // console.log('data', this.props.bukhariDetails, contextBookId, id);
    return (
      <Container style={appStyles.container}>
        <View 
            source={imgs.bg1} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
          {!this.props.bukhariDetails[contextBookId] || !this.props.bukhariDetails[contextBookId][id]?
          
            (<View style={commonStyles.loading}>
      <ActivityIndicator size='large' color="white" />
    </View>):
          <FlatList
          
        data={this.props.bukhariDetails[contextBookId][id]}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={this._keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
        renderItem={this._renderItem}
      />}
          
          </Content>
          {
          this.props.bukhariDetails && this.props.bukhariDetails[contextBookId]&& this.props.bukhariDetails[contextBookId][id] && this.state.playList.length ?
        (  <Footer>
        <Player book={'hadiths'} context={id} playList={this.state.playList} onRef={
          ref => {
            ref && this.state.playList.length && ref.play({...this.state.playList[0]}, true);
           this.setState({ player : ref})
          }} />
          
        </Footer>):null}
         </View>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    bukhariList: state.common.bukhariList,
    bukhariDetails: state.common.bukhariDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBukhariDetails: (query)=> dispatch(fetchBukhariDetails(query))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(BukhariDetails);