import React,{useState} from "react";
import { View, TouchableWithoutFeedback ,Dimensions, Icon, TouchableHighlight} from 'react-native';
import { connect } from "react-redux";
import { TouchableOpacity} from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';
import theme from '../containers/styles';
import {
  Button,
  Text,
  Header, Left, Body, Title, Right
} from 'native-base';
import { I18nManager } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
import TrackPlayerComponentSingle from './TrackPlayerComponentSingle';
const Single = ({item, hidePlayer})=> {
    // console.log('startloading in single:', startLoading);
  // console.log('hideplayer==============----=', hidePlayer, item.audio_embed)
  const BACKGROUND_COLOR = '#FFFFFF';
  const iconColor = '#1f8ec6';
  const iconSize = 24;

  const capitalize = (s) => {
    if (typeof s != 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

 
 const removeSupTag = (text) => {
  if(!text)return '';
  text = capitalize(text);
  if(text[0].search(/\s/)>-1){
    text[0] = '';
  }
  return text.replace(/\<sup.*\<\/sup\>/g,'').replace(/\s\s+/g, ' ');
 }
    return (
      <View style={{ borderWidth:0, marginLeft: 5, paddingTop:5, paddingBottom:10, borderBottomColor:'white', borderBottomWidth:.5, width: screenWidth * 0.96, maxWidth: screenWidth * 0.98}}>
     
      <View style={{flexDirection:'column'}}>
        <View style={{flexDirection:'row', alignItems:'space-between'}}>
        <Text style={[theme.textColor, {alignSelf:'flex-start', textAlign:'left', paddingLeft:3, paddingRight:0}]}>{item.hadith_serial||item.verse_serial}.</Text>
        {!hidePlayer && (item.audio_file|| item.audio_embed) ? 
       
        <TrackPlayerComponentSingle context={item} />
        : null
        
      
}
    </View>
        <View style={{paddingRight:10, marginRight: 10, paddingLeft:5, width: screenWidth * 0.90, margin: 0, padding: 0}}> 
          {item.text_madani  ? <Text style={[theme.textColor, 
            { textAlign:'right', fontSize:17, width: screenWidth * 0.88, margin: 2, paddingBottom: 8, writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',  padding: 1}]}> {(item.text_madani)}</Text> :null}
{item.hadith_narrated || item.text_details || item.detail? <Text style={[theme.textColor, { textAlign:'left', width: screenWidth * 0.88, margin: 1, padding: 1}]}>
  {removeSupTag(item.hadith_narrated)} {removeSupTag(item.detail||item.text_details + ' ')}
  </Text> :null}
         

        </View>
      </View>
   
   
    </View> 
    );
  }


// Exports
export default Single;