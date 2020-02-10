import React from "react";
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import theme from '../containers/styles';
import {
  Button,
  Text,
  Header, Left, Body, Title, Right
} from 'native-base';


const Single = ({item})=> {
 
    return (
      <View style={{margin:5, paddingTop:5, paddingBottom:10, borderBottomColor:'#fafafa', borderBottomWidth:.5}}>
      {/* <Left style={{maxWidth: 35, justifyContent:'flex-start','alignItems':'flex-start', backgroundColor:'red'}}>
        <Text style={[theme.textColor, {alignSelf:'flex-start'}]}>{surah.verse_serial}</Text>
      </Left> */}
      <View style={{flexDirection:'row'}}>
        <Text style={[theme.textColor, {alignSelf:'flex-start', textAlign:'left', paddingLeft:5, paddingRight:3}]}>{item.verse_serial||item.id}</Text>
        <View style={{paddingRight:10, marginRight: 10, paddingLeft:5}}> 
          {<Text style={[theme.textColor]}> {item.text_simple||item.hadith_narrated}</Text> }
          <Text style={[theme.textColor]}> {item.detail||item.text_details}</Text>
        </View>
      </View>
   
   
    </View> 
    );
  }


// Exports
export default Single;