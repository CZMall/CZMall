/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *  data:2019.09.18
 *
 * 商品详情页
 *
 * @flow
 */

import React, {
    PureComponent
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert
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
    Separator,
    DetailCell,
    PharmacyCell
} from '../../widget';

import Swiper from 'react-native-swiper';
import RefreshListView, {
    RefreshState
} from "react-native-refresh-list-view";
import {
    commonStyle
} from '../../widget/commonStyle';

import api from "../../api";
import ClassificationCell from "../Classification/ClassificationCell";
import LocalImg from "../../common/commonImages";
import ShopBar from "../../common/ShopBar";

let {width, height} = Dimensions.get('window')

type Props = {
    navigation: any,
}

type State = {
    data: Array<Object>,
    refreshState: number,
}

class GoodsDetails extends PureComponent<Props, State> {
    _buttonRefs: [] = [];

    static navigationOptions = ({ navigation }: any) => ({
        headerTitle: (
            <Text style={{
                color: commonStyle.white,
                fontSize: 19,
                textAlign: 'center',
            }}>
                详情
            </Text>
        ),
        headerStyle: { backgroundColor: commonStyle.blue },
        headerTintColor: commonStyle.white
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            selected: [],
            lens: {},
            data: [],
            refreshState: RefreshState.Idle,
        }

        for (let s = 0; s < api.instructions.length; ++s) {
            const refs = [];
            for (let r = 0; r < api.instructions[s].items.length; ++r) {
                refs.push(React.createRef());
            }
            this._buttonRefs.push(refs);
        }
    }

    componentDidMount() {
        // this.requestData()
    }

