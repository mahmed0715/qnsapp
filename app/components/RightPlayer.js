import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text} from 'react-native'
import _ from 'lodash'; 
import commonStyles from '../containers/styles';
// import { Layout, Colors, Screens } from '../constants';
// import { Logo, Svgicon, Headers } from '../components';
// import imgs from '../com\assets/images';
import {
 
  Icon,
  Spinner

} from 'native-base';
import { connect } from "react-redux";
import {startLoading} from "../actions/common";
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
        // player: props.player,
        // isPlaying: false,
        // isLoading: props.player.state.isLoading,
        // currentlyPlaying: props.currentlyPlaying
        soundLoading: props.soundLoading
      }
      //  console.log('isplaying in right player:', props.isPlaying)
      // this.player = props.player;
      this.setPlaying = this.setPlaying.bind(this);
      //console.log('context in reight player:' ,props.context)
     }
    // componentWillFocus(){
      // console.log('component did mound rightplayer', this.props.navigation);
    //   const {navigation} = this.props;
    //   this.willFocus = navigation?navigation.addListener(
    //     'didFocus',
    //     () => {
    //         this.setState({isPlaying: false})
    //     }
    // )  : function(){}
  //  console.log('mounting rightplayer ')  
  // }
    UNSAFE_componentWillReceiveProps(nextProps){
      //  console.log('next props in right player', nextProps.currentlyPlaying)
      // if(nextProps.player && this.state.player != nextProps.player)
        // this.setState({player : nextProps.player});
        // if( this.state.isPlaying != nextProps.isPlaying)
        // this.setState({isPlaying : nextProps.isPlaying});
      // if(nextProps.player && this.state.isLoading != nextProps.player.state.isLoading)
      //   this.setState({isLoading : nextProps.player.state.isLoading});
      // if(nextProps.context && this.state.context != nextProps.context)
      //   this.setState({context : nextProps.context});
     if(this.state.soundLoading != nextProps.soundLoading)
        this.setState({soundLoading : nextProps.soundLoading});
      // console.log('nextprops isloading in rightplayer', nextProps.soundLoading)
       //  console.log('nextprops: isplaying: in rightplayer', nextProps.isPlaying);
        // console.log('player soundLoading: in rightplayer', this.state.player.state.soundLoading)
     }

    // setPause(context){
    //   this.props.pause()
    //   this.setState({isPlaying: false});
    // }
    // async play(context){
    //   // await this.props.player.play;
    //   this.props.play(context)
    // }
    // componentWillUnmount(){
      // this.willFocus.remove();
      // this.setState({isPlaying: false})
    // }
     setPlaying(context) {
      // let { isPlaying } = this.state;
    //  let { player } =  this.props;
    //  console.log('play set', this.props, this.state)
    //  console.log('play set', this.props.player.play)
      // if(this.state.isPlaying && this.state.context.id) { 
      //   this.props.playPause();
      // } else{
        // this.props.play(this.state.context);
        this.props.startLoading();
        this.setState({soundLoading: true})
       
        this.props.setCurrentlyPlaying(this.props.hadith ? this.props.context.start : this.props.context.id) ;
      // }
      // this.setState({isPlaying: true});
     }
   
    render(){
      const iconColor = 'white';
          const iconSize = 34;
          //  console.log('right player in render:', this.state)
  return (
    
    <View >
    {/* {this.state.isPlaying && this.props.currentlyPlaying && this.props.currentlyPlaying == this.props.context.id ? (
      <TouchableOpacity disabled={this.props.soundLoading} onPress={()=>{this.setPause()}} style={{padding: 10}}> 
      <Icon
     size={iconSize}
      
       style={{fontSize: iconSize, color: iconColor}}
         name="play"
       />
      {/* <Text>{this.props.soundLoading?'True':'false'}</Text> */}
       {/* </TouchableOpacity> */}
     {/* )  */}
     {/* : ( } */}

       <TouchableOpacity  disabled={this.state.soundLoading} style={{paddingLeft: 10, paddingTop:5, paddingBottom: 10, paddingRight: 10}} 
       onPress={this.setPlaying} >   
        <Icon
     size={iconSize}
    
     style={{fontSize: iconSize,color: this.props.soundLoading?'gray':iconColor}}
         name="play"
       />
       {/* <Text>{this.props.soundLoading?'True':'false'}</Text> */}
       </TouchableOpacity>
   
    {/* )} */}
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