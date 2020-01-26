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
import Player from '../../components/Player';

class BukhariDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      currentlyPlaying: 1
    }
  }
  
  componentDidMount(){
    const id = this.props.navigation.getParam('id');
    if(!this.props.bukhariDetails || !this.props.bukhariDetails[id]){
      console.log('dont have quran list in quran list screen, fetching');
      this.props.fetchBukhariDetails({id:id});
    }
  }
  componentWillReceiveProps(nextProps){
    console.log('nexprops:', nextProps.bukhariDetails);
    const id = nextProps.navigation.getParam('id');
    if(!nextProps.bukhariDetails[id]){
      console.log('dont have quran details in quran details screen, fetching');
      this.props.fetchBukhariDetails({id: id});
      }
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item: hadith_books} ) => {
    // console.log('render item', surah);
    return (
     <ListItem>
        <Left style={{maxWidth:30}}>
          <Text style={theme.textColor}>{hadith_books.id}</Text>
        </Left>
       <Body>
          <Text style={theme.textColor}>{hadith_books.hadith_narrated}</Text>
          <Text style={theme.textColor}>({hadith_books.text_details})</Text>
       </Body>
       
{/* <Right> 
  <Text>Verse {surah.verse_number}</Text>
 </Right> */}
       {/* <RightPlayer style={{alignSelf:'flex-start'}} surah={surah} player={this.player} /> */}
      </ListItem> 
    )
  };
  render(){
    const id = this.props.navigation.getParam('id');
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg1} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
          {!this.props.bukhariDetails[id]?
          
            (<View style={commonStyles.loading}>
      <ActivityIndicator size='large' color="white" />
    </View>):
          <FlatList
          
        data={this.props.bukhariDetails[id]}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={this._keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
        renderItem={this._renderItem}
      />}
          
          </Content>
         
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
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