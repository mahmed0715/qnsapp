
import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableHighlight} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers } from '../../components';
import imgs from '../../assets/images';
import axios from 'axios';
import {fetchQuranList} from "../../actions/common";
import url from '../../config/api';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right, Footer, FooterTab
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
// import styles from './styles';
import AudioPlayer from '../../components/AudioPlayer';
import Player from '../../components/Player';
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount(){
    if(!this.props.quranList || !this.props.quranList.length){
      console.log('dont have quran list, fetching');
      this.props.fetchQuranList({});
    }
  }
  render(){
    return (
      <Container style={appStyles.container}>
      
        <ImageBackground 
            source={imgs.bg1} 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>

            <View style={styles.container}>
              <TouchableHighlight style={styles.item} onPress={()=>{this.props.navigation.navigate('QuranList', {title: 'Quran Majid'})}}>
             <View>
             <Image source={require('./../assets/images/book.png')}
       style={{width: '90%',marginLeft:10, height: 160}} />
             <Text style={{color:'white', textAlign:'center'}}>Quran Majid</Text>
          </View>
             </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.navigate('BukhariList', {title: 'Sohih Al-Bukhari'})}}>
                <View>
             <Image source={require('./../assets/images/book.png')}
       style={{width: '90%',marginLeft:10, height: 160}} />
             <Text style={{color:'white', textAlign:'center'}}>Sohih Al-Bukhari</Text>
          </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.navigate('QuranList', {title: 'Sohih Al-Muslim'})}}>
                 <View>
             <Image source={require('./../assets/images/book.png')}
       style={{width: '90%',marginLeft:10, height: 160}} />
             <Text style={{color:'white', textAlign:'center'}}>Sohih Al-Muslim</Text>
          </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.navigate('QuranList', {title: 'Sohih-Jami-Tirmiji'})}}>
                 <View>
             <Image source={require('./../assets/images/book.png')}
       style={{width: '90%',marginLeft:10, height: 160}} />
             <Text style={{color:'white', textAlign:'center'}}>Sohih Jami-Tirmiji</Text>
          </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.navigate('QuranList', {title: 'Sohih Sunan Abu Dawud'})}}>
                 <View>
             <Image source={require('./../assets/images/book.png')}
       style={{width: '90%',marginLeft:10, height: 160}} />
             <Text style={{color:'white', textAlign:'center'}}>Sohih Sunan Abu Dawud</Text>
          </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.navigate('QuranList', {title: 'Sohih Ibn-Majah'})}}>
                 <View>
             <Image source={require('./../assets/images/book.png')}
       style={{width: '90%',marginLeft:10, height: 160}} />
             <Text style={{color:'white', textAlign:'center'}}>Sohih Ibn-Majah</Text>
          </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.navigate('QuranList', {title: 'Sohih Sunan Nasai'})}}>
                 <View>
             <Image source={require('./../assets/images/book.png')}
       style={{width: '90%',marginLeft:10, height: 160}} />
             <Text style={{color:'white', textAlign:'center'}}>Sohih Sunan Nasaih</Text>
          </View>
              </TouchableHighlight>
            </View>
           
            {/* <AudioPlayer /> */}
            {/* <Player /> */}
          </Content>
         </ImageBackground>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    bukhariList: state.common.bukhariList,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {  
  return {
    fetchQuranList: (query)=> dispatch(fetchQuranList(query))
   };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    padding:5, margin: 5, borderWidth:1, borderColor:'white',
    // flexBasis:200
    width: '46%' // is 50% of container width
  }
})
// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);;