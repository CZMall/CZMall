/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *
 * @flow
 */


import React, { PureComponent } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    SectionList,
    Alert,Dimensions
} from 'react-native'
import api from '../../api'
import { ListItem,Icon,Button} from 'react-native-elements';
import {commonStyle} from '../../widget/commonStyle'
import {
    SpacingView,
} from '../../widget';
const {height,width} =  Dimensions.get('window');
import LocalImg from '../../common/commonImages';
import {LoginIcon,Cart} from "../../common/image/Image";

class CartScene extends PureComponent {
    constructor(props) {
        super(props)
        this.renderItem = this.renderItem.bind(this)
        this.renderSectionHeader = this.renderSectionHeader.bind(this)
        this.state = {
            status: [],
            isSelectedAllItem: false,
            totalNum: 0,
            totalPrice: 0.00
        }
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '购物车',
        headerStyle:{
            backgroundColor:'#5FA9FF'
        },
        headerTitleStyle:{
            flex:1,
            textAlign: 'center',
            fontSize:16,
            color:'#fff',
        }
    })
    componentWillMount() {
        let dataArr = api.shopCart
        let tempStatusArr = []
        for (let i = 0; i < dataArr.length; i++) {
            let items = dataArr[i].shopItems
            let shopObj = {}
            shopObj.checked = false
            let tempItems = []
            for (let j = 0; j < items.length; j++) {
                let item = items[j]
                item.checked = false
                item.quantity = item.minQuantity
                tempItems.push(item)
            }
            shopObj.items = tempItems
            tempStatusArr.push(shopObj)
        }
        this.state.status = tempStatusArr
        console.log(this.state.status)
    }

    componentDidMount() {
        // 网络请求获取购物车数据
    }

    checkItem(sectionIndex, index) {
        let tempStatus = this.state.status
        let tempShop = tempStatus[sectionIndex]
        let tempShopItems = tempStatus[sectionIndex].items
        let item = tempShopItems[index]
        item.checked = !item.checked

        let isSelectedAllShopItem = true
        for (let j = 0; j < tempShopItems.length; j++) {
            let item = tempShopItems[j]
            if (!item.checked) {
                isSelectedAllShopItem = false
                break
            }
        }
        tempShop.checked = isSelectedAllShopItem

        let isSelectedAllShop = true
        for (let k = 0; k < tempStatus.length; k ++) {
            let shop = tempStatus[k]
            if (!shop.checked) {
                isSelectedAllShop = false
                break
            }
        }

        this.calculateCountAndPrice()
        this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
    }

    checkedShop(index) {
        let tempStatus = this.state.status
        let shop = tempStatus[index]
        shop.checked = !shop.checked
        let items = shop.items
        for (let j = 0; j < items.length; j++) {
            let item = items[j]
            item.checked = shop.checked
        }

        let isSelectedAllShop = true
        for (let j = 0; j < tempStatus.length; j++) {
            let shop = tempStatus[j]
            if (!shop.checked) {
                isSelectedAllShop = false
                break
            }
        }

        this.calculateCountAndPrice()
        this.setState({isSelectedAllItem: isSelectedAllShop, status: tempStatus})
    }

    checkAllShop() {
        let tempSelectedAllItem = !this.state.isSelectedAllItem
        let tempStatus = this.state.status
        for (let i = 0; i < tempStatus.length; i++) {
            let shop = tempStatus[i]
            shop.checked = tempSelectedAllItem
            let items = shop.items
            for (let j = 0; j < items.length; j++) {
                let item = items[j]
                item.checked = tempSelectedAllItem
            }
        }

        this.calculateCountAndPrice()
        this.setState({isSelectedAllItem: tempSelectedAllItem, status: tempStatus})
    }

    minus(sectionIndex, index) {
        let tempStatus = this.state.status
        let shop = tempStatus[sectionIndex]
        let items = shop.items
        let item = items[index]
        if (item.quantity <= item.minQuantity) {
            alert('商品购买数量不能小于:'+item.minQuantity)
        } else {
            item.quantity -= 1
        }

        if (item.checked) {
            this.calculateCountAndPrice()
        }
        this.setState({status: tempStatus})
    }

    add(sectionIndex, index) {
        let tempStatus = this.state.status
        let shop = tempStatus[sectionIndex]
        let items = shop.items
        let item = items[index]
        if (item.quantity >= item.maxQuantity) {
            alert('商品购买数量不能大于:'+item.maxQuantity)
        } else {
            item.quantity += 1
        }
        if (item.checked) {
            this.calculateCountAndPrice()
        }
        this.setState({status: tempStatus})
    }

    calculateCountAndPrice() {
        let tempTotalNum = 0
        let tempTotalPrice = 0
        let tempStatus = this.state.status
        for (let i = 0; i < tempStatus.length; i ++) {
            let shop = tempStatus[i]
            let items = shop.items
            for (let j = 0; j < items.length; j++) {
                let item = items[j]
                if (item.checked) {
                    tempTotalNum += 1
                    tempTotalPrice += item.itemPrice * item.quantity
                }
            }
        }
        this.setState({totalNum: tempTotalNum, totalPrice: tempTotalPrice})
    }

    renderItem = info => {
        let item = info.item
        let index = info.index
        let sectionIndex = info.section.index
        let shop = this.state.status[sectionIndex]
        let statusItem = shop.items[index]
        return (
            <View style={styles.cellStyle}>
                <TouchableOpacity onPress={() => this.checkItem(sectionIndex, index)}>
                    <Image style={styles.checkBox}
                           source={statusItem.checked ?
                               LocalImg.cart_default_icon:
                               LocalImg.cart_selected_icon}
                           resizeMode={'center'}/>
                </TouchableOpacity>
                <Image style={{width: 44, height: 44}}
                       source={Cart.good}
                />
                <View style={{
                    justifyContent: commonStyle.around,
                    flex: 1,
                    marginHorizontal: 10,
                    height: 50
                }}>
                    <Text style={{
                        fontSize: 13,
                        color: commonStyle.textBlockColor
                    }}>
                        {item.itemName}
                    </Text>
                    <Text style={{
                        fontSize: 13,
                        color: commonStyle.textBlockColor
                    }}>
                        {`￥${item.itemPrice}`}
                    </Text>
                </View>
                <View style={{
                    flexDirection: commonStyle.row,
                    alignItems: commonStyle.center,
                }}>
                    <Text>￥588.8</Text>
                </View>
            </View>
        )
    }

    renderSectionHeader = info => {
        let section = info.section.key
        let index = info.section.index
        let shop = this.state.status[index]
        return (
            <ListItem
                containerStyle={styles.sectionHeader}
                contentContainerStyle={{height:60}}
                title={
                    <View style={{marginLeft:-20}}>
                        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => this.checkedShop(index)}>
                            <Image style={styles.checkBox}
                                   source={shop.checked ?
                                       LocalImg.cart_selected_icon :
                                       LocalImg.cart_default_icon}
                                   resizeMode={'center'}
                            />
                            <View style={{height:40,justifyContent:'center',alignItems:'center'}}>
                                <Text style={styles.textStyle}>怡康药店(高新三路店)</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                }
                subtitle={<View style={{marginLeft:20}}>
                    <Text style={{fontSize:10,color:'red'}}>满38减7 满38减7 满38减7</Text>
                </View>}
                rightTitle={<View style={{borderWidth:1,borderColor:'#6FB1FF',borderRadius:3}}>
                    <Text style={{fontSize:12,color:'#6FB1FF'}}>接受预定中</Text>
                </View>}
                bottomDivider
            />

        )
    }
    footerComponent=()=>{
        return(
            <View style={styles.footerStyle}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.text}>包装费</Text>
                    <Text style={styles.text}>￥2元</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.text}>配送费</Text>
                    <Text style={styles.text}>￥2元</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginBottom:10}}>
                    <View>
                        <Text style={styles.text}>已优惠17元</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={ {justifyContent:'center',alignItems:'center',height:30,borderBottomLeftRadius:35,borderTopLeftRadius:35,backgroundColor:'#f8f8f8',width:70}}>
                            <Text style={{color:'#6FB1FF',fontSize:15}} >￥47.8</Text>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('SubmitOrder')}
                            style={ {justifyContent:'center',alignItems:'center',height:30,borderBottomRightRadius:35,borderTopRightRadius:35,backgroundColor:'#6FB1FF',width:70}}>
                            <Text style={{color:'#f8f8f8',fontSize:15}} >结算</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        let tempArr = api.shopCart.map((item, index) => {
            let tempData = {}
            tempData.key = item.shopName
            tempData.index = index
            tempData.data = item.shopItems
            return tempData
        })
        return (
            <View style={styles.container}>
                <SectionList
                    renderSectionHeader={this.renderSectionHeader}
                    renderItem={this.renderItem}
                    sections={tempArr}
                    renderSectionFooter={this.footerComponent}
                />
            </View>
        )
    }

    //结算购物车
    settlementPrice() {
        Alert.alert(
            '',
            '处方需要有处方证明',
            [
                {text: '上传处方', onPress: () => this.props.navigation.navigate('UploadRecipe')},
                {text: '找医生开药', onPress: () => this.props.navigation.navigate('FillOrder')},
            ],
            { cancelable: false }
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginLeft:15,
        marginRight:15
    },
    navBar: {
        height: commonStyle.navHeight,
        alignItems: commonStyle.center,
        justifyContent: commonStyle.center,
        borderBottomWidth: commonStyle.lineWidth,
        borderBottomColor: commonStyle.lineColor
    },text:{
        fontSize:14,
        color:'#333333'
    },
    textStyle:{
        fontSize:16,
        color:'#000'
    },
    cellStyle: {
        backgroundColor:commonStyle.white,
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center,
        paddingVertical: 10,
        // borderBottomWidth: 5,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#f8f8f8',
    },
    footerStyle: {
        backgroundColor:commonStyle.white,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderBottomWidth:1,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderColor:'#f8f8f8',
        paddingLeft:30
    },
    sectionHeader: {
        height:60,
        backgroundColor:'#f8f8f8',
        marginTop:15,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderTopWidth:1,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderColor:'#f8f8f8'
    },
    checkBox: {
        width: 40,
        height: 40,
    },
    toolBar: {
        height: commonStyle.cellHeight,
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center
    }
})

export default CartScene
