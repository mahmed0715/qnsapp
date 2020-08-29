// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';

// Reducers (Modifies The State And Returns A New State)
const common = (state = initialState.common, action) => {
  switch (action.type) {
    case ActionTypes.LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      }
    }
    case ActionTypes.SOUNDLOADING: {
      return {
        ...state,
        soundLoading: action.soundLoading,
      }
    }
    case ActionTypes.CURRENTLYPLAYING: {
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      }
    }
    case ActionTypes.SHOWMODAL: {
      return {
        ...state,
        showModal: action.showModal,
      }
    }
    case ActionTypes.QURANLIST: {
      return {
        ...state,
        quranList: action.payload,
      }
    }
    case ActionTypes.QURANDETAILS: {
      let newData = action.payload;
      return {
        ...state,

        quranDetails:Object.assign({}, state.quranDetails, newData),
      }
    }
    case ActionTypes.BUKHARILIST: {
      let newData = action.payload;
      return {
        ...state,
        bukhariList: Object.assign({}, state.bukhariList, newData),
      }
    }
    case ActionTypes.BUKHARIDETAILS: {
      let newData = action.payload;//{1:{1:[{1:1},{2:2}]}}
      console.log('reducer new data:', newData, state.bukhariDetails);
      console.log('reducer merge:',  merge(state.bukhariDetails, newData))
      return {
        ...state,
        bukhariDetails: Object.assign({}, merge(state.bukhariDetails, newData)),
      }
    }
   
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default common;

function merge(current, update) {

  Object.keys(update).forEach(function(key) {
    // if update[key] exist, and it's not a string or array,
    // we go in one level deeper
    if (current.hasOwnProperty(key) 
        && typeof current[key] === 'object'
        && !(current[key] instanceof Array)) {
      merge(current[key], update[key]);

    // if update[key] doesn't exist in current, or it's a string
    // or array, then assign/overwrite current[key] to update[key]
    } else {
      current[key] = update[key];
    }
  });
  return current;
}

// var x = { a: { a: 1 } }
// var y = { a: { b: 1 } }

// console.log(merge(x, y));