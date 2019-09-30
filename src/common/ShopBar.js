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
    View,
    Text,
    Easing,
    Animated,
    Image,
    Platform,
    StyleSheet,
    Dimensions, ImageBackground
} from 'react-native'
import LocalImg from "../../src/common/commonImages";
// import Icon from 'react-native-vector-icons/Ionicons'
import px2dp from '../common/index'
import {commonStyle} from '../../src/widget/commonStyle'

let {width} = Dimensions.get('window')

class ShopBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            scale: new Animated.Value(0)
        }
    }
    runAnimate(){
        this.state.scale.setValue(0)
        Animated.timing(this.state.scale, {
            toValue: 2,
            duration: 320,
            easing: Easing.elastic(3)
        }).start()
    }
    render(){
        let { list, lens } = this.props
        return (
            <View style={styles.cartView}>
                <View style={styles.cartBar}>
                    <View style={styles.iconWrap}>
                        <Image
                            source={LocalImg.business_icon}
                            style={styles.merchantsImageStyle}
                        />
                        <Text style={{
                            color: commonStyle.white,
                            fontSize: 11,
                            marginTop: 5
                        }}>
                            联系商家
                        </Text>
                    </View>
                    <ImageBackground
                        source={LocalImg.tcky_icon}
                        style={styles.medicineCityStyle}
                    >
                        <View style={{
                            marginTop: 10,
                            marginLeft: 25,
                            backgroundColor: commonStyle.blue,
                            width: 20,
                            height: 20,
                            borderRadius: 30,
                            borderWidth: 2,
                            overflow: "hidden",
                            borderColor: "#555",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{
                                color: commonStyle.red,
                                textAlign: 'center',
                                fontSize: 11,
                            }}>
                                111
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={{
                        marginLeft: 15,
                        flex: 1,
                        justifyContent:"center",
                    }}>
                        {
                            !lens.maxPrice?
                                (<Text style={{
                                    color: commonStyle.gray,
                                    fontWeight: "bold"
                                }}>
                                    {"购物车为空"}
                                </Text>):
                                [<Text key={0}
                                       style={{
                                           color: commonStyle.red,
                                           fontWeight: "bold",
                                           fontSize: px2dp(16)
                                       }}>
                                    {`￥${lens.maxPrice}`}
                            </Text>,
                                    <Text
                                        key={1}
                                        style={{
                                            color: commonStyle.red,
                                            fontSize: px2dp(10)
                                        }}>
                                        {"另加7元配送费"}
                                    </Text>]
                        }
                    </View>
                    {!lens.maxPrice?
                        <Text style={styles.price}>
                            {"￥6元起"}
                        </Text>:
                        <Text style={[styles.price,
                            {
                                color:commonStyle.white
                            }]}>
                            {"去结算"}
                        </Text>}

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    cartView: {
        position: "absolute",
        flex:1,
        left: 0,
        bottom: 4,
        right: 0,
        width,
        height: px2dp(46)
    },
    count: {
        backgroundColor: commonStyle.red,
        height: px2dp(12),
        borderRadius: 5,
        overflow: "hidden",
        paddingHorizontal: 4,
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0
    },
    iconWrap: {
        left: 16,
        width: px2dp(50),
    },

    cartBar: {
        position: "absolute",
        left: 15,
        bottom: 10,
        right: 15,
        height: px2dp(49),
        borderRadius:30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: commonStyle.tabBarColor
    },
    merchantsImageStyle: {
        marginLeft: 13,
    },
    medicineCityStyle: {
        marginTop: -10,
        marginLeft: 20,
        height:59,
        width: 44
    },
    price: {
        color: commonStyle.lightGray,
        fontWeight: "bold",
        fontSize: px2dp(16),
        paddingHorizontal: 20,
        height:px2dp(46),
        marginRight:5,
        lineHeight: Platform.OS === 'ios'?px2dp(46):32,
    },
    blur: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})

export default ShopBar
