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
   console.log("res quran list:", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    res.data && res.data.chapters && dispatch({ type: ActionTypes.QURANLIST, payload: res.data.chapters });
  })
  .catch((error)=>{
    console.log(error)
    return error;
  });
}

export const fetchBukhariList =  (payloads) =>  (dispatch) => {  
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
 return axios.get(url.apiBaseUrl + url.bukhariList)
  .then(res => {
   console.log("res quran list:", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    res.data && res.data.hadith_books && dispatch({ type: ActionTypes.BUKHARILIST, payload: res.data.hadith_books });
  })
  .catch((error)=>{
    console.log(error)
    return error;
  });
}



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