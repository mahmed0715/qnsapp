import React, {useEffect, useState} from 'react';
import {Text, Button, View, Image, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
  skipToPrevious,
} from 'react-native-track-player';
import {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks';
import {
    Icon,
  
  } from 'native-base';

import Slider from '@react-native-community/slider';
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#8bb0cb';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';
const RATE_SCALE = 3.0;


const trackPlayerInit = async (props) => {
  await TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP, 
      TrackPlayer.CAPABILITY_SEEK_TO
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP, 
      TrackPlayer.CAPABILITY_SEEK_TO
  ],
    notificationCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP, 
      TrackPlayer.CAPABILITY_SEEK_TO
  ]
  });
 // TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      // TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      // TrackPlayer.CAPABILITY_STOP, 
//   await TrackPlayer.add({
//     id: '0',
//     url: songDetails.url,
//     type: 'default',
//     title: songDetails.title,
//     album: songDetails.album,
//     artist: songDetails.artist,
//     artwork: songDetails.artwork,
//   });
//   await TrackPlayer.add(Object.assign({type: 'default'},songDetails2));
const playList = [...props.queue.map((q)=>{
	q.type = 'default';
	q.url = q.uri;
	q.title = q.name;
	q.artist = props.book;
	// q.album = q.book;
	return q;
})];

  await TrackPlayer.add(playList);
  return true;
};

const TrackPlayerComponent = (props) => {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
   const [trackId, setTrackId] = useState(0); 
  const [track, setTrack] = useState({});
//   const [title, setTitle] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const {position, duration} = useTrackPlayerProgress(250);
// const [stopped, setStopped] = useState(true);
   useEffect(() => {
   const startPlayer = async () => {
      let isInit =  await trackPlayerInit(props);
	  setIsTrackPlayerInit(isInit);
	  console.log(props.queue[0]);
	  props.queue && props.queue.length && setTrack(props.queue[0]);
   }
   startPlayer();
 }, []);

  //this hook updates the value of the slider whenever the current position of the song changes
 useEffect(() => {
	 console.log(position, duration, trackId)
   if (!isSeeking && position && duration) {
     setSliderValue(position / duration);
   }
   TrackPlayer.getCurrentTrack().then((t)=>{
	   console.log('Got track id:', t, trackId);
	if(t!=trackId ) 

	{//setTrack()
	// setTrackId(t);
	// getTrack();
		updateTrack();
	}
   })
 }, [position, duration]);
 
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
	  console.log('ebent changed', event)
    if (event.state === STATE_PLAYING) {
      !isPlaying && setIsPlaying(true);
    //   setTitle(await getTitle());
    //   setStopped(false);
    } else {
	  setIsPlaying(false);
	//   setStopped(true);
	//   TrackPlayer.getCurrentTrack().then((t)=>{
	// 	t != trackId && getTrack();
	// })
    }
  });
//   useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_TRACK_CHANGED], (event) => {
// 	console.log('event  track changed on component', event)
//   if (event.nextTrack > 0) {
// 	// setIsPlaying(true);
//   //   setTitle(await getTitle());
// 	// setStopped(false);
// 	// setTrack()
// 	setTrackId(event.nextTrack);

// 	getTitle();
//   } else {
// 	// setIsPlaying(false);
//   }
// });
  const onButtonPressed = async () => {
    if (!isPlaying) {
      TrackPlayer.play();
      updateTrack();
      //setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      //setIsPlaying(false);
    }
    console.log(await TrackPlayer.getQueue());
    console.log(await TrackPlayer.getCurrentTrack())
  
  };
