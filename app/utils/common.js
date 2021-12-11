import React from 'react';
import { Toast, Icon } from 'native-base';
import { Strings } from '../constants';

const showToast = (msg,type) => {
	if(msg=='') return;
	Toast.show({
	    text: msg,
	    buttonText: "Okay",
	    type: type || 'default',
	    duration:4000,
	    position: "top",
	    style:{marginTop:25}
	  });
}
const getCurrentRoute = (state: Object) => {
  const findCurrentRoute = (navState: Object) => {
    if (navState.index !== undefined) {
      return findCurrentRoute(navState.routes[navState.index])
    }
    return navState.routeName
  }
  return findCurrentRoute(state.nav)
}

const getFontIcon = (name,style={},size=12,type='AntDesign') =>{
	return <Icon name={name} fontSize={size} type={type} style={[{color:'#ffffff'},style]} />;
}

const getLanguage = (code) =>{
	return Strings[code||0];
}

const getAudioFileUrl = ({audio_embed}) => {
	if(audio_embed){ 
		const url = audio_embed.toString().match(/"(.*mp3)"/g)[0].replace(/"/g,"");
		return url;
	}//["\"http://www.qnsacademy.com/files/source/00_quran/03_quran_mp3_sheikh_sudais_shuraim/1_surat_al_fatiha_with_audio_english_translation_sheikh_sudais_shuraim.mp3\""]
	return '';
}
export {
	getLanguage,
	showToast,
	getCurrentRoute,
	getFontIcon,
	getAudioFileUrl
};