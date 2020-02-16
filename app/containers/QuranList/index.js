import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Image, FlatList, TouchableHighlight,ActivityIndicator} from 'react-native'
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
console.log('common styles',commonStyles)
class RightPlayer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playing: false
    }
    this.play = this.play.bind(this);
  }
 
  play(){
    this.setState({playing: !this.state.playing})
    this.props.setCurrentlyPlaying(this.props.context);
  }
  render(){
return (
  
  <View>
  {this.props.currentlyPlaying && this.props.currentlyPlaying == this.props.context.id ? (
    <Icon
  size={38}
  onPress={ this.play} 
    style={{fontSize: 38}}
      name="pause"
      color="#56D5FA"
    />
  ) : (
    <Icon
  size={38}
  onPress={this.play} 
    style={{fontSize: 38}}
      name="play-circle"
      color="#56D5FA"
    />
  )}
  </View>
  
)
  }
}
class QuranList extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.state = {
      isPlaying: false,
      currentlyPlaying: 1
    }
  }
  setCurrentlyPlaying = (context, pause) => {
    let {isPlaying}  = this.state;
    this.setState({currentlyPlaying : context.id, isPlaying: pause? !isPlaying: true});
    pause ? this.player.pause(context) : this.player.play(context);
  }
  async componentWillMount(){
    // if(!this.props.quranDetails || !this.props.quranDetails.length){
    //   console.log('dont have quran list in quran list screen, fetching');
    //   this.props.fetchQuranDetails({});
    // }
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item: surah} ) => {
    // console.log('render item', surah);
    return (
     <ListItem onPress={()=>{this.props.navigation.push('QuranDetails', { id: surah.id, title: `Surah ${surah.name}` })}}>
        <Left style={{maxWidth:30, alignItems:'flex-start', justifyContent:'flex-start'}}>
          <Text style={theme.textColor}>{surah.id}</Text>
        </Left>
       <Body>
          <Text style={theme.textColor}>Surah {surah.name}{this.state.isPlaying}</Text>
          <Text style={theme.textColor}>({surah.meaning}) Verse {surah.verse_number}</Text>
       </Body>
       <Right>
      
       {this.state.currentlyPlaying == surah.id && this.state.isPlaying ? (
   <TouchablOpacity onPress={()=>{this.setCurrentlyPlaying(surah, true)}}> 
   <Icon
  size={38}
   
    style={{fontSize: 38}}
      name="pause"
      color="#56D5FA"
    />
    </TouchablOpacity>
  ) : (
    <TouchableHighlight  onPress={()=>{this.setCurrentlyPlaying(surah)}} >   
     <Icon
  size={38}
 
    style={{fontSize: 38}}
      name="play-circle"
      color="#56D5FA"
    /></TouchableHighlight>

  )}
       {/* <RightPlayer style={{alignSelf:'flex-start'}} context={surah} setCurrentlyPlaying={this.setCurrentlyPlaying} currentlyPlaying={this.state.currentlyPlaying} /> */}
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
          <Content enableOnAndroid style={appStyles.content}>
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
          {/* <Footer> */}

            {/* just commented becaseu its getting slow, no need to load first one on load */}
          {/* <Player book={'quran'} onRef={ref => (this.player = ref)} /> */}
        {/* </Footer> */}
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