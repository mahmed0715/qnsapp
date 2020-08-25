import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Image, FlatList, TouchableHighlight,ActivityIndicator,TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import commonStyles from '../styles';
import { Layout, Colors, Screens } from '../../constants';
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
import {fetchQuranDetails} from "../../actions/common";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import theme from '../styles';
import Player from '../../components/Player';
import {getAudioFileUrl} from '../../utils/common';
// console.log('common styles',commonStyles)
import RightPlayer from '../../components/RightPlayer';
class QuranList extends React.Component {
  constructor(props) {
    super(props);
    const playList = props.quranList.map((surah)=>{
      return {uri: getAudioFileUrl(surah), name: surah.name, id: parseInt(surah.id)}
    });
    this.state = {
      isPlaying: false,
      currentlyPlaying: 1,
      player: React.createRef(),
      playList: playList
    }
     console.log('Quranlist playlist in constructor', playList);
  }
  componentWillReceiveProps(nextProps){
    // console.log('nextprops in quran details:', nextProps.quranDetails);
    // const id = nextProps.navigation.getParam('id');
    if(nextProps.quranList && nextProps.quranList != this.state.quranList){
    
        let playList1 = nextProps.quranList.map((surah)=>{
          return {uri: getAudioFileUrl(surah), name: surah.name, id: parseInt(surah.id)}
        });
        let { playList } = this.state;
         console.log('playlist in quran list', playList, playList1);
        this.setState({playList: [...playList, ...playList1]}, ()=>{
          // this.state.player && this.state.player.play({...this.state.playList[0]}, true);
        })
      }
  }
  setPause(context){
    this.setState({isPlaying: false}, ()=>{
      this.state.player.pause()
    });
  }
  generatePlayList = ()=>{
    const playList = nextProps.quranDetails[id].map((ayah)=>{
      return {uri: getAudioFileUrl(ayah), name: ayah.verse_serial, id: ayah.id}
    });
    this.setState({playList: playList})
  }
  setCurrentlyPlaying = (id) => {
    // let { isPlaying } = this.state;
    // isPlaying && this.player.pause();
    // this.state.currentlyPlaying == context.id ? this.setState({isPlaying: true},() => {
    //   this.player.playPause();
    // }):
     this.setState({currentlyPlaying : id});
    
  }
  async componentWillUnmount(){
    // if(!this.props.quranDetails || !this.props.quranDetails.length){
    //   console.log('dont have quran list in quran list screen, fetching');
    //   this.props.fetchQuranDetails({});
    
    // }
    this.state.player.stop();
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item: surah} ) => {
    // console.log('render item', surah);
    return (
     <ListItem onPress={()=>{this.props.navigation.push('QuranDetails', { id: surah.id, title: `Surah ${surah.name}`, surah: surah, player: this.state.player })}}>
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
  {this.state.player && this.state.player.play ?
       <RightPlayer style={{alignSelf:'flex-start'}} 
       context={surah} 
       player={this.state.player} 
       currentlyPlaying={this.state.currentlyPlaying}
       setCurrentlyPlaying={this.setCurrentlyPlaying.bind(this)}
       />:null
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
      />
          }
          </Content>
          <Footer>

            {/* just commented becaseu its getting slow, no need to load first one on load */}
          <Player book={'quran'} onRef={ref => {
            this.setState({ player : ref}, ()=>{
             // ref && this.state.playList.length && ref.play({...this.state.playList[0]}, true)
            })
            
          }
            } playList={this.state.playList} />
        </Footer>
         </View>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    quranList: state.common.quranList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuranDetails: (query)=> dispatch(fetchQuranDetails(query))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(QuranList);