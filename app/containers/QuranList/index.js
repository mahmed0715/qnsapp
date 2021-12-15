import React from 'react'
import { View, FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'
import _ from 'lodash';
import commonStyles from '../styles';
import { Layout} from '../../constants';
import { Headers } from '../../components';
import TrackPlayerComponent from '../../components/TrackPlayerComponent';
import TrackPlayer from 'react-native-track-player';
import {
  Container,
  Content,
  Icon,
  Text,
  Left, Body, Right,Footer,
  ListItem,

} from 'native-base';
import { connect } from "react-redux";
import appStyles from '../../theme/appStyles';
import theme from '../styles';
import {getAudioFileUrl} from '../../utils/common';
class QuranList extends React.Component {
  constructor(props) {
    super(props);
    const playList = props.quranList.map((surah)=>{
      return {uri: getAudioFileUrl(surah), name: surah.name, id: parseInt(surah.id)}
    });
    this.state = {
      isPlaying: false,
      currentlyPlaying: '1',
      playList: playList
    }
    this.onButtonPressed = this.onButtonPressed.bind(this);

  }
 componentDidMount(){
  //console.log('mounted list compoenent')
  this.willFocus = this.props.navigation.addListener('willFocus', () => {
    // do something
    //console.log('called will focus listener on list');
    this.forceUpdate();
  });
  // TrackPlayer.setupPlayer();
  TrackPlayer.addEventListener('playback-track-changed', (data) => {
   // console.log('track changed in list', data);
    TrackPlayer.getCurrentTrack().then((t)=>{
    //  console.log('got current rtack in list', t);
      this.setState({ currentlyPlaying: t})
    });
  })
    TrackPlayer.addEventListener('playback-state', (data) => {
      // check = async ()=> {

     //   console.log('got state rtack in list', data);
      if(data.state == 3){
        TrackPlayer.getCurrentTrack().then((t)=>{
       //   console.log('got current rtack in list', t);
          this.setState({isPlaying: true, currentlyPlaying: t})
        });


      }else if(data.state == 6){
        // buffereing dont do anything...
      }
      else {
        this.setState({isPlaying: false})
      }
    // }
    // check();
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(!this.state.playList.length && nextProps.quranList && nextProps.quranList != this.state.quranList){

        let playList1 = nextProps.quranList.map((surah)=>{
          return {uri: getAudioFileUrl(surah), name: surah.name, id: parseInt(surah.id)}
        });
        this.setState({playList: playList1});
      }
  }

  onButtonPressed = async (context) => {
    if (this.state.isPlaying && this.state.currentlyPlaying == context.id) {
      TrackPlayer.pause();
      this.setState({isPlaying: false})

    }else {
      TrackPlayer.skip(context.id);
      TrackPlayer.play();
      this.setState({isPlaying: true, currentlyPlaying: context.id})
    }

  };
  componentWillUnmount(){
    // this.remove && this.remove();
    TrackPlayer.stop();
    this.setState({isPlaying: false});
    // TrackPlayer.destroy();

  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item: surah} ) => {
    const iconColor = 'white';
          const iconSize = 34;
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

  <View>
   <TouchableOpacity
       style={{paddingLeft: 10, paddingTop:5, paddingBottom: 10, paddingRight: 10}}
       onPress={()=>{this.onButtonPressed(surah)}} >
         {this.state.isPlaying && this.state.currentlyPlaying == surah.id ? <Icon
     size={iconSize}

     style={{fontSize: iconSize, color: iconColor}}
         name='pause'
       />:
         <Icon
     size={iconSize}

     style={{fontSize: iconSize,color: iconColor}}
         name="play"
       />}
       </TouchableOpacity>

    </View>

       </Right>

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
        extraData={this.state}
      />
          }


          </Content>
          <Footer>
         {this.state.playList.length ? <TrackPlayerComponent
         queue={this.state.playList} type={'quranList'}  navigation={this.props.navigation}
         book={'Al-Quran'} titlePrefix={'Surah'} initialDuration={77}/>:<View style={commonStyles.loading}>
         <ActivityIndicator size='large' color="white" />
       </View>}

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

// Exports
export default connect(mapStateToProps)(QuranList);
