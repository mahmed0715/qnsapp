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
import RightPlayer from './RightPlayer';
import { I18nManager } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

const Single = ({item, player, currentlyPlaying, setCurrentlyPlaying})=> {
  //  console.log('item in single:', player);
  const BACKGROUND_COLOR = '#FFFFFF';
  const iconColor = '#1f8ec6';
  const iconSize = 24;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
 const removeSupTag = (text) => {
  text = capitalize(text);
  return text.replace(/\<sup.*\<\/sup\>/g,'')
 }
    return (
      <View style={{margin:5, paddingTop:5, paddingBottom:10, borderBottomColor:'gray', borderBottomWidth:.5, width: screenWidth * 0.95, maxWidth: screenWidth * 0.95}}>
      {/* <Left style={{maxWidth: 35, justifyContent:'flex-start','alignItems':'flex-start', backgroundColor:'red'}}>
        <Text style={[theme.textColor, {alignSelf:'flex-start'}]}>{surah.verse_serial}</Text>
      </Left> */}
      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'column'}}>
        <Text style={[theme.textColor, {alignSelf:'flex-start', textAlign:'left', paddingLeft:5, paddingRight:3}]}>{item.hadith_serial||item.verse_serial}.</Text>
        {player  && (item.audio_file|| item.audio_embed) ? 
        <RightPlayer context={item} player={player} currentlyPlaying={currentlyPlaying}
        setCurrentlyPlaying={setCurrentlyPlaying}
        />
        : null
        //  	<TouchableHighlight
        //    underlayColor={BACKGROUND_COLOR}
        //    style={{}}
        //    disabled={isLoading}
        //  >
        //    <View >
        //      {isPlaying ? (
        //        <Icon
        //          name="pause"
        //          size={iconSize}
        //        style={{fontSize: iconSize, color: iconColor}}
        //        />
        //      ) : (
        //        <Icon
        //          name="play"
        //          size={iconSize}
        //        style={{fontSize: iconSize, color: iconColor}}
        //        />
        //      )}
        //    </View>
        //  </TouchableHighlight>
        // : null} 
      }
    </View>
        <View style={{paddingRight:10, marginRight: 10, paddingLeft:5}}> 
          {<Text style={[theme.textColor, { textAlign:'right', width: screenWidth * 0.84, margin: 5, writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}> {(item.text_simple||item.hadith_narrated)}</Text> }
          <Text style={[theme.textColor, {width: screenWidth * 0.83, margin: 5, marginTop: 10}]}> {removeSupTag(item.detail||item.text_details)}</Text>
        </View>
      </View>
   
   
    </View> 
    );
  }


// Exports
export default Single;