import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Image, FlatList, TouchableHighlight,ActivityIndicator} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers } from '../../components';
import commonStyles from '../styles';
import apiConfig from '../../config/api';
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
import {fetchBukhariList} from "../../actions/common";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import theme from '../styles';
import Player from '../../components/Player';
import RightPlayerHadith from '../../components/RightPlayerHadith';
class BukhariList extends React.Component {
  constructor(props) {
    super(props);
    // this.player = React.createRef();
    const id =  props.navigation.getParam('id');
    // const playList = props.bukhariList[id].map((ayah)=>({uri: apiConfig.singleAudioFile(ayah, 'hadiths'), name: ayah.book_name, id: ayah.id}));
    // console.log('playlist in bukharilist:', apiConfig.singleAudioFile(props.bukhariList[id][0], 'hadiths'), playList)
    this.player = React.createRef();
    let playList = [];
    let i = 0;

    props.bukhariList[id] &&   props.bukhariList[id].length &&props.bukhariList[id].map((book) => {
      book.start = '';
      book.audio_embed && book.audio_embed.split('<br/>')
      .map((aa, index) => {
        dd = aa.match(/<a href="(.*)">.*$/); 
        //console.log('d', dd);
        dd && playList.push({uri: dd[1], name: dd[1].split('/').pop(), id: ++i});
        index == 0 && dd && (book.start = i)
      });
    });
    // console.log('playlist', playList)
    this.state = {
      isPlaying: false,
      currentlyPlaying: 1,
      id: id,
      player: React.createRef(),
      playList: playList
    }
  }
  // generatePlayList = (nextProps, id)=>{
  //   const playList = nextProps.bukhariList[id].map((ayah)=>({uri: apiConfig.singleAudioFile(ayah, 'hadiths'), name: ayah.book_name, id: ayah.id}));
  //   this.setState({playList: playList})
  // }
  setCurrentlyPlaying = (context, pause) => {
    let {isPlaying}  = this.state;
    this.setState({currentlyPlaying : context.id, isPlaying: pause? !isPlaying: true});
    pause ? this.state.player.pause(context) : this.state.player.play(context);
  }
  capitalize = (s) => {
    if (typeof s != 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  componentDidMount(){
    const id = this.props.navigation.getParam('id');
    if(!this.props.bukhariList[id] || !this.props.bukhariList[id].length){
   
     const id = this.props.navigation.getParam('id');
    //  console.log('dont have bukhari list fetching', id);
     this.props.fetchBukhariList({id});
    }
  }
  componentWillReceiveProps(nextProps){
    if(!this.state.playList.length && nextProps.bukhariList[this.state.id]){
      let playList = [];
      this.props.bukhariList[id] &&this.props.bukhariList[id].length&& this.props.bukhariList[id].map((book) => {
        book.start = '';
        book.audio_embed && book.audio_embed.split('<br/>')
        .map((aa, index) => {
          dd = aa.match(/<a href="(.*)">.*$/); 
          //console.log('d', dd);
          dd && playList.push({uri: dd[1], name: dd[1].split('/').pop(), id: ++i});
          index == 0 && dd && (book.start = i);
        });
      });
      this.setState({playList: playList})
    }
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item: hadith_books} ) => {
    // console.log('render item', surah);
     const id = this.props.navigation.getParam('id');
    //  console.log('in bukhari list id context book id', id, hadith_books);
    return (
     <ListItem onPress={()=>{this.props.navigation.push('BukhariDetails', {contextBookId: id, id: hadith_books.id, title: `${hadith_books.book_name}` })}}>
        <Left style={{maxWidth:30}}>
          <Text style={theme.textColor}>{hadith_books.book_serial}</Text>
        </Left>
       <Body>
          <Text style={theme.textColor}>{this.capitalize(hadith_books.book_name)}</Text>
          <Text style={theme.textColor}>({hadith_books.hadith_end-hadith_books.hadith_start+1})</Text>
       </Body>
       
{<Right> 
   {this.state.player && this.state.player.play && hadith_books.audio_embed ?
       <RightPlayerHadith style={{alignSelf:'flex-start'}} 
       context={hadith_books} 
       player={this.state.player} 
       currentlyPlaying={this.state.currentlyPlaying}
       setCurrentlyPlaying={this.setCurrentlyPlaying.bind(this)}
       mixed={true}
       />:null
  }
 </Right> }
       {/* <RightPlayer style={{alignSelf:'flex-start'}} surah={surah} player={this.player} /> */}
       {/* <RightPlayer style={{alignSelf:'flex-start'}} 
       context={hadith_books} 
       player={this.state.player} 
       currentlyPlaying={this.state.currentlyPlaying}
       setCurrentlyPlaying={this.setCurrentlyPlaying.bind(this)}
       /> */}
      </ListItem> 
    )
  };
  render(){
    
    const id = this.props.navigation.getParam('id');
    // console.log('this.props.bukhariList', this.props.bukhariList[id], this.state.playList);
    return (
      <Container style={appStyles.container}>
        <View 
            source={imgs.bg1} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
          {!this.props.bukhariList[id] || !this.props.bukhariList[id].length?
          
            (<View style={commonStyles.loading}>
      <ActivityIndicator size='large' color="white" />
    </View>):
          <FlatList
          
        data={this.props.bukhariList[id]}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={this._keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
        renderItem={this._renderItem}
      />
          }
          </Content>
         <Footer>

          <Player book={'hadiths'} 
          onRef={ref => {this.setState({ player : ref})}} 
          playList={this.state.playList} />
        </Footer> 
         </View>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    bukhariList: state.common.bukhariList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBukhariList: (query)=> dispatch(fetchBukhariList(query))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(BukhariList);