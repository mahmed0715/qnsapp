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
class RightPlayerHadith extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        player: props.player,
        isPlaying: false,
        context : props.context
      }
      // console.log('Player in right player:', this.state.player.play)
      // this.player = props.player;
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.player && this.state.player != nextProps.player)
        this.setState({player : nextProps.player});
    }
    setPause(context){
      this.state.player.pause()
      this.setState({isPlaying: false});
    }
    async play(context){
      // await this.props.player.play;
      this.props.player.play(context)
    }
    setPlaying = (context) => {
      // let { isPlaying } = this.state;
    //  let { player } =  this.props;
    //  console.log('play set', this.props, this.state)
    //  console.log('play set', this.props.player.play)
      if(this.state.isPlaying && this.state.context.id == this.props.currentlyPlaying) { 
        this.state.player.playPause();
      } else{
        this.props.player.play(this.state.context);
        this.props.setCurrentlyPlaying(this.state.context.id) ;
      }
      this.setState({isPlaying: true});
    }
   
    render(){
      const iconColor = 'white';
          const iconSize = 24;
  return (
    
    <View >
    {this.state.isPlaying && this.props.currentlyPlaying == this.state.context.id ? (
      <TouchableOpacity onPress={()=>{this.setPause()}} style={{padding: 10}}> 
      <Icon
     size={iconSize}
      
       style={{fontSize: iconSize, color: iconColor}}
         name="play"
       />
       </TouchableOpacity>
     ) : (
       <TouchableOpacity style={{padding: 10}} onPress={this.setPlaying.bind(this)} >   
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

  export default RightPlayerHadith;