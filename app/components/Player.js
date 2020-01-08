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
const BACKGROUND_COLOR = '#FFFFFF';
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
			PLAYLIST: [],
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
		};
		// this.play = this.play.bind(this);
	}
componentWillMount(){
	if(this.props.book = 'quran'){
		let {id} = this.props;
		if(!id) id = 1;
		const current = this.props.quranList.filter(surah=> surah.id == id);
		current.length && this.play(current[0], true);
	}
}

  componentWillUnmount() {
	console.log(url);
    this.props.onRef(undefined)
  }
	componentDidMount() {

		this.props.onRef(this)
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
		});
		
		this._loadNewPlaybackInstance(false);
	}
	pause(){
		// this._onPlayPausePressed();
		if (this.state.isPlaying) {
			this.playbackInstance.pauseAsync();
		} 
	}
	play(surah, dontPlay){
		console.log('===========================================================playing new', surah.name);
			let PLAYITEM = new PlaylistItem(
			surah.name,
			getAudioFileUrl(surah),
		  surah.id);
		  console.log('===========================================================playing new', PLAYITEM);
			this.setState({PLAYLIST: [PLAYITEM]});
			dontPlay?this._loadNewPlaybackInstance(false):this._loadNewPlaybackInstance(true);
	}

	async _loadNewPlaybackInstance(playing) {
		if (this.playbackInstance != null) {
			await this.playbackInstance.unloadAsync();
			this.playbackInstance.setOnPlaybackStatusUpdate(null);
			this.playbackInstance = null;
		}

		const source = { uri: this.state.PLAYLIST[this.index].uri };
		const initialStatus = {
			shouldPlay: playing,
			rate: this.state.rate,
			volume: this.state.volume,
		};

		const { sound, status } = await Audio.Sound.createAsync(
			source,
			initialStatus,
			this._onPlaybackStatusUpdate
		);
		this.playbackInstance = sound;

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
		if (status.isLoaded) {
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
				this._updatePlaybackInstanceForIndex(true);
			}
		} else {
			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`);
			}
		}
	};

	_advanceIndex(forward) {
		this.index =
			(this.index + (forward ? 1 : this.state.PLAYLIST.length - 1)) %
			this.state.PLAYLIST.length;
	}

	async _updatePlaybackInstanceForIndex(playing) {
		this._updateScreenForLoading(true);

		this._loadNewPlaybackInstance(playing);
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
		return !this.state.fontLoaded ? (
			<View />
		) : (
			<View style={[styles.container, {flexDirection:'row', paddingLeft: 10, paddingRight: 10}]}>
			
				<View style={[styles.detailsContainer, {flex:1}]}>
					<Text style={[styles.text]}>
						Surah {this.state.playbackInstanceName}
					</Text>
					<Text style={[styles.text]}>
						{/* {this.state.isBuffering ? (
							BUFFERING_STRING
						) : null} */}
						({(
							this._getTimestamp()
						)})
					</Text>
				</View>
				<View style={{flex: 2, flexBasis: 30, justifyContent:'flex-start', alignItems:'flex-end', paddingTop: 5}}>
			
				<View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerTopRow,
						{
							opacity: this.state.isLoading
								? DISABLED_OPACITY
								: 1.0,
						},
						{
							mariginTop: 0, flex: 1,
							flexBasis: 30
						}
					]}
				>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={[styles.wrapper, {}]}
						onPress={this._onBackPressed}
						disabled={this.state.isLoading}
					>
						
							<Icon
							type="FontAwesome"
							name="fast-backward"
							size={18}
								style={{fontSize: 18}}
								color="#56D5FA"
							/>
											</TouchableHighlight>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onPlayPausePressed}
						disabled={this.state.isLoading}
					>
						<View>
							{this.state.isPlaying ? (
								<Icon
									name="pause"
									size={24}
								style={{fontSize: 24}}
									color="#56D5FA"
								/>
							) : (
								<Icon
									name="play-circle"
									size={24}
								style={{fontSize: 24}}
									color="#56D5FA"
								/>
							)}
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onStopPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<Icon
							type='FontAwesome'
								name="stop"
								size={16}
								style={{fontSize: 16}}
								color="#56D5FA"
							/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onForwardPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<Icon
							type="FontAwesome"
								name="fast-forward"
								color="#56D5FA"
								size={18}
								style={{fontSize: 18}}
							/>
						</View>
					</TouchableHighlight>
				</View>
				
				<View
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
				</View>
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
	  fetchQuranList: (query)=> dispatch(fetchQuranList(query))
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
});