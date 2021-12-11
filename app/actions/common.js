// import axios from '../utils/api';
import axios from 'axios';
import url from '../config/api';
import apiConfig from '../config/api';
import storage from '../utils/storage';
import { ActionTypes, Strings } from '../constants/';

export const fetchQuranList =  (payloads) =>  (dispatch) => {   
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
 return axios.get(url.apiBaseUrl + url.quranList)
  .then(res => {
  //  console.log("res quran list:", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    res.data && res.data.chapters && dispatch({ type: ActionTypes.QURANLIST, payload: res.data.chapters });
  })
  .catch((error)=>{
    console.log(error)
    return error;
  });
}
export const startLoading =  (payloads) =>  (dispatch) => {   
  dispatch({ type: ActionTypes.SOUNDLOADING, soundLoading: true });
}
export const stopLoading =  (payloads) =>  (dispatch) => {   
  dispatch({ type: ActionTypes.SOUNDLOADING, soundLoading: false });
}
export const setCurrentlyPlaying =  (payloads) =>  (dispatch) => {   
  dispatch({ type: ActionTypes.CURRENTLYPLAYING, currentlyPlaying: payloads });
}
export const fetchQuranDetails =  (payloads) =>  (dispatch) => {   
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  // console.log('got payloads to load quran details for id', payloads)
 return axios.get(url.apiBaseUrl + url.quranDetails(payloads))
  .then(res => {
  //  console.log("res quran list:", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    res.data && res.data.translations && dispatch({ type: ActionTypes.QURANDETAILS, payload: {[payloads.id]: res.data.translations} });
  })
  .catch((error)=>{
    console.log(error)
    return error;
  });
}



export const fetchBukhariList =  (payloads) =>  (dispatch) => {  
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
 return axios.get(url.apiBaseUrl + url.bukhariList(payloads))
  .then(res => {
  //  console.log("res bukhari list:", res.data, ActionTypes['1']);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    res.data && res.data.hadith_books && dispatch({ type: ActionTypes.BUKHARILIST, payload: {[payloads.id]: res.data.hadith_books} });
  })
  .catch((error)=>{
    console.log(error)
    return error;
  });
}

export const fetchBukhariDetails =  (payloads={}) =>  (dispatch) => {  
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
 return axios.get(url.apiBaseUrl + url.bukhariDetails(payloads))
  .then(res => {  
  //  console.log("res bukhari details:", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    res.data && res.data.hadith_books && dispatch({ type: ActionTypes.BUKHARIDETAILS, payload: {[payloads.contextBookId]:{[payloads.id]: res.data.hadith_books }}});
  })
  .catch((error)=> {
    console.log(error)
    return error;
  });
}

export const soundLoading = bool => ({
  type: ActionTypes.SOUNDLOADING,
  soundLoading: bool,
});


export const loading = bool => ({
    type: ActionTypes.LOADING,
    isLoading: bool,
});

export const showModal = bool => ({
    type: ActionTypes.SHOWMODAL,
    showModal: bool,
});

export const showIntro = bool => ({
    type: ActionTypes.SHOWINTRO,
    showIntro: bool,
});
// fetchQuran();