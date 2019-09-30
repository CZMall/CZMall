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
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ListView,
  Image,
  StatusBar,
  FlatList,
  Alert,
  Text,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  RefreshControl
} from 'react-native';

import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph
} from '../../widget/Text';
import {
  Button,
  NavigationItem,
  SpacingView,
  Separator,
  DetailCell,
  PharmacyCell
} from '../../widget';

import {
  screen,
  system,
} from '../../common';
import api from '../../api'
import DataSource from '../../DataSource'
import {commonStyle} from '../../widget/commonStyle'

import HomeMenuView from './HomeMenuView'
import HomeClassificationView from './HomeClassificationView'
import ClassificationCell from '../Classification/ClassificationCell'
import HomeSecondsKillCell from './HomeSecondsKillCell'
import LocalImg from '../../common/commonImages';
import SearchBar from "react-native-search-box";

import BusinessDetails from '../../scene/Detail/BusinessDetails'
import GoodsDetails from '../../scene/Detail/GoodsDetails'
import MorePharmacy from '../../scene/Detail/MorePharmacy'
let {width, height} = Dimensions.get('window')
type Props = {
  navigation: any,
}

type State = {
  discounts: Array<Object>,
  dataList: Array<Object>,
  refreshing: boolean,
}


class HomeScene extends PureComponent<Props, State> {


  static navigationOptions = {
    tabBarVisible: false, // 隐藏顶部导航栏
    header:null,  //隐藏顶部导航栏
  };

  constructor(props: Props) {
    super(props)

    this.state = {
      discounts: [],
      dataList: [],
      refreshing: false,
      showSearchBar: false
    }
  }

  componentDidMount() {
    // this.requestData()
  }

  requestData = () => {
    this.setState({ refreshing: true })

    // this.requestDiscount()
    this.requestRecommend()
  }

  requestRecommend = async () => {
    try {
      let response = await fetch(api.recommend)
      let json = await response.json()

      let dataList = json.data.map(
        (info) => {
          return {
            id: info.id,
            imageUrl: info.squareimgurl,
            title: info.mname,
            subtitle: `[${info.range}]${info.title}`,
            price: info.price
          }
        }
      )

      this.setState({
        dataList: dataList,
        refreshing: false,
      })
    } catch (error) {
      this.setState({ refreshing: false })
    }
  }

  requestDiscount = async () => {
    try {
      let json = api.discount
      this.setState({ discounts: json.data })
    } catch (error) {
      alert(error)
    }
  }


  keyExtractor = (item: Object, index: number) => {
    return item.id.toString()
  }

