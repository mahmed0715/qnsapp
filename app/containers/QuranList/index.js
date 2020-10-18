import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Image, FlatList, TouchableHighlight,ActivityIndicator,TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import commonStyles from '../styles';
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers } from '../../components';
import imgs from '../../assets/images';
import TrackPlayerComponent from '../../components/TrackPlayerComponent';
import TrackPlayer, {TrackPlayerEvents} from 'react-native-track-player';
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
import {fetchQuranDetails, startLoading, stopLoading} from "../../actions/common";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import theme from '../styles';
// import Player from '../../components/Player';
import {getAudioFileUrl} from '../../utils/common';
// console.log('common styles',commonStyles)
class QuranList extends React.Component {
  constructor(props) {
    super(props);
    const playList = props.quranList.map((surah)=>{
      return {uri: getAudioFileUrl(surah), name: surah.name, id: parseInt(surah.id)}
    });
    this.state = {
      isPlaying: false,
      currentlyPlaying: 1,
      // player: React.createRef(),
      playList: playList
    }
    //  console.log('Qudranlist playlist in constructor', playList);
  }
 async componentDidMount(){
    // await TrackPlayer.setupPlayer();
    // TrackPlayer.addEventListener('playback-track-changed', async (data) => {
    //   // console.log('track changed in quranlist:', data);
    //   // TrackPlayer.seekTo(data.position);
    //   if(data.nextTrack > 0 && data.nextTrack != this.state.currentlyPlaying){
    //     this.setState({currentlyPlaying: data.nextTrack}, ()=>{
    //       // console.log('track changed ', this.state.currentlyPlaying);
    //     })
    //   }
    // });
    // TrackPlayer.addEventListener('playback-state', async (data) => {
    //   if(data.state == 3){
    //     const current = await TrackPlayer.getCurrentTrack();
    //    console.log('got current rtack', current);
    //     this.setState({isPlaying: true, currentlyPlaying: current})
    //   }else if(this.state.isPlaying){
    //     this.setState({isPlaying: false})
    //   }
    // });
  }
  // componentDidMount(){
  //   const {navigation} = this.props;
  //   if(navigation)
  //     this.willFocus = navigation.addListener(
  //       'didFocus',
  //       () => {
  //         console.log('did focus====================================================================================');
  //           this.setState({isPlaying: false})
  //           this.forceUpdate();
  //           this.setState({currentlyPlaying: {id:null}}, ()=>{console.log('state updated in quranlist', this.state)}
  //             )
  //       }
  //   )  
  // }
  UNSAFE_componentWillReceiveProps(nextProps){
    //  console.log('nextprops.currentlyPlaying in quran list:', nextProps.currentlyPlaying);
    // const id = nextProps.navigation.getParam('id');
    if(!this.state.playList.length && nextProps.quranList && nextProps.quranList != this.state.quranList){
    
        let playList1 = nextProps.quranList.map((surah)=>{
          return {uri: getAudioFileUrl(surah), name: surah.name, id: parseInt(surah.id)}
        });
        let { playList } = this.state;
        //  console.log('playlist in quran list', playList, playList1);
        this.setState({playList: playList1}, ()=>{
          // this.state.player && this.state.player.play({...this.state.playList[0]}, true);
        })
      }
  }
  // play(context){
  //   this.state.player.play(context)
  // }
  // setPause(context){
  //   this.setState({isPlaying: false}, ()=>{
  //     this.state.player.pause()
  //   });
  // }
  // generatePlayList = ()=>{
  //   const playList = nextProps.quranDetails[id].map((ayah)=>{
  //     return {uri: getAudioFileUrl(ayah), name: ayah.verse_serial, id: ayah.id}
  //   });
  //   this.setState({playList: playList})
  // }
  setCurrentlyPlaying = (id) => {
    // let { isPlaying } = this.state;
    // isPlaying && this.player.pause();
    // this.state.currentlyPlaying == context.id ? this.setState({isPlaying: true},() => {
    //   this.player.playPause();
    // }):
    // this.state.player.play({id});
     this.setState({currentlyPlaying : id, isPlaying: true});
    //  this.props.startLoading();
    
  }
  onButtonPressed = async (context) => {
    if (!this.state.isPlaying) {
      TrackPlayer.skip(context.id);
      //setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      //setIsPlaying(false);
    }
    // console.log(await TrackPlayer.getQueue());
    // console.log(await TrackPlayer.getCurrentTrack())
    // console.log(await getTitle())
  };
  async UNSAFE_componentWillUnmount(){
    // if(!this.props.quranDetails || !this.props.quranDetails.length){
    //   console.log('dont have quran list in quran list screen, fetching');
    //   this.props.fetchQuranDetails({});
    
    // }
    // this.willFocus && this.willFocus.remove();
    // this.state.player.stop();
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item: surah} ) => {
    const iconColor = 'white';
          const iconSize = 34;
    // console.log('render item', surah);
    //  console.log('isloading in quranlist renderItem:', this.props.soundLoading)
    return (
     <ListItem onPress={()=>{!this.props.soundLoading && this.props.navigation.push('QuranDetails', { id: surah.id, title: `Surah ${surah.name}`, surah: surah, player: this.state.player })}}>
        <Left style={{maxWidth:35, alignItems:'flex-start', justifyContent:'flex-start'}}>
          <Text style={theme.textColor}>{surah.id}</Text>
        </Left>
       <Body>
          <Text style={theme.textColor}>Surah {surah.name}</Text>
          <Text style={theme.textColor}>({surah.meaning}) Verse {surah.verse_number}</Text>
       </Body>
       <Right>
{/*       
       {this.state.currentlyPlaying == surah.id && this.state.isPlaying ? (
   <TouchableOpacity onPress={()=>{this.setPause(surah)}}> 
   <Icon
  size={38}
   
    style={{fontSize: 38}}
      name="pause"
      color="#56D5FA"
    />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity  onPress={()=>{this.setCurrentlyPlaying(surah)}} >   
     <Icon
  size={38}
 
    style={{fontSize: 38}}
      name="play-circle"
      color="#56D5FA"
    /></TouchableOpacity>

  )} */}
  {/* <View>
   <TouchableOpacity  
       style={{paddingLeft: 10, paddingTop:5, paddingBottom: 10, paddingRight: 10}} 
       onPress={this.onButtonPressed(surah)} >   
        {this.state.isPlaying && this.state.currentlyPlaying == surah.id ? <Icon
     size={iconSize}
    
     style={{fontSize: iconSize, color: iconColor}}
         name="pause"
       />:
        <Icon
     size={iconSize}
    
     style={{fontSize: iconSize,color: iconColor}}
         name="play"
       />}
       </TouchableOpacity>
   
    </View> */}
  {
      //  <RightPlayer style={{alignSelf:'flex-start'}} 
      //  context={surah} 
      //  currentlyPlaying={this.state.currentlyPlaying}
      //  isPlaying={this.state.isPlaying}
      //  />
  }
       </Right>
{/* <Right> 
  <Text>Verse {surah.verse_number}</Text>
 </Right> */}
       {/* <RightPlayer style={{alignSelf:'flex-start'}} surah={surah} player={this.player} /> */}
      </ListItem> 
    )
  };
  render(){
    // console.log('isPlaying in quranlist render:', this.state.isPlaying)
    return (
      <Container style={appStyles.container}>
        
        <View 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={[appStyles.content, {backgroundColor: '#399aa9'}]}>
          {!this.props.quranList || !this.props.quranList.length?
          (<View style={commonStyles.loading}>
      <ActivityIndicator size='large' color="white" />
    </View>)
         :
          <FlatList
          
        data={this.props.quranList}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={this._keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
        renderItem={this._renderItem}
        extraData={this.state.currentlyPlaying}
      />
          }
          
          
          </Content>
          <Footer>
         {this.state.playList.length ? <TrackPlayerComponent 
         queue={this.state.playList} type={'quranList'} 
         book={'Al-Quran'} titlePrefix={'Surah'}/>:null}
            {/* just commented becaseu its getting slow, no need to load first one on load */}
          {/* <Player type={'quranList'} book={'quran'} onRef={ref => {
            this.setState({ player : ref}, ()=>{
             // ref && this.state.playList.length && ref.play({...this.state.playList[0]}, true)
            })
            
          }
            } playList={this.state.playList} /> */}
        </Footer>
         </View>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    soundLoading: state.common.soundLoading,
    quranList: state.common.quranList,
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
export default connect(mapStateToProps, mapDispatchToProps)(QuranList);