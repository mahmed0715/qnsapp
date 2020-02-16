
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
      
        <View 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={appStyles.content}>

            <View style={styles.container}>
              <TouchableHighlight style={styles.item} onPress={()=>{this.props.navigation.push('QuranList', {title: 'Quran Majid'})}}>
             {/* <View> */}
             <Image source={require('./../assets/icons/Al-Quran.png')}
       style={styles.image} />
             {/* <Text style={{color:'black', textAlign:'center'}}>Quran Majid</Text> */}
          {/* </View> */}
             </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id: 1, title: 'Sohih Bukhari'})}}>
                {/* <View> */}
             <Image source={require('./../assets/icons/Sahih-Bukhari.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Sohih Bukhari</Text> */}
          {/* </View> */}
              </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id:2, title: 'Sohih Muslim'})}}>
                 {/* <View> */}
             <Image source={require('./../assets/icons/Sahih-Muslim.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Sohih Muslim</Text> */}
          {/* </View> */}
              </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id:3, title: 'Jami At Tirmidhi'})}}>
                 {/* <View> */}
             <Image source={require('./../assets/icons/Jami-At-Tirmidhi.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Jami At Tirmidhi</Text> */}
          {/* </View> */}
              </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id:4,title: 'Sunan An Nasai'})}}>
                 {/* <View style={{padding:10}}> */}
             <Image source={require('./../assets/icons/Sunan-An-Nasai.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Sunan An Nasai</Text> */}
          {/* </View> */}
              </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id:5, title: 'Sunan Abu Dawud'})}}>
                 <View style={{padding:10}}>
             <Image source={require('./../assets/icons/Sunan-Abu-Dawud.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Sunan Abu Dawud</Text> */}
          </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id: 6, title: 'Sunan Ibn Majah'})}}>
             <Image source={require('./../assets/icons/Sunan-Ibn-Majah.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Sunan Ibn Majah</Text> */}
              </TouchableHighlight>
              <View style={styles.item}></View>
            </View>
           
            {/* <AudioPlayer /> */}
            {/* <Player /> */}
          </Content>
         </View>
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
  image:{
    height: 135, width: 120
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // borderWidth: 1,
    // borderColor:'red',
    justifyContent:'center',
    alignItems: 'center' // if you want to fill rows left to right
  },
  item: {
    flex:1,
    // padding:5, margin: 5, borderWidth:0, borderColor:'white',
    flexBasis:'50%',
    // borderWidth:1,
    // borderColor:'green',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    flexDirection:'row'

    // width: '46%' // is 50% of container width
  }
})
// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);;