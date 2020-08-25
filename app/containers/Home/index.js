
import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableHighlight, TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers } from '../../components';
import imgs from '../../assets/images';
import axios from 'axios';
import {fetchQuranList, fetchBukhariList} from "../../actions/common";
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
// import AudioPlayer from '../../components/AudioPlayer';
// import Player from '../../components/Player';
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  async UNSAFE_componentWillMount(){
    if(!this.props.quranList || !this.props.quranList.length){
      // console.log('dont have quran list, fetching');
      this.props.fetchQuranList({});
    }
    if(!this.props.bukhariList || !this.props.bukhariList[1] || !this.props.bukhariList[1].length){
      // console.log('dont have bukhari list, fetching');
      this.props.fetchBukhariList({id: 1});
    }
    if(!this.props.bukhariList || !this.props.bukhariList[2] || !this.props.bukhariList[2].length){
      // console.log('dont have bukhari list, fetching');
      this.props.fetchBukhariList({id: 2});
    }
    if(!this.props.bukhariList || !this.props.bukhariList[3] || !this.props.bukhariList[3].length){
      // console.log('dont have bukhari list, fetching');
      this.props.fetchBukhariList({id: 3});
    }
    if(!this.props.bukhariList || !this.props.bukhariList[4] || !this.props.bukhariList[4].length){
      // console.log('dont have bukhari list, fetching');
      this.props.fetchBukhariList({id: 4});
    }
    if(!this.props.bukhariList || !this.props.bukhariList[5] || !this.props.bukhariList[5].length){
      // console.log('dont have bukhari list, fetching');
      this.props.fetchBukhariList({id: 5});
    }
    if(!this.props.bukhariList || !this.props.bukhariList[6] || !this.props.bukhariList[6].length){
      // console.log('dont have bukhari list, fetching');
      this.props.fetchBukhariList({id: 6});
    }
  }
  render(){
    const BACKGROUND_COLOR = 'green';
    return (
      <Container style={appStyles.container}>
      
        <View 
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers {...this.props} />
          <Content enableOnAndroid style={[appStyles.content,{paddingTop: 10, backgroundColor: 'white'}]}>

            <View style={styles.container}>
              <TouchableOpacity 
              	underlayColor={BACKGROUND_COLOR}
              style={[styles.item,{paddingBottom:10}]} onPress={()=>{this.props.navigation.push('QuranList', {title: 'Al Quran'})}}>
             {/* <View> */}
             <Image source={require('./../assets/icons/Al-Quran.png')}
       style={styles.image} />
             {/* <Text style={{color:'black', textAlign:'center'}}>Quran Majid</Text> */}
          {/* </View> */}
             </TouchableOpacity>
              <TouchableOpacity style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id: 1, title: 'Sahih Bukhari'})}}>
                {/* <View> */}
             <Image source={require('./../assets/icons/Sahih-Bukhari.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Sahih Bukhari</Text> */}
          {/* </View> */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id:2, title: 'Sahih Muslim'})}}>
                 {/* <View> */}
             <Image source={require('./../assets/icons/Sahih-Muslim.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Sahih Muslim</Text> */}
          {/* </View> */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id:3, title: 'Jami At Tirmidhi'})}}>
                 {/* <View> */}
             <Image source={require('./../assets/icons/Jami-At-Tirmidhi.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Jami At Tirmidhi</Text> */}
          {/* </View> */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id:4,title: 'Sunan An Nasai'})}}>
                 {/* <View style={{padding:10}}> */}
             <Image source={require('./../assets/icons/Sunan-An-Nasai.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Sunan An Nasai</Text> */}
          {/* </View> */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id:5, title: 'Sunan Abu Dawud'})}}>
                 <View style={{padding:10}}>
             <Image source={require('./../assets/icons/Sunan-Abu-Dawud.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Sunan Abu Dawud</Text> */}
          </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} 
              onPress={()=>{this.props.navigation.push('BukhariList', {id: 6, title: 'Sunan Ibn Majah'})}}>
             <Image source={require('./../assets/icons/Sunan-Ibn-Majah.png')}
       style={styles.image} />
             {/* <Text style={{color:'white', textAlign:'center'}}>Sunan Ibn Majah</Text> */}
              </TouchableOpacity>
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
    quranList: state.common.quranList,
    bukhariList: state.common.bukhariList,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {  
  return {
    fetchQuranList: (query)=> dispatch(fetchQuranList(query)),
    fetchBukhariList: (query)=> dispatch(fetchBukhariList(query)),
   };
};

const styles = StyleSheet.create({
  image:{
    height: 135, width: 135
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