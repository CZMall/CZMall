/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *
 * @flow
 */

import React, {Component} from 'react'
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity, FlatList
} from 'react-native'
import LocalImg from '../../src/common/commonImages'
import px2dp from '../../src/common/index'
import PropTypes, {bool} from 'prop-types'
import {commonStyle} from './commonStyle'

class PharmacyCell extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    name: PropTypes.string.isRequired, // 商家名
    logo: PropTypes.number.isRequired, // 商家logo
    isBrand: PropTypes.bool,
    scores: PropTypes.number, //商家评分
    sale: PropTypes.number, //月销售量
    bao: PropTypes.bool, // 保计划
    piao: PropTypes.bool, // 票
    ontime: PropTypes.bool, // 准时
    fengniao: PropTypes.bool, // 蜂鸟专送
    startPay: PropTypes.string, // 起送费
    deliverPay: PropTypes.string, // 配送费
    evOnePay: PropTypes.string, // 费用/人
    journey: PropTypes.string, // 路程
    time: PropTypes.string, // 送药时间
    activities: PropTypes.array,
    drugLists: PropTypes.array,
    onPress: PropTypes.func,
  }

  renderActivities(){
    let color = {
      "超时赔付": commonStyle.orange,
      "满减": commonStyle.tomato,
    }
    let {activities} = this.props
    if(!activities || !activities.length){
      return null
    }else{
      return (
          <View style={styles.actives}>
            {
              activities.map((item, i) => {
                return (
                    <View key={i}
                          style={{
                            flexDirection: "row",
                            marginTop: 5
                          }}
                    >
                      <Text style={{
                        fontSize: px2dp(11),
                        color: commonStyle.white,
                        backgroundColor: color[item.key] || commonStyle.orange,
                        paddingHorizontal: 1,
                        paddingVertical: 1
                      }}>
                        {item.key}
                      </Text>
                      <Text
                          numberOfLines={1}
                            style={{
                              fontSize: px2dp(11),
                              marginLeft:3,
                              color: commonStyle.textBlankColor
                            }}>
                        {item.text}
                      </Text>
                    </View>
                )
              })
            }
          </View>
      )
    }
  }

  render(){
    const {
      name,
      isBrand,
      logo,
      scores,
      sale,
      bao,
      piao,
      ontime,
      fengniao,
      startPay,
      deliverPay,
      evOnePay,
      journey,
      time,
      onPress
    } = this.props

    let scale = scores/5*55

    return (
        <View style={styles.mallWrap}>
          <View style={styles.border}>
            <Image source={logo} style={styles.mallLogo}/>
            <View style={styles.mallContent}>
              <View style={{
                backgroundColor: commonStyle.white,
              }}>
                <TouchableOpacity onPress={onPress}>
                  <View style={styles.between}>
                    <View style={{flexDirection: "row", flex: 1}}>
                      {isBrand?(<Text style={styles.brand}>{"品牌"}</Text>):null}
                      <Text numberOfLines={1} style={styles.name}>
                        {name}
                      </Text>
                    </View>
                    <View style={{
                      flexDirection: "row",
                      justifyContent:"flex-end",
                      width: 70
                    }}>
                      {bao?(<Text style={styles.label}>{"保"}</Text>):null}
                      {piao?(<Text style={[styles.label, {marginLeft: 2}]}>{"票"}</Text>):null}
                    </View>
                  </View>
                  <View style={[styles.between, {marginTop: 8}]}>
                    <View style={{flexDirection: "row", flex: 1}}>
                      <View>
                        <Image source={LocalImg.star2}
                               style={{height: 10, width: 55}}/>
                        <View style={{
                          height: 10,
                          position:"absolute",
                          left:0,
                          top:0,
                          width: scale,
                          overflow:"hidden"
                        }}>
                          <Image source={LocalImg.star1}
                                 style={{height: 10, width: 55}}/>
                        </View>
                      </View>
                      <Text style={{
                        fontSize: px2dp(11),
                        color: commonStyle.orange
                      }}>
                        {scores}
                      </Text>
                      <Text style={{
                        fontSize: px2dp(11),
                        color: commonStyle.textBlankColor,
                        marginLeft: 2
                      }}>
                        {`月售${sale}单`}
                      </Text>
                    </View>
                    <View style={{
                      flexDirection: "row",
                      justifyContent:"flex-end"
                    }}>
                      {ontime?(<Text style={styles.label1}>{"准时达"}</Text>):null}
                      {fengniao?(<Text style={[styles.label2, {marginLeft: 2}]}>{"蜂鸟专送"}</Text>):null}
                    </View>
                  </View>
                  <View style={[styles.between, {marginTop: 8}]}>
                    <View style={{
                      flexDirection: "row",
                      flex: 1
                    }}>
                      <Text style={styles.infoText}>{startPay}</Text>
                      <Text style={styles.line}>{'|'}</Text>
                      <Text style={styles.infoText}>{deliverPay}</Text>
                      <Text style={styles.line}>{'|'}</Text>
                      <Text style={styles.infoText}>{evOnePay}</Text>
                    </View>
                    <View style={{
                      flexDirection: "row",
                      justifyContent:"flex-end"
                    }}>
                      <Text style={styles.infoText}>{journey}</Text>
                      <Text style={styles.line}>{'|'}</Text>
                      <Text style={{fontSize: px2dp(11),
                        color: commonStyle.blue,
                        marginLeft: 2
                      }}>
                        {time}
                      </Text>
                    </View>
                  </View>
                  {this.renderActivities()}
                </TouchableOpacity>
              </View>
              {this.ListDrugView()}
            </View>
          </View>
        </View>
    )
  }

  ListDrugView() {
    let {drugLists} = this.props
    if (!drugLists || !drugLists.length) {
      return null
    } else {
      return (
          <View style={styles.drugViewStyle}>
            <View style={{
              backgroundColor: commonStyle.paper,
              height:133
            }}>
              <FlatList
                  data={drugLists}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                  horizontal={true}
              />
            </View>
          </View>
      )
    }
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
      <View style={{
        backgroundColor: commonStyle.white,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: commonStyle.borderColor
      }}>
        <Image source={item.icon}>

        </Image>
        <Text style={styles.nameTextStyle}>
          {item.name}
        </Text>
        <Text style={styles.numberTextStyle}>
          {item.number}
        </Text>
        <View style={{marginTop: 5, flexDirection: 'row'}}>
          <Text style={styles.priceTextStyle}>
            {item.price}
          </Text>
          <TouchableOpacity onPress={this.onPress}>
            <Image source={LocalImg.add_to_icon} style={styles.imageViewStyle}>
            </Image>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={styles.preferentialTextStyle}>
            {item.preferential}
          </Text>
          <Text style={styles.preferentialTextStyle}>
            {item.packageMail}
          </Text>
        </View>
      </View>

  );

}


