/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *  data:2019.09.18
 *
 * @flow
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    Animated,
    Platform,
    Image,
    TouchableOpacity,
    ImageBackground,
    Alert
} from 'react-native'
import px2dp from '../../common/index'
import LocalImg from '../../common/commonImages'
import data from '../../DataSource'
import NavBar from '../../common/NavBar'
import ScrollableTabView, {
    DefaultTabBar
} from 'react-native-scrollable-tab-view'
import GoodsList from './GoodsList'
import UserComments from './UserComments'
import ShopBar from '../../common/ShopBar'
import {commonStyle} from '../../widget/commonStyle'
import {Heading2} from "../../widget/Text";

let {width, height} = Dimensions.get('window')


class BusinessDetails extends Component {
    static navigationOptions = {
        tabBarVisible: false, // 隐藏顶部导航栏
        header:null,  //隐藏顶部导航栏
    };
    constructor(props){
        super(props)
        this.state = {
            scrollY: 0,
            titleOpacity: 0,
            activeOpacity: 1,
            headOpacity: 1,
            addBtnY: -9999,
            animateBtnX: 0,
            animateBtnY: 0,
            runBtn: new Animated.Value(0),
            selected: [],
            lens: {},
            bgY: 0,
            bgScale: 1,
            viewRef: 0,
            b: {},
            goods: data.goods,
            data: {
                name: "田老师红烧肉（知春路店）",
                isBrand: true,
                logo: 27,
                scores: 3.5,
                sale: 4013,
                bao: true,
                piao: true,
                ontime: true,
                fengniao: true,
                startPay: "￥20起送",
                deliverPay: "配送费￥4",
                evOnePay: "￥21/人",
                journey: "250m",
                time: "35分钟",
                bulletin: "公告：春节前，配送紧张，可能延时推送，请客户谅解",
                activities: [
                    {key: "减", text: "满20减2，满30减3，满40减4（不与美食活动同享）"},
                    {key: "特", text: "双人餐特惠"}
                ]
            }
        }
    }
    componentDidMount(){
        let marginTop = 18+px2dp(80+this.state.data.activities.length*18)
        let { scrollY } = this.refs.goodsList.state
        let activeHeight = px2dp(18)*2
        this.setState({
            activeOpacity: scrollY.interpolate(
                {
                    inputRange: [0, activeHeight],
                    outputRange: [1, 0]
                }),
            bgScale: scrollY.interpolate(
                {
                    inputRange: [ -marginTop, 0, marginTop],
                    outputRange: [2, 1, 1]
                }),
            headOpacity: scrollY.interpolate(
                {
                    inputRange: [0, activeHeight, marginTop],
                    outputRange: [1, 1, 0]
                }),
            titleOpacity: scrollY.interpolate(
                {
                    inputRange: [0, marginTop-10, marginTop],
                    outputRange: [0, 0, 1]
                }),
            scrollY: scrollY.interpolate(
                {
                    inputRange: [0, marginTop, marginTop],
                    outputRange: [0, -marginTop, -marginTop]
                }),
            bgY: scrollY.interpolate(
                {
                    inputRange: [ -marginTop, 0, marginTop, marginTop],
                    outputRange: [marginTop/2, 0, -marginTop/3, -marginTop/3]
                })
        })
    }
    back(){
        this.props.navigation.pop()
    }
    onAdd(data){
        let { pos } = data
        this.setState({
            addBtnY: data.y
        })
        this.refs["parabolic"].run(pos, data)
    }
    parabolicEnd(data){
        let { selected, lens } = this.state
        let num = (lens[data.data.key]||0)+1
        let price = lens.maxPrice || 0
        let length = lens.length || 0
        lens[data.data.key] = num
        lens.maxPrice = price+data.data.price
        lens.length = length + 1
        selected.push(data.data)
        this.state.runBtn.setValue(0)
        this.setState({ addBtnY: -9999, selected, lens})
        this.refs.shopBar.runAnimate()
    }

