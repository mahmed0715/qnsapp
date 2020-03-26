import React, { PureComponent } from 'react'
import { View, TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import commonStyles from '../containers/styles';
// import { Layout, Colors, Screens } from '../constants';
// import { Logo, Svgicon, Headers } from '../components';
// import imgs from '../com\assets/images';
import {
 
  Icon,
  Spinner

} from 'native-base';
// import { connect } from "react-redux";
// import * as userActions from "../actions/user";
// import {fetchQuranDetails} from "../actions/common";
// import appStyles from '../theme/appStyles';
// import styles from './styles';
// import theme from '../styles';
// import Player from './Player';
// console.log('common styles',commonStyles)
class RightPlayer extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isPlaying: false,
        context : props.context
      }
      this.player = props.player;
    }
    componentWillReceiveProps(nextProps){
      this.player = nextProps.player;
    }
    setPause(context){
      this.player.pause()
      this.setState({isPlaying: false});
    }
    setCurrentlyPlaying = (context) => {
      let { isPlaying } = this.state;
     
      if(!isPlaying && this.state.context.id == this.props.currentlyPlaying) { 
        this.player.playPause();
      } else{
        this.player.play(this.state.context);
        this.props.setCurrentlyPlaying(this.state.context.id) ;
      }
      this.setState({isPlaying: true});
    }
   
    render(){
      const iconColor = '#1f8ec6';
          const iconSize = 24;
  return (
    
    <View>
    {this.state.isPlaying && this.props.currentlyPlaying == this.state.context.id ? (
      <TouchableOpacity onPress={()=>{this.setPause()}}> 
      <Icon
     size={iconSize}
      
       style={{fontSize: iconSize, color: iconColor}}
         name="pause"
       />
       </TouchableOpacity>
     ) : (
       <TouchableOpacity  onPress={()=>{this.setCurrentlyPlaying()}} >   
        <Icon
     size={iconSize}
    
     style={{fontSize: iconSize,color: iconColor}}
         name="play"
       /></TouchableOpacity>
   
    )}
    </View>
    
  )
    }
  }

  export default RightPlayer;