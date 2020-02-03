import { getLanguage } from '../utils/common';
export const initialState = {
	common:{
		isLoading: false,
		showModal: false,
		quranList: [],
		quranDetails: {},
		bukhariList: {},
		bukhariDetails: {},
	},
	auth:{
		user: {userId: 1, username: 'Anonymous', name: 'Anonymous', fullname: 'Anonymous'},
		showIntro: true,
		language:getLanguage(0),
		languageId:0,
		languageSet:0
	}
};