  //下拉刷新
  onHeaderRefresh() {
    this.setState({ isRefreshing: true })

    setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, 2000)
  }

  renderHeader = () => {
    return (
        <View>
        {/**搜索框*/}
        <View style={{height: 60, padding: 0 }}>

            {/*<SearchBar*/}
            {/*    backgroundColor="transparent"*/}
            {/*    cancelButtonStyle={{*/}
            {/*      backgroundColor: 'transparent',*/}
            {/*      color: '#5e77ff',*/}
            {/*    }}*/}
            {/*    // autoFocus*/}
            {/*    inputBorderRadius={30}*/}
            {/*    placeholder="搜索药名找药"*/}
            {/*    cancelTitle="取消"*/}
            {/*    onCancel={() => { this.props.navigation.goBack() }}*/}
            {/*    titleCancelColor="#00040f"*/}
            {/*    onSearch={(value) => {*/}
            {/*      this.setState({*/}
            {/*        searchValue: value,*/}
            {/*        hasSearch: true*/}
            {/*      })*/}
            {/*    }}*/}
            {/*/>*/}
          <View style={styles.searchBox}>
            <Image source={LocalImg.search_icon} style={styles.searchIcon}/>
            <TextInput
                keyboardType='web-search'
                placeholder='搜索药品找药'
                onFocus={()=>this.props.navigation.navigate('Search')}
                style={styles.inputText}
                underlineColorAndroid='transparent' />
            <Image source={LocalImg.voice_icon} style={styles.voiceIcon}/>
          </View>
        </View>

        {/**主菜单*/}
        <HomeMenuView
            menuInfos={api.menuInfo}
            onMenuSelected={this.onMenuSelected} />
        <SpacingView />
        <View style={{
          backgroundColor: commonStyle.white,
          height:44,
          flexDirection: 'row',
        }}>
          <View style={styles.hotContext}>
            <Text style={{
              marginTop: 3,
              textAlign: 'center',
              color: commonStyle.white,
              fontSize: 12
            }}>
              热点
            </Text>
          </View>

          <Text style={styles.hotMessage}>
            热烈祝贺同城快药APP突破30万粉丝~~~
          </Text>
        </View>
        <SpacingView />
        {/**常用分类*/}
        <View style={styles.recommendHeader}>
          <DetailCell
              title='常用分类'
              subtitle='更多'
              style={{ height: 44 }}
              rightImage={LocalImg.arrow_cell_icon}
              onPress={() => this.MoreClassificationClicked()}
          />
        </View>
        <SpacingView />

        {/**疾病分类*/}
        <HomeClassificationView
            classificationInfos={api.classificationInfo}
            onClassificationSelected={this.onClassificationSelected}
        />
        <SpacingView />
        {/**大众秒杀*/}
        <View style={styles.secondsKill}>
          <DetailCell
              title='匠心精选'
              style={{ height: 44 }}
          />
        </View>
        <SpacingView />
        {/**大众秒分类*/}
        <View style={{
          backgroundColor: commonStyle.white,
          height: height/4.8,
          flexDirection: 'row',
        }}>
          <TouchableOpacity onPress={() => this.secondsKillClicked()}>
            <View style={{
              width: (width-14) /2,
              height: height/4,
              left: 7
            }}>
              <ImageBackground
                  source={LocalImg.xiaobj_icon}
                  style={{
                    flex: 1,
                    resizeMode: 'contain'
                  }}
              >
                <View style={{
                  height:100
                }}>
                  <Heading3 style={{
                    top: 20,
                    left: 20,
                    width: width/3,
                  }}>
                    限时秒杀
                  </Heading3>
                  <Paragraph style={{
                    top: 30,
                    left: 20,
                    width: width/3,
                  }}>
                    爆款商品再补货
                  </Paragraph>
                  <View style={{
                    backgroundColor: commonStyle.orange,
                    top: 40,
                    left: 20,
                    borderRadius: 2,
                    width: 60,
                    height: 15,
                  }}>
                    <Text style={{
                      top: 2,
                      fontSize: 10,
                      color: commonStyle.white,
                      textAlign: 'center',
                    }}>
                      每日最热
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <View style={{
            left: 10,
            width: (width-14) /2,
            height:height/4.8,
          }}>
            <TouchableOpacity onPress={() => this.cabbagePriceClicked()}>
              <View style={{
                height: height/9.6
              }}>
                <ImageBackground
                    source={LocalImg.cabbage_price_icon}
                    style={{
                      flex: 1,
                    }}
                >
                  <View>
                    <Heading3 style={{
                      top: 10,
                      left: 20,
                      width: width/3,
                    }}>
                      白菜价
                    </Heading3>
                    <Paragraph style={{
                      top: 20,
                      left: 20,
                      width: width/3,
                    }}>
                      比您想象的更优惠
                    </Paragraph>
                    <View style={{
                      backgroundColor: commonStyle.cabbagePriceColor,
                      top: 30,
                      left: 20,
                      borderRadius: 2,
                      width: 60,
                      height: 15,
                    }}>
                      <Text style={{
                        top: 2,
                        fontSize: 10,
                        color: commonStyle.white,
                        textAlign: 'center',
                      }}>
                        超值抢购
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.discountSpellGroupClicked()}>
              <View style={{
                height:height/9.6
              }}>
                <ImageBackground source={LocalImg.discount_spell_group_icon}
                                 style={{
                                   flex: 1,
                                 }}
                >
                  <View>
                    <Heading3 style={{
                      top: 10,
                      left: 20,
                      width: width/3,
                    }}>
                      折扣拼团
                    </Heading3>
                    <Paragraph style={{
                      top: 20,
                      left: 20,
                      width: width/3,
                    }}>
                      助力拼团限时购
                    </Paragraph>
                    <View style={{
                      backgroundColor: commonStyle.discountSpellGroupColor,
                      top: 30,
                      left: 20,
                      borderRadius: 2,
                      width: 60,
                      height: 15,
                    }}>
                      <Text style={{
                        top: 2,
                        fontSize: 10,
                        color: commonStyle.white,
                        textAlign: 'center',
                      }}>
                        9.9元起
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <SpacingView />
        {/**附近药店*/}
        <View style={styles.recommendHeader}>
          <DetailCell
              title='附近药店'
              subtitle='更多'
              style={{ height: 44 }}
              rightImage={LocalImg.arrow_cell_icon}
              onPress={() => this.morePharmacyClicked()}
          />
        </View>
        {/*<SpacingView />*/}
        {/**附近药店cell*/}
        <View style={styles.business}>
          {this._onNearHarmacies()}
        </View>
        <SpacingView />
        {/**为您推荐*/}
        <View style={styles.recommendHeader}>
          <DetailCell
              title='为您推荐'
              style={{ height: 44 }}
          />
        </View>
        <SpacingView />

      </View>
    )
  }

  MoreClassificationClicked() {
    Alert.alert("点击了更多分类")
  }

  morePharmacyClicked() {
    this.props.navigation.push('MorePharmacy')
  }

  secondsKillClicked() {
    Alert.alert("点击了限时抢购")
  }

  cabbagePriceClicked() {
    Alert.alert("点击了白菜价")
  }

  discountSpellGroupClicked() {
    Alert.alert("点击了折扣拼团")
  }

  _onNearHarmacies() {
    return DataSource.list.map((item, i) => {
      item.onPress = () => {

        this.props.navigation.push('BusinessDetails')
      }
      return (<PharmacyCell {...item} key={i}/>)
    })
  }

  onGridSelected = (index: number) => {
    let discount = this.state.discounts[index]

    if (discount.type == 1) {
      StatusBar.setBarStyle('default', false)

      let location = discount.tplurl.indexOf('http')
      let url = discount.tplurl.slice(location)
      this.props.navigation.navigate('Web', { url: url })
    }
  }

  //主菜单
  onMenuSelected = (index: number) => {
    if(index == 0){this.props.navigation.navigate('Scan')}
    if(index == 1){ this.props.navigation.navigate('Prescription')}
  }

  //疾病分类
  onClassificationSelected = (index: number) => {
    // alert(index)
    if (index === 0) {
      this.props.navigation.push('GoodsDetails')
    }
  }

  render() {
    let showSearchBar = this.state.showSearchBar ? <View style={styles.topSearchBox}>
      <Image source={LocalImg.search_icon} style={styles.searchIcon}/>
      <TextInput
          keyboardType='web-search'
          placeholder='搜索药品找药'
          style={styles.inputText}
          underlineColorAndroid='transparent' />
      <Image source={LocalImg.voice_icon} style={styles.voiceIcon}/>
    </View> : null
    return (

      <View style={styles.container}>
        <View style={{
          position: 'absolute',
          width: screen.width,
          height: screen.height / 3,
        }}>
          <Image style={{
            position: 'absolute',
            width: screen.width,
            height: 216,
          }} source={LocalImg.home_bg_icon} />
          <View style={{
            top: 28,
            height: 44,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <TouchableOpacity onPress={() => this.positionClicked()}>
              <View style={{
                left: 15,
                top: 15,
                width: 30,
                textAlign: 'center'
              }}>
                <Paragraph style={{
                  color: commonStyle.white,
                }}>
                  西安
                </Paragraph>
              </View>
            </TouchableOpacity>

            {/**搜索框*/}
            {showSearchBar}
            {/**消息*/}
            <TouchableOpacity onPress={() => this.messageClicked()}>
              <Image source={LocalImg.news_icon} style={{
                top: 15,
                right: 15,
                height: 19,
                width: 19,
              }}>
              </Image>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{flex: 1, marginTop:64}}
                    refreshControl={
                      <RefreshControl
                          refreshing={this.state.isRefreshing}
                          onRefresh={() => this.onHeaderRefresh()}
                          tintColor={commonStyle.gray}
                      />
                    }>
          <View style={{
            height: 116,
          }}>
          </View>
          {this.renderHeader()}
        </ScrollView>
      </View>
    )
  }

  //位置按钮点击事件
  positionClicked() {
    Alert.alert('点击了位置按钮')
  }
  //消息按钮点击事件
  messageClicked() {
    Alert.alert('点击了消息按钮')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.paper
  },
  hotContext: {
    backgroundColor: commonStyle.red,
    left: 22,
    top: 15,
    height: 20,
    width: 40,
    borderRadius: 5,
  },
  hotMessage: {
    top: 15,
    textAlign: 'center',
    left: 30,
    height: 20
  },
  recommendHeader: {
    height: 44,
    justifyContent: 'center',
    borderWidth: screen.onePixel,
    borderColor: commonStyle.border,
    paddingVertical: 8,
  },
  searchBox: {
    height: 30,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 30,
    backgroundColor: commonStyle.white,
    alignItems: 'center',
    marginTop:10,
    marginLeft: 60,
    marginRight: 60,
    marginBottom:10
  },
  topSearchBox: {
    height: 30,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 30,
    backgroundColor: commonStyle.white,
    alignItems: 'center',
    marginTop:5,
    marginLeft: 30,
    marginRight: 30,
    marginBottom:10
  },
  inputText: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  voiceIcon: {
    marginLeft: 5,
    marginRight: 10,
    width: 15,
    height: 20,
    resizeMode: 'stretch'
  },
  scanIcon: {
    height: 26.7,
    width: 26.7,
    resizeMode: 'stretch'
  },
  searchIcon: {
    marginLeft: 6,
    marginRight: 6,
    width: 16.7,
    height: 16.7,
    resizeMode: 'stretch'
  },
  moreMessage: {
    marginRight:20,
    width:80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondsKill: {
    height: 30,
    justifyContent: 'center',
    borderWidth: screen.onePixel,
    borderColor: commonStyle.border,
    paddingVertical: 8,
  },
  business: {
    backgroundColor: commonStyle.white,
    marginTop: 4,
    paddingVertical: 16
  }
})


export default HomeScene
