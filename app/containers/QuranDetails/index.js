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
import {fetchQuranList} from "../../actions/common";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import Player from '../../components/Player';
class QuranDetails extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }
  async componentWillMount(){
    if(!this.props.quranList || !this.props.quranList.length){
      console.log('dont have quran list in quran list screen, fetching');
      this.props.fetchQuranList({});
    }
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item: surah} ) => {
    // console.log('render item', surah);
    return (
     
      <ListItem>
        <Left style={{maxWidth: 35}}>
          <Text>{surah.id}</Text>
        </Left>
        <Body>
          <View> 
            <Text>Surah {surah.name}</Text>
            <Text>Makki  Verse {surah.verse}</Text>
          </View>
        </Body>
     
     
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
          <FlatList
          
        data={this.props.quranList}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={this._keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
        renderItem={this._renderItem}
      />
          
          </Content>
          <Footer>
          <Player id={id} book={'quran'} onRef={ref => (this.player = ref)} />
        </Footer>
         </ImageBackground>
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
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(QuranDetails);