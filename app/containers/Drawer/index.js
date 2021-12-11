import React from "react";
import { AppRegistry, Image, StatusBar, ImageBackground, TouchableOpacity } from "react-native";
import { NavigationActions, DrawerItems } from 'react-navigation'
import {
  Button, View,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Body,
  Left,
  Thumbnail, Header,
  Footer
} from "native-base";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user";
import imgs from '../../assets/images';
import appStyles from '../../theme/appStyles';
import { Screens, Colors, Layout } from '../../constants';
import styles from './styles';
import { getCurrentRoute } from '../../utils/common';
import { Svgicon } from '../../components';


class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.listItems = [ Screens.Home,Screens.Settings];
  }

  render() {
    const { navigation, user, language, state } = this.props;
    const currentRoute = getCurrentRoute(state);
    // console.log('current route:', currentRoute, this.listItems);
    const userName = this.props.user == null ? '' : this.props.user.name;
    return (
      <Container>
        <Header style={styles.header}>
          <View style={[appStyles.row, {paddingTop: Layout.halfIndent}]}>
            <List>
              <ListItem avatar noBorder>
                <Left>
                  <Svgicon name="useravatar" 
                    color={Colors.white} 
                    width={Layout.bigIconSize} 
                    height={Layout.bigIconSize} />
                </Left>
                <Body>
                  <Text style={appStyles.profileName} >{userName}</Text>
                </Body>
              </ListItem>
            </List>
          </View>
        </Header>
        <Content>
          <List
              dataArray={this.listItems}
              keyExtractor={(item, index) => index.toString()} 
              style={appStyles.drawerList}
              renderRow={(data) => {
                return (
                  <ListItem 
                  button full
                  noIndent
                  style={[appStyles.drawerItem, data.route==currentRoute ? appStyles.activeDrawerItem : {}]}
                  onPress={() => this.props.navigation.navigate(data.route)}>
                      <Svgicon 
                        style={appStyles.drawerIcon} 
                        color={(data.route==currentRoute) ? Colors.secondary:Colors.black} 
                        name={data.icon} 
                        />
                      <Text
                      style={appStyles.drawerText}>
                      {language[(data.route).toLowerCase()]}</Text>
                  </ListItem>
                );
              }}
            />
          {/* <DrawerItems {...this.props} /> */}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    user: state.auth.user,
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);