import React,{useState} from "react";
import { View, TouchableWithoutFeedback ,Dimensions, Icon, TouchableHighlight, } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import theme from '../containers/styles';
import {
  Button,
  Text,
  Header, Left, Body, Title, Right
} from 'native-base';
import { I18nManager } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

const SingleHadithCustom = ({item})=> {
console.log(item);
  const capitalize = (s) => {
    if (typeof s != 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
 const removeSupTag = (text) => {
  text = capitalize(text);
  if(text && text[0].search(/\s/)>-1){
    text[0] = '';
  }
  return text.replace(/\<sup.*\<\/sup\>/g,'').replace(/\s\s+/g, ' ');
 }
    return (
      <View style={{ borderWidth:0, marginLeft: 5, paddingTop:5, paddingBottom:10, borderBottomColor:'white', borderBottomWidth:.5, width: screenWidth * 0.95, maxWidth: screenWidth * 0.95}}>
    
      <View style={{flexDirection:'column'}}>
        <View style={{flexDirection:'row', alignContent: 'space-between'}}>
        <Text style={[theme.textColor, {alignSelf:'flex-start', textAlign:'left', paddingLeft:3, paddingRight:0}]}>{item.hadith_serial||item.verse_serial}.</Text>
       
        
    </View>
        <View style={{paddingRight:10, marginRight: 10, paddingLeft:5, width: screenWidth * 0.96, margin: 5}}> 
          {item.text_madani  ? <Text style={[theme.textColor, { lineHeight: 30, textAlign:'right', width: screenWidth * 0.95, margin: 5, paddingBottom: 8, writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}> {(item.text_madani)}</Text> :null}
{item.hadith_narrated || item.text_details || item.detail? <Text style={[theme.textColor, { lineHeight:24, textAlign:'left', width: screenWidth * 0.94, padding: 10}]}>
  {removeSupTag(item.hadith_narrated)} {removeSupTag(item.detail||item.text_details + ' ')}
  </Text> :null}
         

        </View>
      </View>
   
   
    </View> 
    );
  }


// Exports
export default SingleHadithCustom;