import React from 'react'
import { StyleSheet, ScrollView, View, ImageBackground, Image, FlatList, TouchableHighlight, ActivityIndicator} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers } from '../../components';
import commonStyles from '../styles';
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
    this.state = {id:props.navigation.getParam('id')}
  }
  componentWillMount(){  
    const id = this.props.navigation.getParam('id');
      
     console.log('got qurqan details did mount', JSON.stringify(this.props.quranDetails) , id);
     if(!this.props.quranDetails || !this.props.quranDetails[id]){
      console.log('dont have quran details in quran details screen, fetching');
      this.props.fetchQuranDetails({id:id});
      }
  }
  componentWillReceiveProps(nextProps){
    console.log('nexprops:', nextProps.quranDetails);
    const id = nextProps.navigation.getParam('id');
    if(!nextProps.quranDetails || !nextProps.quranDetails[id]){
      console.log('dont have quran details in quran details screen, fetching');
      this.props.fetchQuranDetails({id:id});
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
    const id = this.props.navigation.getParam('id');
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg1} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
{!this.props.quranDetails[id] ?
  (<View style={commonStyles.loading}>
      <ActivityIndicator size='large' color="white" />
    </View>)
  :

          (<FlatList
          
        data={this.props.quranDetails[id]}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={this._keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
        renderItem={this._renderItem}
      />)
}
          
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