import React, {useEffect, useState} from 'react';
import { View, Text} from 'react-native'
import {  TouchableOpacity} from 'react-native-gesture-handler'
import _ from 'lodash'; 
import commonStyles from '../containers/styles';
import TrackPlayer , {TrackPlayerEvents, STATE_PLAYING} from 'react-native-track-player';
import {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks';
import {
 
  Icon,
  Spinner

} from 'native-base';
import { connect } from "react-redux";
import {startLoading} from "../actions/common";
const RightPlayer = (props) => {
   const [isPlaying, setIsPlaying] = useState(props.isPlaying);
  // const {position, duration} = useTrackPlayerProgress(250);
// const [stopped, setStopped] = useState(true);
// const [currentlyPlaying, setCurrentlyPlaying] = useState(props.currentlyPlaying || 0);
// useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], async (event) => {
  
//   if (event.state === STATE_PLAYING) {
//     setIsPlaying(true);
//   } else {
//     setIsPlaying(false);
//   }
// });
useEffect(()=>{
  console.log('props is playing changed', props);
  setIsPlaying(props.isPlaying)
}, [props.isPlaying])
// useEffect(()=>{
//   setCurrentlyPlaying(currentlyPlaying)
// }, [currentlyPlaying])
const onButtonPressed = async () => {
  if (!isPlaying) {
    TrackPlayer.skip(props.context.id);
    //setIsPlaying(true);
  } else {
    TrackPlayer.pause();
    //setIsPlaying(false);
  }
  // console.log(await TrackPlayer.getQueue());
  // console.log(await TrackPlayer.getCurrentTrack())
  // console.log(await getTitle())
};
    //  constructor(props){
    //    super(props);
    //   this.state = {
    //     currentlyPlaying: props.currentlyPlaying,
    //     soundLoading: props.soundLoading
    //   }
 
    //   this.setPlaying = this.setPlaying.bind(this);
    
    //  }
  
    // UNSAFE_componentWillReceiveProps(nextProps){
     
    //  if(this.state.soundLoading != nextProps.soundLoading)
    //     this.setState({soundLoading : nextProps.soundLoading});

    //     if(this.state.currentlyPlaying != nextProps.currentlyPlaying)
    //     this.setState({currentlyPlaying : nextProps.currentlyPlaying});
    //  }

    //  setPlaying(context) {
    //   TrackPlayer.skip(this.props.context.id);
    //   TrackPlayer.play();
    //     // this.props.startLoading();
    //     // this.setState({soundLoading: true});
       
    //     this.props.setCurrentlyPlaying(this.props.context.id) ;
   
    //  }
     const getState = async () => {
      // const state = await TrackPlayer.getState();
      return false;
      // console.log('STATE in right player:', state, TrackPlayer.STATE_PLAYING, await TrackPlayer.getCurrentTrack());
    //  return state == TrackPlayer.STATE_PLAYING? true: false;
     }
   
    // render(){
      const iconColor = 'white';
          const iconSize = 34;
        
  return (
    
    <View >
   

       <TouchableOpacity  
       style={{paddingLeft: 10, paddingTop:5, paddingBottom: 10, paddingRight: 10}} 
       onPress={onButtonPressed} >   
        {isPlaying && props.currentlyPlaying == props.context.id ? <Icon
     size={iconSize}
    
     style={{fontSize: iconSize, color: iconColor}}
         name="pause"
       />:
        <Icon
     size={iconSize}
    
     style={{fontSize: iconSize,color: iconColor}}
         name="play"
       />}
       </TouchableOpacity>
   
    </View>
    
  )
    // }
  }

  // const mapStateToProps = (state) => {
  //   return {
  //     // soundLoading: state.common.soundLoading,
  //     // currentlyPlaying: state.common.currentlyPlaying
  //   };
  // };
  
  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     // startLoading: (query) =>{dispatch(startLoading(query))},
  //     // stopLoading: (query) =>{dispatch(stopLoading(query))}
  //    };
  // };
  
  // Exports
  export default RightPlayer;//connect(mapStateToProps, mapDispatchToProps)(RightPlayer);