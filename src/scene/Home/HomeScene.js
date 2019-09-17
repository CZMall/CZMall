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
  ActivityIndicator
} from 'react-native';

import {
  Heading2,
  Heading3,
  Paragraph
} from '../../widget/Text';
import {
  Button,
  NavigationItem,
  SpacingView,
  DetailCell,
  PharmacyCell
} from '../../widget';

import {
  screen,
  system,
} from '../../common';
import api from '../../api'
import {commonStyle} from '../../widget/commonStyle'

import HomeMenuView from './HomeMenuView'
import HomeClassificationView from './HomeClassificationView'
import ClassificationCell from '../Classification/ClassificationCell'
import HomeSecondsKillCell from './HomeSecondsKillCell'
import LocalImg from '../../common/commonImages';
import SearchBar from "react-native-search-box";

type Props = {
  navigation: any,
}

type State = {
  discounts: Array<Object>,
  dataList: Array<Object>,
  refreshing: boolean,
}


class HomeScene extends PureComponent<Props, State> {

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: (
        <Paragraph>
          您所在的地址支持1小时送药
        </Paragraph>
    ),

    headerLeft: (
      <NavigationItem
          // icon={require('../../img/mine/icon_navigation_item_message_white.png')}
          title='西安'
          titleStyle={{ color: commonStyle.white }}
          onPress={() => {

          }}
      />
    ),
    headerStyle: { backgroundColor: commonStyle.primary },
  })

  constructor(props: Props) {
    super(props)

    this.state = {
      discounts: [],
      dataList: [],
      refreshing: false,
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

  renderCell = (info: Object) => {
    return (
      <ClassificationCell
        info={info.item}
        onPress={this.onCellSelected}
      />
    )
  }

  onCellSelected = (info: Object) => {
    StatusBar.setBarStyle('default', false)
    this.props.navigation.navigate('Classification', { info: info })
  }

  keyExtractor = (item: Object, index: number) => {
    return item.id.toString()
  }

  renderHeader = () => {
    return (
      <ScrollView>
        {/**轮播图*/}
        <View style={{ flexDirection: 'row', height: 150, padding: 0 }}>
          <View style={{ backgroundColor: commonStyle.blue, flex: 1 }} />

        </View>

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

        {/**常用分类*/}
        <View style={styles.recommendHeader}>
          <DetailCell
              title='常用分类'
              subtitle='更多'
              style={{ height: 44 }}
              rightImage={LocalImg.arrow_cell_icon}
              onPress={buttonClick}
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
              name='大众秒杀'
              secondsWeBoys = '17点场'
              remainTimer = '剩余：01：33：04'
              subNames='好货不停'
              style={{ height: 30 }}
              rightImage={LocalImg.arrow_cell_icon}
              onPress={buttonClick}
          />
        </View>
        <SpacingView />
        {/**大众秒分类*/}
        <HomeSecondsKillCell
            secondsKillInfos={api.secondsKillInfo}
            onSecondsKillSelected={this.onSecondsKillSelected} />
        <SpacingView />
        {/**附近药店*/}
        <View style={styles.recommendHeader}>
          <DetailCell
              title='附近药店'
              subtitle='更多'
              style={{ height: 44 }}
              rightImage={LocalImg.arrow_cell_icon}
              onPress={buttonClick}
          />
        </View>
        <SpacingView />
        {/**附近药店cell*/}
        <View style={styles.business}>
          {this._onNearHarmacies()}
          <ActivityIndicator style={{marginTop: 10}} animating={this.state.refreshing}/>
        </View>
        <SpacingView />
        {/**为您推荐*/}
        <View style={styles.recommendHeader}>
          <DetailCell
              title='为您推荐'
              style={{ height: 44 }}
              onPress={buttonClick}
          />
        </View>
        <SpacingView />

      </ScrollView>
    )
  }

  _onNearHarmacies() {
    return api.list.map((item, i) => {
      item.onPress = () => {
        // this.props.navigator.push({
        //   component: '',
        //   args: {}
        // })
        alert(i)
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
    alert(index)
  }

  //疾病分类
  onClassificationSelected = (index: number) => {
    alert(index)
  }

  //大众秒杀
  onSecondsKillSelected = (index: number) => {
    alert(index)
  }

  render() {
    return (

      <View style={styles.container}>
        <FlatList
          data={this.state.dataList}
          renderItem={this.renderCell}

          keyExtractor={this.keyExtractor}
          onRefresh={this.requestData}
          refreshing={this.state.refreshing}

          ListHeaderComponent={this.renderHeader}
        />
      </View>
    )
  }
}


const buttonClick = () => {
  Alert.alert("点击了按钮");
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.paper
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
    marginLeft: 10,
    marginRight: 80,
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
    marginTop: 10,
    paddingVertical: 16
  }

})


export default HomeScene
