import React, { Component } from 'react';
import {
	Dimensions,
	StyleSheet,
	TouchableHighlight,
	View,
} from 'react-native';
import Slider from 'react-native-slider';
import { Audio, Font } from 'expo-av';
import { connect } from "react-redux";
import {getAudioFileUrl} from '../utils/common';
// import { MaterialIcons } from '@expo/vector-icons';
import {
    Icon,
    Text,
    Button,
  } from 'native-base';

class PlaylistItem {
	constructor(name, uri, id) {
		this.name = name;
		this.uri = uri;
		this.id = id;
	}
};

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#8bb0cb';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';
const RATE_SCALE = 3.0;

class Player extends Component {
	constructor(props) {
		super(props);
		this.index = 0;
		this.isSeeking = false;
		this.shouldPlayAtEndOfSeek = false;
		this.playbackInstance = null;
		this.state = {
			PLAYLIST: props.playList || [],
			playbackInstanceName: LOADING_STRING,
			playbackInstancePosition: null,
			playbackInstanceDuration: null,
			shouldPlay: false,
			isPlaying: false,
			isBuffering: false,
			isLoading: true,
			fontLoaded: true,
			volume: 1.0,
			rate: 1.0,
			index: 0
		};
		console.log('in player:', this.state.PLAYLIST)
		// this.play = this.play.bind(this);
	}
componentWillMount(){
	this.props.onRef(this)
	if(this.props.book == 'quran'){
		// play the first one
		let {id} = this.props;
		if(!id) id = 1;
		const current = this.props.quranList.filter(surah=> surah.id == id);
		current.length && this.play(current[0], true);
	}
}
componentWillReceiveProps(nextProps){
	console.log('Player: receieve playlist', nextProps.playList);
	if(nextProps.playList != this.state.PLAYLIST){
		this.setState({PLAYLIST: nextProps.playList}, ()=>{
			//this.loadSound();
		});
	}
}
  componentWillUnmount() {
	 console.log('Player unmounting',);
	 this.props.onRef && this.props.onRef(undefined);
	this.stop();
	if(this.playbackInstance != null){
		this.playbackInstance.unloadAsync();
		this.playbackInstance.setOnPlaybackStatusUpdate(null);
 	 }
	this.playbackInstance = null;
  }
	componentDidMount() {
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			staysActiveInBackground: true,
			playsInBackgroundModeAndroid: false,
			playThroughEarpieceAndroid: false
		});
		
		this._loadNewPlaybackInstance(false);
		// this.loadSound();
	}
	pause(){		// this._onPlayPausePressed();
		if (this.state.isPlaying) {
			this.playbackInstance.pauseAsync();
		} 
	}
	playPause(){
		this._onPlayPausePressed();
	}
	stop(){
		this._onStopPressed();
	}

	play(surah, dontPlay){
		this._onStopPressed();
		console.log('===========================================================playing new', surah);
			if(!this.state.PLAYLIST.length){
				let PLAYITEM = new PlaylistItem(
					surah.name,
					surah.id != 1 ? getAudioFileUrl(surah) : '',
				  surah.id);
				  console.log('===========================================================playing new', PLAYITEM);
				this.setState({PLAYLIST: [PLAYITEM]});
			} else {
				const index = this.state.PLAYLIST.findIndex(({id}) => id == surah.id);
				if(index != -1)
					this.index = index;
					// else {
					// 	let PLAYITEM = new PlaylistItem(
					// 		surah.name,
					// 		surah.id != 1 ? getAudioFileUrl(surah) : '',
					// 	  surah.id);
					// 	  let { PLAYLIST } = this.state;
					// 	  PLAYLIST.push(PLAYITEM);
					// 	  this.index = PLAYLIST.length - 1;
					// 	  console.log('===========================================================playing new', PLAYITEM);
					// 	this.setState({PLAYLIST: PLAYLIST});
					// }

				// this.setState({index: index});
			}
			if(this.index > -1){
				dontPlay?this._loadNewPlaybackInstance(false):this._loadNewPlaybackInstance(true);
			}
	}

	async loadSound(){
		// (async () => {
			if(!this.state.PLAYLIST[this.index + 1] || (this.state.PLAYLIST[this.index + 1] && this.state.PLAYLIST[this.index + 1].sound)){
				console.log('loading sound for index returning:', this.state.PLAYLIST[this.index + 1])
				return;
			}
			let source  = this.state.PLAYLIST[this.index + 1];
			const initialStatus = {
				shouldPlay: false,
				rate: this.state.rate,
				volume: this.state.volume,
			};
			console.log('loading sound for index:', this.index+1)
			const { sound, status } = await Audio.Sound.createAsync(
				{uri: source.uri},
				initialStatus,
				this._onPlaybackStatusUpdate
			);
			source.sound = sound;
			let {PLAYLIST} = this.state;
			PLAYLIST[this.index+1] = source;
			this.setState({PLAYLIST});
		// });
		// this.setState({PLAYLIST: soundPlaylist});
	}
	async _loadNewPlaybackInstance(playing) {
		console.log('_loadNewPlaybackInstance: ', playing, this.playbackInstance)
		if (this.playbackInstance != null) {
			await this.playbackInstance.unloadAsync();
			this.playbackInstance.setOnPlaybackStatusUpdate(null);
		
			this.playbackInstance = null;
		}
		let source;
		if(this.state.PLAYLIST.length){
			if(this.state.PLAYLIST[this.index].uri){
				source = { uri: this.state.PLAYLIST[this.index].uri };
			}else {
				source = require('./assets/quran_1.mp3')
			}
		}
		else return;
		if(this.state.PLAYLIST[this.index].sound)
		{
			console.log('sound found, using');
			const {sound} = this.state.PLAYLIST[this.index];
			this.playbackInstance = sound;
			playing && this.playbackInstance.playAsync();
		}else{
			console.log('_loadNewPlaybackInstance: ', source);
		const initialStatus = {
			shouldPlay: playing,
			rate: this.state.rate,
			volume: this.state.volume,
		};
		console.log('initial asttaus: playback load:', initialStatus)
		
		 let { sound } = await Audio.Sound.createAsync(
			source,
			initialStatus,
			this._onPlaybackStatusUpdate
		);
		this.playbackInstance = sound;
		}
		this.loadSound();
		// this.playbackInstance = sound||sound1;
		console.log('playback this.playbackInstance:', this.playbackInstance)
		this._updateScreenForLoading(false);
	}

	_updateScreenForLoading(isLoading) {
		if (isLoading) {
			this.setState({
				isPlaying: false,
				playbackInstanceName: LOADING_STRING,
				playbackInstanceDuration: null,
				playbackInstancePosition: null,
				isLoading: true,
			});
		} else {
			this.setState({
				playbackInstanceName: this.state.PLAYLIST[this.index].name,
				isLoading: false,
			});
		}
	}

	_onPlaybackStatusUpdate = status => {
		// console.log('platback status:', status);
		if (status && status.isLoaded) {
			this.setState({
				playbackInstancePosition: status.positionMillis,
				playbackInstanceDuration: status.durationMillis,
				shouldPlay: status.shouldPlay,
				isPlaying: status.isPlaying,
				isBuffering: status.isBuffering,
				rate: status.rate,
				volume: status.volume,
			});
			if (status.didJustFinish) {
				this._advanceIndex(true);
				console.log('index after change:', this.index)
				this._updatePlaybackInstanceForIndex(true);
			}
		} else {
			// if (status.error) {
				console.log(`FATAL PLAYER ERROR:`, status);
			// }
		}
	};

	_advanceIndex(forward) {
		console.log('index old', this.index)
		this.index =
			(this.index + (forward ? 1 : this.state.PLAYLIST.length - 1)) %
			this.state.PLAYLIST.length;
			console.log('index new', this.index)
	}

	async _updatePlaybackInstanceForIndex(playing) {
		this._updateScreenForLoading(true);
		console.log('_updatePlaybackInstanceForIndex:')
		await this._loadNewPlaybackInstance(playing);
		console.log('_updatePlaybackInstanceForIndex after new playback instance:')
		
	}

	_onPlayPausePressed = () => {
		if (this.playbackInstance != null) {
			if (this.state.isPlaying) {
				this.playbackInstance.pauseAsync();
			} else {
				this.playbackInstance.playAsync();
			}
		}
	};

	_onStopPressed = () => {
		if (this.playbackInstance != null) {
			this.playbackInstance.stopAsync();
		}
	};

	_onForwardPressed = () => {
		if (this.playbackInstance != null) {
			this._advanceIndex(true);
			this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
		}
	};

	_onBackPressed = () => {
		if (this.playbackInstance != null) {
			this._advanceIndex(false);
			this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
		}
	};

	_onVolumeSliderValueChange = value => {
		if (this.playbackInstance != null) {
			this.playbackInstance.setVolumeAsync(value);
		}
	};

	_trySetRate = async rate => {
		if (this.playbackInstance != null) {
			try {
				await this.playbackInstance.setRateAsync(rate);
			} catch (error) {
				// Rate changing could not be performed, possibly because the client's Android API is too old.
			}
		}
	};

	_onRateSliderSlidingComplete = async value => {
		this._trySetRate(value * RATE_SCALE);
	};

	_onSeekSliderValueChange = value => {
		if (this.playbackInstance != null && !this.isSeeking) {
			this.isSeeking = true;
			this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
			this.playbackInstance.pauseAsync();
		}
	};

	_onSeekSliderSlidingComplete = async value => {
		if (this.playbackInstance != null) {
			this.isSeeking = false;
			const seekPosition = value * this.state.playbackInstanceDuration;
			if (this.shouldPlayAtEndOfSeek) {
				this.playbackInstance.playFromPositionAsync(seekPosition);
			} else {
				this.playbackInstance.setPositionAsync(seekPosition);
			}
		}
	};

	_getSeekSliderPosition() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return (
				this.state.playbackInstancePosition /
				this.state.playbackInstanceDuration
			);
		}
		return 0;
	}

	_getMMSSFromMillis(millis) {
		const totalSeconds = millis / 1000;
		const seconds = Math.floor(totalSeconds % 60);
		const minutes = Math.floor(totalSeconds / 60);

		const padWithZero = number => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};
		return padWithZero(minutes) + ':' + padWithZero(seconds);
	}

	_getTimestamp() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return `${this._getMMSSFromMillis(
				this.state.playbackInstancePosition
			)} / ${this._getMMSSFromMillis(
				this.state.playbackInstanceDuration
			)}`;
		}
		return '';
	}

	render() {
		const iconColor = 'white';
		const bgColor = '#e7e0e0';
		const iconSize = 24;
		if(this.props.abstract) 
			return <View />;
		return !this.state.fontLoaded ? (
			<View />
		) : (
			//f1f3f4
			<View style={[styles.container, {flexDirection:'row', paddingLeft: 5, paddingRight: 5, backgroundColor:'#228392'}]}>
			
				<View style={[styles.detailsContainer, {flex:1}]}>
					<Text style={[styles.text, {color: 'white'}]}>
		{this.props.book == 'hadiths' ? 'Hadith' : 'Surah'} { !isNaN(this.state.playbackInstanceName) ? (this.props.book !== 'hadiths' ?(this.state.PLAYLIST[0].name +' :'):''):''} {this.state.playbackInstanceName}
					</Text>
					<Text style={[styles.text,{color: 'white'}]}>
						{/* {this.state.isBufferirahng ? (
							BUFFERING_STRING
						) : null} */}
						({(
							this._getTimestamp()
						)})
					</Text>
				</View>
				<View style={{flex: 1, flexBasis: 30, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
			
				{/* <View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerTopRow,
						{
							opacity: this.state.isLoading
								? DISABLED_OPACITY
								: 1.0,
						},
						{
							marginTop: 0, flex: 1,
							flexBasis: 30
						},
						{
							backgroundColor:'red'
						}
					]}
				> */}
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={[styles.wrapper, styles.btn]}
						onPress={this._onBackPressed}
						disabled={this.state.isLoading}
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
						style={[styles.wrapper, styles.btn]}
						onPress={this._onPlayPausePressed}
						disabled={this.state.isLoading}
					>
						<View >
							{this.state.isPlaying ? (
								<Icon
									name="pause"
									size={iconSize}
								style={{fontSize: iconSize, color: iconColor}}
									color="#1f8ec6"
								/>
							) : (
								<Icon
									name="play-circle"
									size={iconSize}
								style={{fontSize: iconSize, color: iconColor}}
									color="#1f8ec6"
								/>
							)}
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={[styles.wrapper, styles.btn]}
						onPress={this._onStopPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<Icon
							type='FontAwesome'
								name="stop"
								size={iconSize}
								style={{fontSize: iconSize, color: iconColor}}
								color="white"
							/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={[styles.wrapper, styles.btn]}
						onPress={this._onForwardPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<Icon
							type="FontAwesome"
								name="fast-forward"
								color="white"
								size={iconSize}
								style={{fontSize: iconSize, color: iconColor}}
							/>
						</View>
					</TouchableHighlight>
				{/* </View> */}
				
				{/* <View
					style={[
						styles.playbackContainer,
						{
							opacity: this.state.isLoading
								? DISABLED_OPACITY
								: 1.0,
						},
					]}
				>
					<Slider
						style={styles.playbackSlider}
						value={this._getSeekSliderPosition()}
						onValueChange={this._onSeekSliderValueChange}
						onSlidingComplete={this._onSeekSliderSlidingComplete}
						thumbTintColor="#000000"
						minimumTrackTintColor="#4CCFF9"
						disabled={this.state.isLoading}
					/>
				</View> */}
				</View>
				{/* <View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerMiddleRow,
					]}
				> */}
					{/* <View style={styles.volumeContainer}>
						<View>
							<Icon
							type="FontAwesome"
								name="volume-up"
								size={40}
								color="#56D5FA"
							/>
						</View>
						<Slider
							style={styles.volumeSlider}
							value={1}
							onValueChange={this._onVolumeSliderValueChange}
							thumbTintColor="#000000"
							minimumTrackTintColor="#4CCFF9"
						/>
						<View>
							<Icon
								name="volume-up"
								size={40}
								color="#56D5FA"
							/>
						</View>
					</View> */}
				{/* </View> */}
			
			</View>
		);
	}
}
const mapStateToProps = (state) => {
	return {
	  quranList: state.common.quranList
	};
  };
  
  const mapDispatchToProps = (dispatch) => {
	return {
	//   fetchQuranList: (query)=> dispatch(fetchQuranList(query))
	 };
  };
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(Player);

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
		marginRight: 10,
		marginBottom: 5
	},
	text: {
		fontSize: FONT_SIZE,
		minHeight: FONT_SIZE,
	},
	buttonsContainerBase: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-around',
		
	},
	buttonsContainerTopRow: {
		maxHeight: 20,
		minWidth: DEVICE_WIDTH / 2.0,
		maxWidth: DEVICE_WIDTH / 2.0,
	},
	buttonsContainerMiddleRow: {
		maxHeight: 20,
		alignSelf: 'stretch',
		paddingRight: 20,
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
	btn: {backgroundColor: '#228392', paddingHorizontal:10, paddingVertical: 5}
});