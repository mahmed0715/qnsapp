import React, {useEffect, useState} from 'react';
import {Text, Button, View, ActivityIndicator, Image, StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
import commonStyles from '../containers/styles';
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
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#8bb0cb';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';
const RATE_SCALE = 3.0;


const trackPlayerInit = async (props) => {
  await TrackPlayer.setupPlayer({playBuffer: 1.5, minBuffer: 5});
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
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
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
	await TrackPlayer.reset();
  await TrackPlayer.add(playList);
  return true;
};

const TrackPlayerComponent = (props) => {
	const [focus, setRefocus] = useState(false);
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
   const [trackId, setTrackId] = useState('0'); 
  const [track, setTrack] = useState({});
  const [firstDuration, setFirstDuration] = useState(props.initialDuration);
//   const [title, setTitle] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const {position, duration} = useTrackPlayerProgress(250);
// const [stopped, setStopped] = useState(true);
   useEffect(() => {
	   
   const startPlayer = async () => {
		setSliderValue(0);
	   console.log('start player called in track player component');
	  	if(!isTrackPlayerInit) {
			let isInit =  await trackPlayerInit(props);
			setIsTrackPlayerInit(isInit);
		}else {
			trackPlayer.remove();
			TrackPlayer.add(props.queue);
		}
	  
	//   console.log(props.queue[0]);
	  	props.queue && props.queue.length && setTrack(props.queue[0]);
	 TrackPlayer.getDuration().then((d)=>{
		setFirstDuration(d);
	  });
	 
	 
   }
   startPlayer();
   const r = [props.navigation.addListener('willFocus', () => {
	//setIsTrackPlayerInit(false);
	setRefocus(true);
	setSliderValue(0);
	TrackPlayer.stop();
	const f = async () => {
		await startPlayer(true);
		
		const d = await TrackPlayer.getDuration();
		setFirstDuration(d||props.initialDuration);
		setRefocus(false);
	}
	f();
  })];
  return () => {


	
	r.forEach(rr=>rr.remove());
	TrackPlayer.destroy();
  }
 }, []);

//  useEffect(()=>{
// 	console.log('queue changed', props.queue.length);
// }, [props.queue])
  //this hook updates the value of the slider whenever the current position of the song changes
 useEffect(() => {
	// console.log(position, duration, trackId)
   if (!isSeeking && position && duration) {
     setSliderValue(position / duration);
   }
  
 }, [position, duration]);
 
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
	//   console.log('ebent changed', event)
    if (event.state === STATE_PLAYING) {
      !isPlaying && setIsPlaying(true);
    //   setTitle(await getTitle());
    //   setStopped(false);
    } else if(event.state == 6){
        // buffereing dont do anything...
      }else {
	  setIsPlaying(false);
	//   setStopped(true);
	//   TrackPlayer.getCurrentTrack().then((t)=>{
	// 	t != trackId && getTrack();
	// })
    }
  });
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_TRACK_CHANGED], (event) => {
	console.log('event  track changed on component', event)
	TrackPlayer.getCurrentTrack().then((t)=>{
		//  console.log('Got track id:', t, trackId);
	   if(t!=trackId ) 
   
	   {
		   try{
			   const f = async () =>{
				   setTrackId(t);
				   const tr = await TrackPlayer.getTrack(t);
				   setTrack(tr);
			   }
			   f();
			}catch(err){
			   console.warn(err);
			   // undefined;
			}
	   }
	  })
});
  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      updateTrack();
      //setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      //setIsPlaying(false);
    }
    // console.log(await TrackPlayer.getQueue());
    // console.log(await TrackPlayer.getCurrentTrack())
  
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
    // console.log(await TrackPlayer.getCurrentTrack())
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
  const formatTime = (seconds=0) => {
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
  return  (!isTrackPlayerInit ? (<View style={commonStyles.loading}>
		<ActivityIndicator size='large' color="white" />
	  </View>) :
      (<View style={[styles.container, {flexDirection:'column', paddingLeft: 5, paddingRight: 15, backgroundColor:'#228392', paddingTop: 8}]}>
				
				<View style={{  flexDirection:'row', justifyContent:'center', alignItems:'center', borderColor:'blue', borderWidth:0, marginRight: 5}}>
				<View style={[styles.detailsContainer, {flex:1, borderColor:'yellow', borderWidth:0}]}>
					<Text style={[styles.text, {color: 'white'}]}>
                       {props.titlePrefix && (props.titlePrefix + ' ')} { !focus  ? ((track||{}).title || (props.queue && props.queue[0].title)) : '...'}
					</Text>
					{(duration>0||firstDuration>0||props.initialDuration>0) && !focus ?
					<Text style={[styles.text,{color: 'white'}]}>
                    { isPlaying ? formatTime(position) : '00:00' } / {formatTime(duration>0?duration:(firstDuration||props.initialDuration))}
						
					</Text>:<Text>'...'</Text>}
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
							borderWidth:0,
							marginRight: 0
						}
					]}
				> 
				 
                    <Slider
          style={styles.playbackSlider}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          minimumTrackTintColor="#111000"
          maximumTrackTintColor="#000000"
          onSlidingStart={slidingStarted}
          onSlidingComplete={slidingCompleted}
          thumbTintColor="#fff"
        />
				 </View> 
				
				
			
			</View>)

  )
  
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
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 0
		, borderWidth:0,
		borderColor: 'red'
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
		flex: 1,
		alignSelf: 'stretch',
		// paddingRight: 20,
		width: 100+'%'
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