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
    Alert,
    ImageBackground,
    Modal,
Dimensions
} from 'react-native'
import api from '../../api'
import { ListItem,Icon,Button} from 'react-native-elements';
import {commonStyle} from '../../widget/commonStyle'
const {height,width} =  Dimensions.get('window');
import {
    SpacingView,
} from '../../widget';
import LocalImg from '../../common/commonImages';
import {Cart, main} from "../../common/image/Image";
class CartScene extends PureComponent {
    constructor(props) {
        super(props)
        this.renderItem = this.renderItem.bind(this)
        this.renderSectionHeader = this.renderSectionHeader.bind(this)
        this.state = {
            status: [],
            isSelectedAllItem: false,
            totalNum: 0,
            totalPrice: 0.00,
            modalVisible:false
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
                <Image style={{width: 80, height: 80}}
                       source={Cart.good}
                />
                <View style={{width:width-150}}>
                    <View style={{
                        marginHorizontal: 10,
                        height: 50
                    }}>
                    <Text numberOfLines={2} style={{
                        fontSize: 13,
                        color: commonStyle.textBlockColor
                    }}>
                        {/*{item.itemName}*/}
                        西安怡康医药有限责任公司成立于2
                        001年及控股公司14家
                    </Text>
                    <Text style={{fontSize:12,color:'#999'}}>全部套装 68块</Text>
                </View>
                <View style={{
                    flexDirection: commonStyle.row,
                    justifyContent:'space-between',
                    alignItems: commonStyle.center,
                    marginHorizontal: 10
                }}>
                    <Text style={{
                        fontSize: 13,
                        color:'#FC4851',
                    }}>
                        {`￥${item.itemPrice}`}
                    </Text>
                    <View style={{flexDirection: commonStyle.row,}}>
                    <TouchableOpacity onPress={() => this.minus(sectionIndex, index)}>
                        <Image source={LocalImg.cart_group_icon}/>
                    </TouchableOpacity>
                    <Text style={{
                        // backgroundColor: commonStyle.bgColor,
                        width: 30,
                        textAlign: 'center',
                        alignItems:'center',
                        justifyContent: 'space-between'
                    }}>
                        {statusItem.quantity}
                    </Text>
                    <TouchableOpacity onPress={() => this.add(sectionIndex, index)}>
                        <Image source={LocalImg.cart_group5_icon}/>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </View>
        )
    }

    renderSectionHeader = info => {
        let section = info.section.key
        let index = info.section.index
        let shop = this.state.status[index]
        return (
            <View style={styles.sectionHeader}>
                <TouchableOpacity onPress={() => this.checkedShop(index)}>
                    <Image style={styles.checkBox}
                           source={shop.checked ?
                               LocalImg.cart_selected_icon :
                               LocalImg.cart_default_icon}
                           resizeMode={'center'}
                    />
                </TouchableOpacity>
                <View  style={{marginRight:5}}>
                <Icon
                    size={18}
                    name='inbox'
                    type='antdesign'
                    color='#666'
                />
                </View>
                <Text style={{
                    color: '#333',
                    fontSize: 16
                }}>
                    {section}
                </Text>
                <Icon
                    size={15}
                    name='right'
                    type='antdesign'
                    color='#666'
                />
            </View>
        )
    }
    setModalVisible=() =>{
        this.setState({ modalVisible: false });
        this.props.navigation.navigate('ExaminationPassed')
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
                    ItemSeparatorComponent={() => <SpacingView/>}
                    ListHeaderComponent={() => <SpacingView/>}
                    ListFooterComponent={() => <SpacingView/>}
                />
                <View style={styles.toolBar}>
                    <View style={{
                        flex: 1,
                        flexDirection: commonStyle.row,
                        alignItems: commonStyle.center
                    }}>
                        <TouchableOpacity onPress={() => this.checkAllShop()}>
                            <Image style={styles.checkBox}
                                   source={this.state.isSelectedAllItem ?
                                       LocalImg.cart_selected_icon :
                                       LocalImg.cart_default_icon}
                                   resizeMode={'center'}
                            />
                        </TouchableOpacity>
                        <Text style={{fontSize:13}}>
                            全选
                        </Text>
                    </View>
                    <Text style={{marginHorizontal: 10,fontSize:13}}>合计:
                        <Text style={{color: commonStyle.red}}>
                            ￥{parseFloat(this.state.totalPrice).toFixed(2)}
                        </Text>
                    </Text>
                    <TouchableOpacity onPress={()=> this.settlementPrice()}>
                        <View style={{
                            width: 75,
                            backgroundColor: commonStyle.red,
                            alignItems: commonStyle.center,
                            justifyContent: commonStyle.center,
                            height: 30,
                            marginRight: 10,
                            marginBottom: 10,
                            borderRadius:15
                        }}>
                            <Text style={{color: commonStyle.white,fontSize:13}}>
                                去结算({this.state.totalNum})
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={()=>{
                    }}
                    onShow={()=>{
                    }}>
                    <View style={{position:'absolute',top:height/6,right:20,zIndex:100}}>
                        <Icon
                            name='close-o'
                            type='evilicon'
                            color='#fff'
                            onPress={() =>  this.setState({ modalVisible: false })}
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>

                        <View style={{height:height/2,width:width-60,backgroundColor:'white',alignItems:'center'}}>

                            <ImageBackground style={{height:177,width:'100%',alignItems:'center',justifyContent:'flex-end'}} source={main.pass} >
                                <View style={{position:'absolute',bottom:0}}>
                                    <Text style={{fontSize:14,color:'#666666'}}>请上传你的处方</Text>
                                </View>
                            </ImageBackground>
                            <Button
                                title='上传处方'
                                titleStyle={{fontSize:18,color:'#fff'}}
                                buttonStyle={{borderRadius:22,height:44,backgroundColor:"#5FA9FF",marginTop:40,width:(width-60)/2,}}
                                onPress={()=>{this.setModalVisible()}}/>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    //结算购物车
    settlementPrice() {
        this.setState({
            modalVisible:true
        })
       /* Alert.alert(
            '',
            '处方需要有处方证明',
            [
                {text: '上传处方', onPress: () => this.props.navigation.navigate('UploadRecipe')},
                {text: '找医生开药', onPress: () => this.props.navigation.navigate('FillOrder')},
            ],
            { cancelable: false }
        )*/
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyle.paper
    },
    navBar: {
        height: commonStyle.navHeight,
        alignItems: commonStyle.center,
        justifyContent: commonStyle.center,
        borderBottomWidth: commonStyle.lineWidth,
        borderBottomColor: commonStyle.lineColor
    },
    cellStyle: {
        backgroundColor:commonStyle.white,
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center,
        paddingVertical: 10,
        // borderBottomWidth: 5,
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    sectionHeader: {
        height: 40,
        flexDirection: commonStyle.row,
        backgroundColor: commonStyle.white,
        alignItems: commonStyle.center,
        marginLeft: 15,
        marginRight: 15,
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
