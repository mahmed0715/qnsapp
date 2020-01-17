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
import {fetchBukhariList} from "../../actions/common";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import Player from '../../components/Player';

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
  componentDidMount(){
    if(!this.props.bukhariList || !this.props.bukhariList.length){
     console.log('dont have bukhari list fetching');
     this.props.fetchBukhariList({id:1});
    }
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
    fetchBukhariList: (query)=> dispatch(fetchBukhariList(query))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(BukhariList);