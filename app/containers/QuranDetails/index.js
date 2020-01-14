import React from 'react'
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
  ListItem
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import {fetchQuranDetails} from "../../actions/common";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import Player from '../../components/Player';
class QuranDetails extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }
  async componentWillMount(){
    if(!this.props.quranDetails || !this.props.quranDetails.length){
      console.log('dont have quran list in quran list screen, fetching');
      this.props.fetchQuranDetails({id:this.props.navigation.getParam('id', 1)});
    }
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item: surah} ) => {
    // console.log('render item', surah);
    return (
     
      <ListItem>
        <Left style={{maxWidth: 35}}>
          <Text>{surah.verse_serial}</Text>
        </Left>
        <Body>
          <View> 
            {<Text> {surah.text_simple}</Text> }
            <Text> {surah.detail}</Text>
          </View>
        </Body>
     
     
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
          
        data={this.props.quranDetails}
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
    quranDetails: state.common.quranDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuranDetails: (query)=> dispatch(fetchQuranDetails(query))
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(QuranDetails);