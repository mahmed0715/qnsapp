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
      return {
        ...state,
        bukhariList: action.payload,
      }
    }
    case ActionTypes.BUKHARIDETAILS: {
      let newData = action.payload;
      return {
        ...state,
        bukhariDetails: Object.assign({}, state.bukhariDetails, newData),
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