const stop = async ()=>{
    try {
        await TrackPlayer.stop();
        setSliderValue(0);
        //  setStopped(true);
      } catch (error) {
        console.log(error);
        TrackPlayer.stop();
      }
}
  const slidingStarted = () => {
    setIsSeeking(true);
  };
  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log(error);
      TrackPlayer.stop();
    }
    // this.UpdateTrack();
    // this.UpdateTrackUI();
    console.log(await TrackPlayer.getCurrentTrack())
  }
 const updateTrack = async ()=>{
	
	 try{
		const trackId = await TrackPlayer.getCurrentTrack();
		setTrackId(trackId);
		const t = await TrackPlayer.getTrack(trackId);
		setTrack(t);
	 }catch(err){
		console.warn(err);
		// undefined;
	 }
	 
 }
  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    //   this.UpdateTrack();
    } catch (error) {
      console.log(error);
    }
    // this.UpdateTrack();
    // this.UpdateTrackUI();
    console.log(await TrackPlayer.getCurrentTrack())
  }

  const slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
	setIsSeeking(false);
	
  };
  const formatTime = (seconds) => {
	// if(this.state.SliderDisable){
	//   this.TrackSlider();
	// }
	return seconds > 3600 
	?
	  [
		parseInt(seconds / 60 / 60),
		parseInt(seconds / 60 % 60),
		parseInt(seconds % 60)
	  ].join(":").replace(/\b(\d)\b/g, "0$1")
	:
	  [
		parseInt(seconds / 60 % 60),
		parseInt(seconds % 60)
	  ].join(":").replace(/\b(\d)\b/g, "0$1")
  }
  const iconColor = 'white';
		const bgColor = '#e7e0e0';
		const iconSize = 30;
  return (
      
      <View style={[styles.container, {flexDirection:'column', paddingLeft: 5, paddingRight: 15, backgroundColor:'#228392', paddingTop: 8}]}>
				
				<View style={{  flexDirection:'row', justifyContent:'center', alignItems:'center', borderColor:'blue', borderWidth:0}}>
				<View style={[styles.detailsContainer, {flex:1, borderColor:'yellow', borderWidth:0}]}>
					<Text style={[styles.text, {color: 'white'}]}>
                       {props.titlePrefix && (props.titlePrefix + ' ')} {(track||{}).title || (props.queue && props.queue[0].title)}
					</Text>
					<Text style={[styles.text,{color: 'white'}]}>
                    { isPlaying ? formatTime(position) : 0} / {formatTime(duration)}
						
					</Text>
				</View>
			
			
				<View
					style={[
					
						{
							opacity: !isTrackPlayerInit
								? DISABLED_OPACITY
								: 1.0,
						},
						{
							flexDirection:'row',
							flex:1,
							alignItems:'space-between',
							justifyContent:'space-between',
							marginTop: 0, 
							
							
							borderColor:'red',
							borderWidth: 0,
							
						}
					]}
				>
					 <TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={[styles.wrapper, styles.btn, styles.playerBtn]}
                        onPress={skipToPrevious}
						disabled={!isTrackPlayerInit}
					>
						
							<Icon
							type="FontAwesome"
							name="fast-backward"
							size={iconSize}
								style={{fontSize: iconSize, color: iconColor}}
								color="#1f8ec6"
							/>
											</TouchableHighlight>

					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={[styles.wrapper, styles.btn, styles.playerBtn]}
						onPress={onButtonPressed}
						disabled={!isTrackPlayerInit}
					>
						
							{isPlaying ? (
								<Icon
									name="pause"
									size={iconSize+6}
								style={{fontSize: iconSize+6, color: iconColor}}
									color="#1f8ec6"
								/>
							) : (
								<Icon
									name="play"
									size={iconSize+6}
								style={{fontSize: iconSize+6, color: iconColor}}
									color="#1f8ec6"
								/>
							)}
						
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={[styles.wrapper, styles.btn, styles.playerBtn]}
						onPress={stop}
						disabled={!isTrackPlayerInit}
					>
						
							<Icon
							type='FontAwesome'
								name="stop"
								size={iconSize}
								style={{fontSize: iconSize, color: iconColor}}
								color="white"
							/>
						
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={[styles.wrapper, styles.btn, styles.playerBtn]}
                        onPress={skipToNext}
						disabled={!isTrackPlayerInit}
					>
						
							<Icon
							type="FontAwesome"
								name="fast-forward"
								color="white"
								size={iconSize}
								style={{fontSize: iconSize, color: iconColor}}
							/>
						
					</TouchableHighlight> 
					

				</View>
				</View>

				<View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerMiddleRow,
						{
							borderColor:'black',
							borderWidth:0
						}
					]}
				> 
				
                    <Slider
          style={styles.progressBar}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          minimumTrackTintColor="#111000"
          maximumTrackTintColor="#000000"
          onSlidingStart={slidingStarted}
          onSlidingComplete={slidingCompleted}
          thumbTintColor="#000"
        />
				 </View> 
				
				
			
			</View>

    
  );
};

export default TrackPlayerComponent;


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