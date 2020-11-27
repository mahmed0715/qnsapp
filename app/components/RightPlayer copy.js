import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text} from 'react-native'
import _ from 'lodash'; 
import commonStyles from '../containers/styles';
import TrackPlayer from 'react-native-track-player';
import {
 
  Icon,
  Spinner

} from 'native-base';
import { connect } from "react-redux";
import {startLoading} from "../actions/common";
class RightPlayerH extends React.Component {
     constructor(props){
       super(props);
      this.state = {
     
        soundLoading: props.soundLoading
      }
 
      this.setPlaying = this.setPlaying.bind(this);
    
     }
  
    UNSAFE_componentWillReceiveProps(nextProps){
     
     if(this.state.soundLoading != nextProps.soundLoading)
        this.setState({soundLoading : nextProps.soundLoading});
  
     }

     setPlaying(context) {
      TrackPlayer.skip(this.props.context.id);
        this.props.startLoading();
        this.setState({soundLoading: true})
       
        this.props.setCurrentlyPlaying(this.props.hadith ? this.props.context.start : this.props.context.id) ;
   
     }
   
    render(){
      const iconColor = 'white';
          const iconSize = 34;
        
  return (
    
    <View >
   

       <TouchableOpacity  disabled={this.state.soundLoading} style={{paddingLeft: 10, paddingTop:5, paddingBottom: 10, paddingRight: 10}} 
       onPress={this.setPlaying} >   
        <Icon
     size={iconSize}
    
     style={{fontSize: iconSize,color: this.props.soundLoading?'gray':iconColor}}
         name="play"
       />
        <Icon
     size={iconSize}
    
     style={{fontSize: iconSize,color: this.props.soundLoading?'gray':iconColor}}
         name="pause"
       />
       </TouchableOpacity>
   
    </View>
    
  )
    }
  }

  const mapStateToProps = (state) => {
    return {
      soundLoading: state.common.soundLoading,
      currentlyPlaying: state.common.currentlyPlaying
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      startLoading: (query) =>{dispatch(startLoading(query))},
      // stopLoading: (query) =>{dispatch(stopLoading(query))}
     };
  };
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(RightPlayer);