    requestData = async () => {
        try {
            this.setState({ refreshState: RefreshState.HeaderRefreshing })

            let response = await fetch(api.instructions)
            let json = await response.json()

            console.log(JSON.stringify(json))

            let dataList = json.data.map((info) => {
                return {
                    id: info.id,
                    imageUrl: info.squareimgurl,
                    title: info.mname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            })

            // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
            dataList.sort(() => { return 0.5 - Math.random() })

            this.setState({
                data: dataList,
                refreshState: RefreshState.NoMoreData,
            })
        } catch (error) {
            this.setState({
                refreshState: RefreshState.Failure,
            })
        }
    }

    keyExtractor = (item: Object, index: number) => {
        return item.id.toString()
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.data}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                    keyExtractor={this.keyExtractor}
                    refreshState={this.state.refreshState}
                    // onHeaderRefresh={this.requestData}
                />
                <ShopBar
                    list={this.state.selected}
                    lens={this.state.lens}
                />
            </View>
        )
    }

    renderHeader = () => {
        let instruction = api.instructions[0].items[0]
        return (
            <View style={styles.container}>
                {/*设置horizontal为竖向排列 autoplay为自动播放*/}
                <Swiper style={styles.wrapper}
                        height={246}
                        horizontal={true}
                        autoplay autoplayTimeout={3}
                        dot={
                            <View style={styles.shufflingDotViewStyle} />
                        }
                        activeDot={<View style={styles.shufflingActiveDotViewStyle} />}
                        loop>
                    <View style={styles.slide} >
                        <Image
                            resizeMode='stretch'
                            style={styles.image}
                            source={LocalImg.home_bg_icon}
                        />
                    </View>
                    <View style={styles.slide}>
                        <Image
                            resizeMode='stretch'
                            style={styles.image}
                            source={LocalImg.home_bg_icon}
                        />
                    </View>
                    <View style={styles.slide} >
                        <Image
                            resizeMode='stretch'
                            style={styles.image}
                            source={LocalImg.home_bg_icon}
                        />
                    </View>
                    <View style={styles.slide}>
                        <Image
                            resizeMode='stretch'
                            style={styles.image}
                            source={LocalImg.home_bg_icon}
                        />
                    </View>
                </Swiper>
                <View style={styles.titleView}>
                    <View style={{
                        marginLeft: 10
                    }}>
                        <View style={{
                            marginTop: 16,
                        }}>
                            <Heading2>
                                [999]感冒灵颗粒10g*9袋
                            </Heading2>
                            <Text style={styles.titleTextStyle}>
                                {instruction.specificationsNumber}
                            </Text>
                        </View>
                        <View style={styles.viewStyle}>
                            <Text style={styles.salesTextStyle}>
                                月销 87
                            </Text>
                            <Text style={styles.salesTextRemainingStyle}>
                                仅剩 7份
                            </Text>
                        </View>
                        <View style={styles.viewStyle}>
                            <Text style={styles.priceTextStyle}>
                                ¥13.35
                            </Text>
                            <Text style={styles.originalPriceTextStyle}>
                                ¥22.00
                            </Text>
                        </View>
                        <View style={styles.viewStyle}>
                            <Image source={LocalImg.discount_icon}
                                   style={{width: 14, height: 14}}
                            />
                            <Text style={styles.discountTextStyle}>
                                6.2折 每单限一份优惠
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        marginRight: 10,
                    }}>
                        <View style={styles.otcViewStyle}>
                            <Image source={LocalImg.OTC_green_icon}
                                   style={styles.otcImageStyle}
                            />
                        </View>
                        <View style={styles.shopCartViewStyle}>
                            <TouchableOpacity onPress={() => this.addCartClicked()}>
                                <View style={styles.shopCartBtnStyle}>
                                    <Image source={LocalImg.add_to_icon}
                                           style={{
                                               marginTop: 8,
                                           }}
                                    />
                                    <Text style={{
                                        marginTop: 8,
                                        textAlign: 'center',
                                        color: commonStyle.white,
                                        height: 12,
                                        fontSize: 12,
                                    }}>
                                        加入购物车
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.serviceViewStyle}>
                    <Text style={styles.serviceTextStyle}>
                        服务
                    </Text>
                    <Text style={styles.serviceMessageStyle}>
                        同城快药转送·支持自取·开发票
                    </Text>
                </View>
                <SpacingView />
                <View style={styles.goodsDetailsStyle}>
                    <Text style={{
                        marginTop: 15,
                        fontSize: 15,
                        color: commonStyle.black
                    }}>
                        商品详情
                    </Text>
                    <Text style={styles.goodsDetailTextStyle}>
                        {instruction.indications}
                    </Text>
                </View>
                <SpacingView />
                <View style={styles.instructionsStyle}>
                    <Text style={{
                        marginTop: 15,
                        fontSize: 15,
                        color: commonStyle.black
                    }}>
                        {instruction.instructionsTitle}
                    </Text>
                    <Text style={{
                        marginTop: 15,
                        fontSize: 13,
                        color: commonStyle.textBlankColor
                    }}>
                        {instruction.genericNames}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.medicineName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.companyName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.approvalTitle}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.approvalNumber}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.apply}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.indications}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.specifications}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.specificationsNumber}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.ingredients}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.ingredientsName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.usages}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.usagesName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.reaction}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.reactionName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.taboo}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.tabooName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.needingAttention}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.needingAttentionName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.interact}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.interactName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.character}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.characterName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.packaging}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.packagingName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.dosageForm}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.dosageFormName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.storage}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.storageName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.validity}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.validityName}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.warmPrompt}
                    </Text>
                    <Text style={styles.textContainer}>
                        {instruction.warmPromptName}
                    </Text>
                </View>
            </View>
        )
    }

    addCartClicked() {
        Alert.alert('添加购物车')
    }

    renderCell = (rowData: any) => {
        return (
            <ClassificationCell
                info={rowData.item}
                onPress={() => {
                    StatusBar.setBarStyle('default', false)
                    this.props.navigation.navigate('Classification', { info: rowData.item })
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyle.white,
    },
    itemContainer: {
        flexDirection: 'row',
    },
    image: {
        marginLeft: 5,
        marginRight: 5,
        width:width - 10,
        flex: 1
    },
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: commonStyle.clear
    },
    shufflingDotViewStyle: { //轮播图dot
        backgroundColor:'rgba(0,0,0,.5)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    shufflingActiveDotViewStyle: { //轮播图activeDot
        backgroundColor: commonStyle.red,
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    titleView: { //标题名称
        backgroundColor: commonStyle.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginLeft: 15,
        marginRight: 15,
        width: width - 30,
        height: 130,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: commonStyle.borderColor

    },
    titleTextStyle:{ //药品含量
        marginTop: 6,
        fontSize: 12,
        color: commonStyle.textGrayColor
    },
    viewStyle: { //视图
        marginTop: 8,
        flexDirection: 'row',
    },
    salesTextStyle: { //月销
        color: commonStyle.textBlankColor,
        fontSize: 11
    },
    salesTextRemainingStyle: { //月剩余
        color: commonStyle.textBlankColor,
        marginLeft: 10,
        fontSize: 11
    },
    priceTextStyle: { //优惠价
        color: commonStyle.red,
        fontSize: 11
    },
    originalPriceTextStyle: { //原价
        color: commonStyle.textGrayColor,
        marginLeft: 10,
        marginTop: 5,
        fontSize: 10,
        textDecorationLine: 'line-through'
    },
    discountTextStyle: {//折扣文字
        marginLeft: 5,
        color: commonStyle.red,
        fontSize: 12
    },
    otcViewStyle: {//OTC图片
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    otcImageStyle: { //OTC图片
        marginTop: 5,
        resizeMode:'cover'
    },
    shopCartViewStyle: { //购物车视图
        marginTop: 35,
        width: 120,
        height: 31,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    shopCartBtnStyle: { //购物车按钮
        backgroundColor: commonStyle.blue,
        width: 103,
        height: 31,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    serviceViewStyle: { //服务视图
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 44
    },
    serviceTextStyle: { //服务
        marginTop: 15,
        fontSize: 15,
        color: commonStyle.black
    },
    serviceMessageStyle: { //服务消息
        marginTop: 15,
        marginLeft: 10,
        fontSize: 13,
        color: commonStyle.textBlankColor
    },
    goodsDetailsStyle: { //商品详情
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'flex-start'
    },
    goodsDetailTextStyle: { //商品详情文字
        marginTop: 10,
        fontSize: 13,
        color: commonStyle.textBlankColor,
        flexWrap: 'wrap'
    },
    instructionsStyle: {//说明书
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30,
        justifyContent: 'flex-start'
    },
    textContainer: { //说明书文字
        marginTop: 8,
        fontSize: 13,
        color: commonStyle.textBlankColor,
        fontFamily: "PingFang-SC-Medium",
        lineHeight: 20
    }
})


export default GoodsDetails
