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

const Single = ({item, player, startLoading, hidePlayer})=> {
    // console.log('startloading in single:', startLoading);
  // console.log('hideplayer==============----=', hidePlayer, item.audio_embed)
  const BACKGROUND_COLOR = '#FFFFFF';
  const iconColor = '#1f8ec6';
  const iconSize = 24;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const capitalize = (s) => {
    if (typeof s != 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

 
  const setCurrentlyPlaying = (id) => {
    
    player.play({id});
    startLoading();
    
  }
 const removeSupTag = (text) => {
  if(!text)return '';
  text = capitalize(text);
  if(text[0].search(/\s/)>-1){
    text[0] = '';
  }
  return text.replace(/\<sup.*\<\/sup\>/g,'').replace(/\s\s+/g, ' ');
 }
//  console.log('text', item.text_details);
    return (
      <View style={{ borderWidth:0, marginLeft: 5, paddingTop:5, paddingBottom:10, borderBottomColor:'white', borderBottomWidth:.5, width: screenWidth * 0.96, maxWidth: screenWidth * 0.98}}>
      {/* <Left style={{maxWidth: 35, justifyContent:'flex-start','alignItems':'flex-start', backgroundColor:'red'}}>
        <Text style={[theme.textColor, {alignSelf:'flex-start'}]}>{surah.verse_serial}</Text>
      </Left> */}
      <View style={{flexDirection:'column'}}>
        <View style={{flexDirection:'row', alignItems:'space-between'}}>
        <Text style={[theme.textColor, {alignSelf:'flex-start', textAlign:'left', paddingLeft:3, paddingRight:0}]}>{item.hadith_serial||item.verse_serial}.</Text>
        {!hidePlayer && player  && (item.audio_file|| item.audio_embed) ? 
        <RightPlayer 
        context={item} 
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
        <View style={{paddingRight:10, marginRight: 10, paddingLeft:5, width: screenWidth * 0.90, margin: 0, padding: 0}}> 
          {item.text_madani  ? <Text style={[theme.textColor, 
            { textAlign:'right', fontSize:17, width: screenWidth * 0.88, margin: 2, paddingBottom: 8, writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',  padding: 1}]}> {(item.text_madani)}</Text> :null}
{item.hadith_narrated || item.text_details || item.detail? <Text style={[theme.textColor, { textAlign:'left', width: screenWidth * 0.88, margin: 1, padding: 1}]}>
  {removeSupTag(item.hadith_narrated)} {removeSupTag(item.detail||item.text_details + ' ')}
  </Text> :null}
          {/* <Text style={[theme.textColor, {width: screenWidth * 0.83, margin: 5, marginLeft: 0, marginTop: 10, paddingBottom: 5, marginBottom: 2, borderBottomWidth: 2, borderBottomColor: 'red'}]}> 
          {
          
          removeSupTag(item.detail||item.text_details + ' ')
          
          }
{''+'  '}
        <Text style={{minHeight: 5}}> {' '}</Text>
          </Text> */}

        </View>
      </View>
   
   
    </View> 
    );
  }


// Exports
export default Single;