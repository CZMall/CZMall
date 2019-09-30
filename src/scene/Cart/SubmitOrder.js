/**
 * Created by zhangbo on 2019/9/23.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import { ListItem,Button,Icon,Image} from 'react-native-elements';
const {height,width} =  Dimensions.get('window');
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {LoginIcon,Cart} from "../../common/image/Image";
export default class SubmitOrder extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '提交订单',
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
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <ScrollableTabView
                style={styles.container}
                renderTabBar={() => <DefaultTabBar tabStyle={{borderWidth:1,borderColor:'#fff',backgroundColor:'#f8f8f8'}} underlineStyle={{width:0,height:0}}/>}
                tabBarInactiveTextColor='#999999'
                tabBarActiveTextColor='rgba(95, 169, 255, 1)'>
                <View tabLabel='外卖配送' style={{flex:1}}>
                    <ScrollView style={{flex:1}}>
                    <View style={{borderLeftWidth:1,borderRight:1,borderBottomWidth:1,borderColor:'#f8f8f8',marginBottom:10}}>
                    <ListItem
                        containerStyle={{height:40,backgroundColor:'#fff',marginTop:5}}
                        contentContainerStyle={{height:30}}
                        title='高新三路停车场'
                        titleStyle={{fontSize:16,color:'#000'}}
                        subtitle='高女士 17632312312'
                        subtitleStyle={{fontSize:11,color:'#666666'}}
                        rightTitle={<Icon name='right'size={10} type='antdesign' color='#DCDCDC'/>}
                    />
                    <ListItem
                        title="立即送出"
                        titleStyle={{fontSize:13}}
                        rightTitle={<Text style={{fontSize:13,marginRight:-10,color:'#5FA9FF'}}>预计12:00到达</Text>}
                        rightIcon={<Icon name='right' size={10} type='antdesign' color='#DCDCDC'/>}
                        containerStyle={{backgroundColor:'#fff',marginTop:5,marginBottom:5,height:40}}
                        rightTitleStyle={{color:'red'}}
                    />
                    </View>
                    <View style={{borderColor:'#f8f8f8',borderWidth:1,borderRadius:5}}>
                        <ListItem
                            containerStyle={{height:40,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:30}}
                            title="怡康药房>"
                            titleStyle={{fontSize:16,color:'#000'}}
                            rightTitle={<View style={{borderWidth:1,borderColor:'#666666',borderRadius:3}}>
                                <Text style={{fontSize:10,color:'#666666'}}>同城快药专送</Text>
                            </View>}
                            bottomDivider
                        />
                        <ListItem
                            containerStyle={{height:40,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:30}}
                            leftAvatar={{size:"small", source: Cart.good}}
                            title="阿莫西林胶囊"
                            titleStyle={{fontSize:14,color:'#000'}}
                            rightTitle='X1'
                            rightElement={<View><Text style={{fontSize:14,color:'#000'}}>￥58</Text></View>}
                            rightTitleStyle={{fontSize:14,marginRight:30,color:'#000'}}
                        />
                        <ListItem
                            containerStyle={{height:20,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:20}}
                            title={<View style={{flexDirection:'row'}}><Text style={{fontSize:10,color:"#5FA9FF",lineHeight:20}}>包装费</Text><Text style={{fontSize:12,lineHeight:20}}>  纸袋</Text></View>}
                            rightTitle='￥2'
                            rightTitleStyle={{fontSize:12}}
                        />
                        <ListItem
                            containerStyle={{height:20,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:20}}
                            title={<View style={{flexDirection:'row'}}><Text style={{fontSize:10,color:"#5FA9FF",lineHeight:20}}>配送费</Text><Text style={{fontSize:12,lineHeight:20}}>  商家配送</Text></View>}
                            rightTitle='￥4'
                            rightTitleStyle={{fontSize:12}}
                        />
                        <ListItem
                            containerStyle={{height:20,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:20}}
                            title={<View style={{flexDirection:'row'}}><Text style={{fontSize:10,color:"#FF6662",lineHeight:20}}>满减</Text><Text style={{fontSize:12,lineHeight:20}}>  在线支付立减</Text></View>}
                            rightTitle='￥7'
                            rightTitleStyle={{fontSize:12}}
                        />
                        <ListItem
                            containerStyle={{height:40,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:30}}
                            leftIcon={<Icon name='phone' size={12} type='antdesign' color='#5FA9FF'/>}
                            title="联系商家"
                            titleStyle={{fontSize:12}}
                            rightTitle='实付：47'
                            rightTitleStyle={{fontSize:12}}
                        />
                    </View>
                    <View style={{borderColor:'#f8f8f8',borderWidth:1,borderRadius:5,marginTop:10}}>
                        <ListItem
                            containerStyle={{height:30,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:20}}
                            title="备注"
                            titleStyle={{fontSize:12}}
                            rightTitle='偏好、其他要求'
                            rightTitleStyle={{fontSize:12,marginRight:-10}}
                            rightIcon={<View style={{height:20}}><Icon name='right' size={10} type='antdesign' color='#DCDCDC'/></View>}
                        />
                        <ListItem
                            containerStyle={{height:30,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:20}}
                            title="发票"
                            titleStyle={{fontSize:12,lineHeight:20}}
                            rightTitle='请联系商家开发票'
                            rightTitleStyle={{fontSize:12,marginRight:-10}}

                            rightIcon={<View style={{height:20}}><Icon name='right' size={10} type='antdesign' color='#DCDCDC'/></View>}
                        />
                        <ListItem
                            containerStyle={{height:30,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:20}}
                            title="支付方式"
                            titleStyle={{fontSize:12}}
                            rightTitle='在线支付'
                            rightTitleStyle={{fontSize:12}}
                        />
                    </View>
                    </ScrollView>
                    <View style={{flexDirection:'row',}}>
                        <View style={ {justifyContent:'center',alignItems:'center',height:30,borderBottomLeftRadius:35,borderTopLeftRadius:35,backgroundColor:'#282E38',width:width/3-15}}>
                            <Text style={{color:'#6FB1FF'}} >已优惠￥47.8</Text>
                        </View>
                        <View style={ {justifyContent:'center',alignItems:'center',height:30,backgroundColor:'#282E38',width:width/3}}>
                            <Text style={{color:'#6FB1FF'}} >合计￥47.8</Text>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Payway')}
                            style={ {justifyContent:'center',alignItems:'center',height:30,borderBottomRightRadius:35,borderTopRightRadius:35,backgroundColor:'#6FB1FF',width:width/3-15}}>
                            <Text style={{color:'#f8f8f8'}} >提交订单</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View tabLabel='到店自提' style={{flex:1}}>
                    <ScrollView style={{flex:1}}>
                        <View style={{borderLeftWidth:1,borderRight:1,borderBottomWidth:1,borderColor:'#f8f8f8',marginBottom:10}}>
                            <ListItem
                                containerStyle={{height:40,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:30}}
                                title='陕西省西安市高新区高新三路财富中心二期B座 2811'
                                titleStyle={{fontSize:14}}
                                rightTitle={<Icon name='right'size={13} type='antdesign'/>}
                            />
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Image
                                    source={LoginIcon.map}
                                    style={{ width: width-60, height: 80,resizeMode:'contain'}}/>
                            </View>
                            <ListItem
                                containerStyle={{height:40,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:30,}}
                                title='自取时间'
                                subtitle='12:00'
                                rightTitle='预留电话'
                                rightSubtitle='12345678912'
                                titleStyle={{fontSize:12,marginLeft:30}}
                                rightTitleStyle={{fontSize:12,marginRight:30}}
                                rightSubtitleStyle={{fontSize:12,marginRight:30}}
                                subtitleStyle={{fontSize:12,marginLeft:30}}
                            />
                        </View>
                        <View style={{borderColor:'#f8f8f8',borderWidth:1,borderRadius:5}}>
                            <ListItem
                                containerStyle={{height:40,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:30}}
                                title="怡康药房>"
                                titleStyle={{fontSize:15}}
                                rightTitle={<View style={{borderWidth:1,borderColor:'#666666',borderRadius:3}}>
                                    <Text style={{fontSize:10,color:'#666666'}}>同城快药专送</Text>
                                </View>}
                                bottomDivider
                            />
                            <ListItem
                                containerStyle={{height:40,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:30}}
                                leftAvatar={{size:"small", source: LoginIcon.wechat}}
                                title="阿莫西林胶囊"
                                titleStyle={{fontSize:12}}
                                rightTitle='X1'
                                rightElement={<View><Text>￥58</Text></View>}
                                rightTitleStyle={{fontSize:12,marginRight:30}}
                            />
                            <ListItem
                                containerStyle={{height:20,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:20}}
                                title={<View style={{flexDirection:'row'}}><Text style={{fontSize:8,color:"#5FA9FF",lineHeight:20}}>包装费</Text><Text style={{fontSize:12,lineHeight:20}}>  纸袋</Text></View>}
                                rightTitle='￥2'
                                rightTitleStyle={{fontSize:12}}
                            />
                            <ListItem
                                containerStyle={{height:20,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:20}}
                                title={<View style={{flexDirection:'row'}}><Text style={{fontSize:8,color:"#5FA9FF",lineHeight:20}}>配送费</Text><Text style={{fontSize:12,lineHeight:20}}>  商家配送</Text></View>}
                                rightTitle='￥4'
                                rightTitleStyle={{fontSize:12}}
                            />
                            <ListItem
                                containerStyle={{height:20,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:20}}
                                title={<View style={{flexDirection:'row'}}><Text style={{fontSize:8,color:"#FF6662",lineHeight:20}}>满减</Text><Text style={{fontSize:12,lineHeight:20}}>  在线支付立减</Text></View>}
                                rightTitle='￥7'
                                rightTitleStyle={{fontSize:12}}
                            />
                            <ListItem
                                containerStyle={{height:40,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:30}}
                                leftIcon={<Icon name='phone' size={12} type='antdesign' color='#5FA9FF'/>}
                                title="联系商家"
                                titleStyle={{fontSize:12}}
                                rightTitle='实付：47'
                                rightTitleStyle={{fontSize:12}}
                            />
                        </View>
                        <View style={{borderColor:'#f8f8f8',borderWidth:1,borderRadius:5,marginTop:10}}>
                            <ListItem
                                containerStyle={{height:30,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:20}}
                                title="备注"
                                titleStyle={{fontSize:12}}
                                rightTitle='偏好、其他要求'
                                rightTitleStyle={{fontSize:12,marginRight:-10}}
                                rightIcon={<View style={{height:20}}><Icon name='right' size={10} type='antdesign' color='#DCDCDC'/></View>}
                            />
                            <ListItem
                                containerStyle={{height:30,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:20}}
                                title="发票"
                                titleStyle={{fontSize:12,lineHeight:20}}
                                rightTitle='请联系商家开发票'
                                rightTitleStyle={{fontSize:12,marginRight:-10}}

                                rightIcon={<View style={{height:20}}><Icon name='right' size={10} type='antdesign' color='#DCDCDC'/></View>}
                            />
                            <ListItem
                                containerStyle={{height:30,backgroundColor:'#fff'}}
                                contentContainerStyle={{height:20}}
                                title="支付方式"
                                titleStyle={{fontSize:12}}
                                rightTitle='在线支付'
                                rightTitleStyle={{fontSize:12}}
                            />
                        </View>
                    </ScrollView>
                    <View style={{flexDirection:'row',}}>
                        <View style={ {justifyContent:'center',alignItems:'center',height:30,borderBottomLeftRadius:35,borderTopLeftRadius:35,backgroundColor:'#282E38',width:width/3-15}}>
                            <Text style={{color:'#6FB1FF'}} >已优惠￥47.8</Text>
                        </View>
                        <View style={ {justifyContent:'center',alignItems:'center',height:30,backgroundColor:'#282E38',width:width/3}}>
                            <Text style={{color:'#6FB1FF'}} >合计￥47.8</Text>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('SubmitOrder')}
                            style={ {justifyContent:'center',alignItems:'center',height:30,borderBottomRightRadius:35,borderTopRightRadius:35,backgroundColor:'#6FB1FF',width:width/3-15}}>
                            <Text style={{color:'#f8f8f8'}} >提交订单</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollableTabView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:10,
        backgroundColor:'#fff'
    },
});