const styles = StyleSheet.create({
  mallWrap: {
    backgroundColor: commonStyle.white,
  },
  border: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.border
  },
  mallLogo: {
    marginLeft: 15,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: commonStyle.border,
    width: px2dp(80),
    height: px2dp(80)
  },
  mallContent: {
    backgroundColor:commonStyle.white,
    marginLeft: 6,
    flex: 1
  },
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: commonStyle.navLeftTitleColor,
    marginLeft: 3
  },
  brand: {
    fontSize: 12,
    color: commonStyle.PeachPuff,
    paddingHorizontal: 3,
    paddingVertical: 2,
    backgroundColor: commonStyle.yellow
  },
  label: {
    fontSize: 10,
    color: commonStyle.textGrayColor,
    borderWidth: 1,
    borderColor: commonStyle.placeholderColor,
    textAlign: "center",
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 3
  },
  label1: {
    fontSize: 10,
    color: commonStyle.blue,
    borderWidth: 1,
    borderColor: commonStyle.blue,
    textAlign: "center",
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 3
  },
  label2: {
    fontSize: 10,
    color: commonStyle.white,
    backgroundColor: commonStyle.blue,
    textAlign: "center",
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  line: {
    fontSize: px2dp(11),
    color: commonStyle.textGrayColor,
    paddingHorizontal: 3
  },
  infoText: {
    fontSize: px2dp(11),
    color: commonStyle.textBlankColor
  },
  actives: {
    paddingTop: 4,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: commonStyle.drankGray
  },
  drugViewStyle: {
    paddingTop: 4,
    marginTop: 8,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  nameTextStyle: {//药品名称
    marginTop: 7,
    marginLeft: 3,
    marginRight: 6,
    fontSize: 10,
  },
  numberTextStyle: { //药品数量
    marginLeft: 3,
    marginTop: 5,
    marginRight: 6,
    fontSize: 9,
  },
  priceTextStyle: { //药品价格
    marginLeft: 3,
    marginRight: 6,
    color: commonStyle.red,
    fontSize: 11
  },
  imageViewStyle: { //加入购物车
    marginLeft: 25,
    marginRight: 14
  },
  preferentialTextStyle: {
    marginLeft: 3,
    borderColor: commonStyle.red,
    borderWidth: 1,
    fontSize: 9,
    color: commonStyle.textRedColor
  }
})

export default PharmacyCell