    renderGoods(){
        // let marginTop = 18+px2dp(80+this.state.data.activities.length*18)
        let MAIN_HEIGHT = height - height/5
        let style = {
            transform: [{
                translateY: this.state.scrollY
            }]
        }
        if(Platform.OS == "android"){
            style.height = height + 80
        }

        return (
            <Animated.View style={[styles.topView, style]}>
                <View style={{
                    backgroundColor: commonStyle.gray,
                    height: MAIN_HEIGHT,
                    width,
                    top: 50
                }}>
                    <ScrollableTabView style={{backgroundColor:commonStyle.white}}
                                       tabBarUnderlineStyle={{
                                           backgroundColor: commonStyle.primary,
                                           width:width/6,
                                           height:2,
                                           marginLeft:width/12
                                       }}
                                       tabBarActiveTextColor={commonStyle.primary}
                                       renderTabBar={() => <DefaultTabBar/>}>
                        <GoodsList
                            ref="goodsList"
                            minus={this.minusItem.bind(this)}
                            lens={this.state.lens}
                            goods={this.state.goods}
                            onAdd={this.onAdd.bind(this)}
                            headHeight={0}
                            tabLabel="买药"
                        />
                        <UserComments
                            headHeight={0}
                            tabLabel="评价"
                        />
                        <UserComments
                            headHeight={0}
                            tabLabel="商家"
                        />
                    </ScrollableTabView>
                </View>
            </Animated.View>
        )
    }
    minusItem(obj){
        let { selected,lens } = this.state
        let key = obj.key
        let num = (lens[key]||0)-1
        if(num < 0){
            return
        }
        lens[key] = num
        lens.maxPrice -= obj.price
        lens.length -= 1
        for(let i=0,item; item=selected[i]; i++){
            if(item.key == key){
                selected.splice(i,1)
            }
        }
        this.setState({selected, lens})
    }
    renderActivities(){
        let color = {
            "满减": commonStyle.preferentialBarColor,
            "会员": commonStyle.preferentialBarColor,
            "特价": commonStyle.preferentialBarColor,
            "首单": commonStyle.green,
            "奖励": commonStyle.preferentialBarColor,
            "红包": commonStyle.preferentialBarColor
        }
        let { activities } = this.state.data
        if(!activities || !activities.length){
            return null
        }else{
            return (
                <View style={{
                    flexDirection: "row",
                    top: 0,
                    bottom: 5,
                    left:5,
                    marginRight: 10,
                    // backgroundColor: commonStyle.red,
                }}>
                    <Animated.View style={[styles.actives,
                        {opacity: this.state.activeOpacity}]}>
                        {
                            activities.map((item, i) => {
                                return (
                                    <View key={i}
                                          style={{
                                              flexDirection: "row",
                                              alignItems:"center",
                                              height: px2dp(18),
                                              width: width/2,
                                              backgroundColor: commonStyle.white
                                          }}>
                                        <Text style={{
                                            fontSize: px2dp(11),
                                            color: commonStyle.white,
                                            backgroundColor: color[item.key] ||
                                                commonStyle.preferentialBarColor,
                                            paddingHorizontal: 1,
                                            paddingVertical: 1}}>
                                            {item.key}
                                        </Text>
                                        <Text numberOfLines={1}
                                              style={{
                                                  fontSize: px2dp(11),
                                                  marginLeft:3,
                                                  color: commonStyle.black,
                                                  // backgroundColor:commonStyle.red
                                              }}
                                        >
                                            {item.text}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </Animated.View>
                    <Heading2 style={{
                        color: commonStyle.black,
                        fontSize:12,
                        left:40,
                        top:13
                    }}>
                        6个活动
                    </Heading2>
                    <TouchableOpacity  onPress={() => this.morePreferential()}>
                        <Image source={LocalImg.star1}
                               style={styles.morePreferential}>
                        </Image>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    morePreferential() {
        Alert.alert("点击了按钮");
    }

    render(){
        let { data } = this.state
        let props = Platform.OS === 'ios'?{
            blurType: "light",
            blurAmount: 25
        }:{
            viewRef: this.state.viewRef,
            downsampleFactor: 10,
            overlayColor: commonStyle.white
        }
        return (
            <View style={{
                flex: 1,
                backgroundColor: commonStyle.white
            }}>
                <ImageBackground source={LocalImg.mine_header_bg_icon}
                                 style={styles.bg}>
                    {/*<BlurView {...props} style={styles.blur}/>*/}
                </ImageBackground>
                <View style={styles.head}>
                    <Animated.View style={{
                        flexDirection: "row",
                        paddingHorizontal: 16,
                        opacity: this.state.headOpacity
                    }}>
                        <View style={{
                            flex: 1,
                            marginTop: 10,
                        }}>

                            <Text style={{color: commonStyle.textBlockColor}}>
                                {data.name}
                            </Text>
                            <View style={{
                                flexDirection: "row",
                                paddingTop: 8,
                                paddingBottom: 18
                            }}>
                                {data.fengniao?(<Text style={[
                                    styles.label2,
                                    {marginRight: 5
                                    }]}>
                                    {"蜂鸟专送"}
                                </Text>):null}
                                <Text style={{
                                    color: commonStyle.textGrayColor,
                                    fontSize: px2dp(12)
                                }}>
                                    {`${data.time}送达`}
                                </Text>
                            </View>
                            <Text style={{
                                color: commonStyle.textBlockColor,
                                fontSize: px2dp(12)
                            }}
                                  numberOfLines={1}
                            >
                                {data.bulletin}
                            </Text>
                        </View>
                        <Image source={LocalImg.mine_personal_info_icon}
                               style={styles.logo}
                        />

                    </Animated.View>
                    {this.renderActivities()}
                </View>
                {this.renderGoods()}

                <NavBar
                    title={data.name}
                    titleStyle={{opacity: this.state.titleOpacity}}
                    style={{
                        backgroundColor: "transparent",
                        position:"absolute",
                        top:0, width
                    }}
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                    rightIcon="ios-more"
                    rightPress={()=>{}}
                />
                <ShopBar ref={"shopBar"}
                         list={this.state.selected}
                         lens={this.state.lens}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyle.white,
    },
    head:{
        position: "absolute",
        left: 15,
        right: 15,
        width: width - 30,
        height: 140,
        top: 64,
        borderRadius:15,
        backgroundColor: commonStyle.white
    },
    bg:{
        width: width,
        height: height/3,
        resizeMode: "cover"
    },
    blur: {
        position: "absolute",
        left:0,
        right:0,
        top:0,
        width,
        height: width,
    },
    logo: {
        top: 5,
        right: 5,
        width: px2dp(80),
        height: px2dp(80),
        resizeMode: "cover"
    },
    label2: {
        fontSize: 10,
        color: commonStyle.white,
        backgroundColor: commonStyle.primary,
        textAlign: "center",
        paddingHorizontal: 2,
        paddingVertical: 1
    },
    actives: {
        paddingTop: 4,
        marginTop: 8,
        paddingHorizontal: 16,
        backgroundColor: commonStyle.white
    },
    topView: {
        position: "absolute",
        width: width,
        bottom: 0,
        left: 0,
        right: 0
    },
    tmpBtn: {
        backgroundColor: "transparent",
        position: "absolute",
        right: 4,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    morePreferential: {
        left:40,
        top: 10,
        width: 20,
        height: 20
    }
})

export default BusinessDetails
