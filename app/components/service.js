/**
 * This is the code that will run tied to the player.
 *
 * The code here might keep running in the background.
 *
 * You should put everything here that should be tied to the playback but not the UI
 * such as processing media buttons or analytics
 */

import TrackPlayer from 'react-native-track-player';
let listeners = [];
module.exports = async function() {
  listeners.map(listener => { listener.remove() });

listeners = [
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  }),
  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.stop();
    TrackPlayer.destroy();
  }),
  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  }),

  TrackPlayer.addEventListener('remote-next',  () => {
    console.log('Trackplayer remote next');
     TrackPlayer.skipToNext();
     
     // this is for jump forward 
    // let newPosition = await TrackPlayer.getPosition();
    // let duration = await TrackPlayer.getDuration();
    // newPosition += 10;
    // if (newPosition > duration) {
    //   newPosition = duration;
    // }
    // TrackPlayer.seekTo(newPosition);
  }),

  TrackPlayer.addEventListener('remote-previous',  () => {
     TrackPlayer.skipToPrevious();
     // this is for jump backward 
    // let newPosition = await TrackPlayer.getPosition();
    // newPosition -= 10;
    // if (newPosition < 0) {
    //   newPosition = 0;
    // }
    // TrackPlayer.seekTo(newPosition);
  }),
  TrackPlayer.addEventListener('remote-seek', async (data) => {
    // console.warn(data.position);
    TrackPlayer.seekTo(data.position);
  })
];
};
