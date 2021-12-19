
import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableHighlight, TouchableOpacity, Linking} from 'react-native'
import _ from 'lodash';
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers,TabNavigation } from '../../components';
import imgs from '../../assets/images';
import axios from 'axios';
import {fetchQuranList, fetchBukhariList} from "../../actions/common";
import url from '../../config/api';

import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right, Footer, FooterTab
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
class About extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount(){

  }
  render(){
    const BACKGROUND_COLOR = 'green';
    return (
      <Container style={appStyles.container}>
       {/* <Headers {...this.props} /> */}
        <View
            style={ { width: Layout.window.width, height: Layout.window.height }}>
          <Headers  {...this.props}  />
          <Content enableOnAndroid style={[appStyles.content,{paddingTop: 10, paddingHorizontal:10, backgroundColor: 'white'}]}>
            <View style={styles.container}>

<Text>
QNS Academy is registered as not for profit organization.
</Text><Text>
The academy would help people to acquire knowledge of sacred scriptures easily.
</Text><Text>
QNSA aims to provide Islamic knowledge to remind Muslims about their religious obligations to Allah, to themselves, to their families, neighbours and society, while working to strength individuals’ Islamic identity and feelings of belonging.
</Text><Text>
It is a platform to better understand spiritual & social crisis with the knowledge of scriptures and promote rights of God, parents, orphans, women, neighbours, poor, needy and others.
</Text><Text>
QNSA also aims to educate the public about Islam through the authentic sources of the Quran & Sunnah to provide better understandings of Islam and Muslims.

</Text>

              <View style={styles.item}>

<Text style={{color: 'blue', paddingTop: 15}}
      onPress={() => Linking.openURL('https://www.qnsacademy.com/page/detail/10/PRIVACY-POLICY')}>
  Our Privacy Policy details
</Text>
              </View>
            </View>


          </Content>
         </View>
      </Container>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   };
};

const styles = StyleSheet.create({
  image:{
    height: 135, width: 135
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // borderWidth: 1,
    // borderColor:'red',
    justifyContent:'center',
    alignItems: 'center' // if you want to fill rows left to right
  },
  item: {
    flex:1,
    // padding:5, margin: 5, borderWidth:0, borderColor:'white',
    flexBasis:'50%',
    // borderWidth:1,
    // borderColor:'green',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    flexDirection:'row'

    // width: '46%' // is 50% of container width
  }
})
// Exports
export default connect(mapStateToProps, mapDispatchToProps)(About);;
