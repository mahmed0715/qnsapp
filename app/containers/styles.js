import {Colors,Layout} from '../constants/';
export default {
  textColor:{
    color: 'white'
  }
  ,
  container: {
    flex: 1,
    backgroundColor: '#4fa3d2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemStyle:{
    // marginTop: 5
    marginLeft:0
  },
  loginBox: {
    marginTop: -Layout.indent,
    marginLeft: 0,
    marginRight: 0,
    flex: 1,
  },
  midText:{
    fontSize: 18,
    fontFamily: 'Font-Light',
    marginLeft: 40,
    marginRight: 40,
  },
  linkTextBtn:{
    marginTop:Layout.indent
  },
  linkText:{
    textTransform:'capitalize',
    color: Colors.white,
    fontSize:16,

  },
  button: {
    backgroundColor: Colors.secondary,
  },
  formMsg: {
    fontSize: 16,
    color: 'red',
    alignSelf: 'center',
    backgroundColor: "rgba(0,0,0,0)"
  },
  linky: {
    color: 'blue',
    paddingTop: 10
  },
  loading: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
};