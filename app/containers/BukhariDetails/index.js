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
import Single from '../../components/Single';
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
    const contextBookId = this.props.navigation.getParam('contextBookId');
    
    const id = this.props.navigation.getParam('id');
    if(!this.props.bukhariDetails[contextBookId] || !this.props.bukhariDetails[contextBookId][id]){
      console.log('dont have bukhari details, fetching', contextBookId, id);
      this.props.fetchBukhariDetails({contextBookId, id});
    }
  }
  componentWillReceiveProps(nextProps){
    console.log('nexprops:', nextProps.bukhariDetails);
    const contextBookId = nextProps.navigation.getParam('contextBookId');
    
    const id = nextProps.navigation.getParam('id');
    if(!nextProps.bukhariDetails[contextBookId] || !nextProps.bukhariDetails[contextBookId][id]){
      console.log('dont have bukhari details, fetching', contextBookId, id);
      this.props.fetchBukhariDetails({contextBookId, id});
    }
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ( {item} ) => {
    return (
     <Single item={item} />

    )
  };
  render(){
    const contextBookId = this.props.navigation.getParam('contextBookId');
    
    const id = this.props.navigation.getParam('id');
    console.log('data', this.props.bukhariDetails, contextBookId, id);
    return (
      <Container style={appStyles.container}>
        <ImageBackground 
            source={imgs.bg1} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>
          {!this.props.bukhariDetails[contextBookId] || !this.props.bukhariDetails[contextBookId][id]?
          
            (<View style={commonStyles.loading}>
      <ActivityIndicator size='large' color="white" />
    </View>):
          <FlatList
          
        data={this.props.bukhariDetails[contextBookId][id]}
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