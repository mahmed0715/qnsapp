import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Image, FlatList, TouchableHighlight} from 'react-native'
import _ from 'lodash'; 
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
import {fetchBukhariDetails} from "../../actions/common";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import Player from '../../components/Player';

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
class BukhariList extends React.Component {
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
    //if(!this.props.bukhariDetails || !this.props.bukhariDetails.length){
    //  console.log('dont have quran list in quran list screen, fetching');
    //  this.props.fetchBukhariDetails({});
    //}
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item: hadith_books} ) => {
    // console.log('render item', surah);
    return (
     <ListItem onPress={()=>{this.props.navigation.navigate('BukhariDetails', { id: hadith_books.id, title: `${hadith_books.book_name}` })}}>
        <Left style={{maxWidth:30}}>
          <Text>{hadith_books.id}</Text>
        </Left>
       <Body>
          <Text>{hadith_books.book_name}</Text>
          <Text>({hadith_books.hadith_end-hadith_books.hadith_start+1})</Text>
       </Body>
       
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
        <ImageBackground 
            source={imgs.bg1} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
          <FlatList
          
        data={this.props.bukhariList}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={this._keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
        renderItem={this._renderItem}
      />
          
          </Content>
         
         </ImageBackground>
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
    fetchBukhariDetails: (query)=> dispatch(fetchBukhariDetails(query))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(BukhariList);