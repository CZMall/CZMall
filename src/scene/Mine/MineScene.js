/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *
 * @flow
 */


import React, {
  PureComponent
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  ImageBackground
} from 'react-native';

import {
  Heading2,
  Heading3,
  Paragraph
} from '../../widget/Text';
import {
  screen,
  system
} from '../../common';
import {
  DetailCell,
  NavigationItem,
  Separator,
  SpacingView,
} from '../../widget';
import MineViewCell from '../../scene/Mine/MineViewCell'
import api from "../../api";
import {commonStyle} from '../../widget/commonStyle'
import LocalImg from '../../common/commonImages';

type Props = {

}

type State = {
  isRefreshing: boolean,
}

class MineScene extends PureComponent<Props, State> {
  static navigationOptions = {
    tabBarVisible: false, // 隐藏底部导航栏
    header:null,  //隐藏顶部导航栏
  };
  // static navigationOptions = ({ navigation }: any) => ({
  //   headerRight: (
  //     <View style={{ flexDirection: 'row' }}>
  //       <NavigationItem
  //         icon={require('../../img/mine/icon_navigation_item_set_white.png')}
  //         onPress={() => {
  //
  //         }}
  //       />
  //       <NavigationItem
  //         icon={require('../../img/mine/icon_navigation_item_message_white.png')}
  //         onPress={() => {
  //
  //         }}
  //       />
  //     </View>
  //   ),
  //   headerStyle: {
  //     backgroundColor: color.primary,
  //     elevation: 0,
  //     borderBottomWidth: 0,
  //   },
  // })

  state: {
    isRefreshing: boolean
  }

  constructor(props: Object) {
    super(props)

    this.state = {
      isRefreshing: false
    }
  }

  onHeaderRefresh() {
    this.setState({ isRefreshing: true })

    setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, 2000)
  }

  renderHeader() {
    return (
        <View style={styles.header}>
          <Image style={styles.avatar} source={LocalImg.mine_personal_info_icon} />
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <TouchableOpacity onPress={() => this.accountInfo()}>
                <Heading2 style={{ color: commonStyle.white }}>
                  诚智医疗
                </Heading2>
              </TouchableOpacity>
            </View>
            {/*<TouchableOpacity onPress={() => this.personMessage()}>*/}
            {/*  <Paragraph style={{ color: commonStyle.white, marginTop: 4 }}>*/}
            {/*    个人信息 >*/}
            {/*  </Paragraph>*/}
            {/*</TouchableOpacity>*/}
          </View>
        </View>
    )
  }

  renderCenterMsg() {
    return (
        <View style={styles.centerMsg}>
          <TouchableOpacity onPress={() => this.balanceInfo()}>
            <Heading2 style={{
              width:screen.width/3,
              textAlign: 'center',
              justifyContent: 'center',
            }}>
              120.33
            </Heading2>
            <Paragraph style={{
              textAlign: 'center',
              justifyContent: 'center',
            }}>
              余额
            </Paragraph>
          </TouchableOpacity>
          <Text style={styles.line}>{'|'}</Text>
          <TouchableOpacity onPress={() => this.balanceInfo()}>
            <Heading2 style={{
              width:screen.width/3,
              textAlign: 'center',
              justifyContent: 'center',
            }}>
              400
            </Heading2>
            <Paragraph style={{
              width:screen.width/3,
              textAlign: 'center',
              justifyContent: 'center',
            }}>
              积分
            </Paragraph>
          </TouchableOpacity>
          <Text style={styles.line}>{'|'}</Text>
          <TouchableOpacity onPress={() => this.balanceInfo()}>
            <Heading2 style={{
              width:screen.width/3,
              textAlign: 'center',
              justifyContent: 'center',

            }}>
              5
            </Heading2>
            <Paragraph style={{
              width:screen.width/3,
              textAlign: 'center',
              justifyContent: 'center',
            }}>
              优惠券
            </Paragraph>
          </TouchableOpacity>
        </View>
      )
  }

  //个人信息按钮
  personMessage() {

    Alert.alert("点击了按钮");
  }

  //账户信息
  accountInfo() {
    Alert.alert("点击了按钮");
  }

  //账户余额
  balanceInfo() {
    Alert.alert("账户余额");
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: commonStyle.paper }}>
        <View style={{
          position: 'absolute',
          width: screen.width,
          height: screen.height / 3,
        }}>
          <Image style={{
            position: 'absolute',
            width: screen.width,
            height: 190,
          }} source={LocalImg.mine_header_bg_icon} />
        </View>
        <ScrollView style={{flex: 1, marginTop:80}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onHeaderRefresh()}
              tintColor={commonStyle.gray}
            />
          }>
          {this.renderHeader()}
          <SpacingView />
          {this.renderCenterMsg()}
          <SpacingView />
          <View style={styles.recommendHeader}>
            <DetailCell
                title='我的订单'
                subtitle='全部订单'
                style={{
                  marginLeft:15,
                  marginRight: 15,
                  borderRadius: 15,
                  height: 44,
                }}
                rightImage={LocalImg.arrow_cell_icon}
                onPress={buttonClick}
            />
            <Separator />
            {/**待付款，待发货，待收货，待评价，售后*/}
            <MineViewCell
                mineViewInfos={api.mineViewInfo}
                onMineViewSelected={this.onMineViewSelected}
            />
          </View>
          <SpacingView />
          <View style={styles.recommendHeader}>
            <DetailCell
                title='我的医疗'
                style={{
                  marginLeft:15,
                  marginRight: 15,
                  borderRadius: 15,
                  height: 44,
                }}
            />
            <Separator />
            {/**我的预约，我的问诊，我的医生，我的用药，问诊人管理*/}
            <MineViewCell
                mineViewInfos={api.mineMedicalInfo}
                onMineViewSelected={this.onMineViewSelected}
            />
          </View>
          <SpacingView />
          <View style={styles.recommendHeader}>
            <DetailCell
                title='我的服务'
                style={{
                  marginLeft:15,
                  marginRight: 15,
                  borderRadius: 15,
                  height: 44,
                }}
            />
            <Separator />
            {/**分享得奖，地址管理，我的拼团，我的问答，联系客服，反馈中心，收藏店铺，收藏药品*/}
            <MineViewCell
                mineViewInfos={api.mineServiceInfo}
                onMineViewSelected={this.onMineViewSelected}
            />
          </View>
        </ScrollView>
      </View>
    )
  }

}

//查看全部订单按钮
const buttonClick = () => {
  Alert.alert("点击了按钮");
};


const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
  },
  header: {
    // backgroundColor: commonStyle.primary,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  centerMsg: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: commonStyle.white
  },
  line: {
    color: commonStyle.drakGray,
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 25
  },
  recommendHeader: {
    justifyContent: 'center',

  },
})


export default MineScene
