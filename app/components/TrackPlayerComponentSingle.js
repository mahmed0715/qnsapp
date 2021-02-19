import React, {useEffect, useState} from 'react';
import {Text, Button, View, Image, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
} from 'react-native-track-player';
import { TouchableOpacity} from 'react-native-gesture-handler'
import {
  useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks';
import {
    Icon,
  
  } from 'native-base';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#8bb0cb';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;

export default TrackPlayerComponentSingle = (props) => {
   const [trackId, setTrackId] = useState('0'); 
  const [isPlaying, setIsPlaying] = useState(false);

 useEffect(()=>{
	checker()

 }, [])
 
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    } else if(event.state == 6){
        // buffereing dont do anything...
      }else {
	  	setIsPlaying(false);
    	}
  });
  const checker = () => {
	 TrackPlayer.getCurrentTrack().then((current)=>{
		//  console.log('checker in single', current, trackId);
		current != trackId && setTrackId(current);
		//await TrackPlayer.getState() == 3 && setIsPlaying(true);
	});
	
	}
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_TRACK_CHANGED], checker);

	const onButtonPressed = async () => {
		if (isPlaying && trackId == (props.hadith?props.start:props.context.id)) {
		  TrackPlayer.pause();
		  setIsPlaying(false)
	   
		}else {
		  TrackPlayer.skip(props.hadith?props.start:props.context.id);
		  TrackPlayer.play();
		  setIsPlaying(true)
		  setTrackId(props.hadith?props.start:props.context.id)
		} 
		
	  };

  const iconColor = 'white';
		const bgColor = '#e7e0e0';
		const iconSize = 30;
  return (
	<View>
	<TouchableOpacity  
		style={{paddingLeft: 10, paddingTop:5, paddingBottom: 10, paddingRight: 10}} 
		onPress={onButtonPressed} >   
		
		  {!!isPlaying && (!!props.hadith ? (trackId >= props.start && trackId <= props.end) : (trackId == props.context.id)) ? <Icon
	  size={iconSize}
	 
	  style={{fontSize: iconSize, color: iconColor}}
		  name='pause'
		/>:
		  <Icon
	  size={iconSize}
	 
	  style={{fontSize: iconSize,color: iconColor}}
		  name="play"
		/>} 
		</TouchableOpacity>
	
	 </View>
    
  );
};

// export default TrackPlayerComponent;


const styles = StyleSheet.create({
 

	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: BACKGROUND_COLOR,
	},
	portraitContainer: {
		marginTop: 80,
	},
	portrait: {
		height: 200,
		width: 200,
	},
	detailsContainer: {
		marginTop: 0,
		alignItems: 'center',
	},
	playbackContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	playbackSlider: {
		 alignSelf: 'stretch',
		marginLeft: 10,
		marginRight: 1,
		marginBottom: 5
	},
	text: {
		fontSize: FONT_SIZE,
		minHeight: FONT_SIZE,
	},
	buttonsContainerBase: {
		flex: 1,
		// flexDirection: 'row',
		// alignItems: 'flex-start',
		// justifyContent: 'space-around',
		
	},
	buttonsContainerTopRow: {
		maxHeight: 20,
		minWidth: DEVICE_WIDTH / 2.0,
		maxWidth: DEVICE_WIDTH / 2.0,
	},
	buttonsContainerMiddleRow: {
		// maxHeight: 20,
		alignSelf: 'stretch',
		// paddingRight: 20,
	},
	volumeContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		minWidth: DEVICE_WIDTH - 40,
		maxWidth: DEVICE_WIDTH - 40,
	},
	volumeSlider: {
		width: DEVICE_WIDTH - 80,
	},
	buttonsContainerBottomRow: {
		alignSelf: 'stretch',
	},
	rateSlider: {
		width: DEVICE_WIDTH - 80,
	},
	btn: {backgroundColor: '#228392', paddingHorizontal:10, paddingVertical: 5},
	playerBtn: {borderColor:'#acdcef', borderWidth:0}
});