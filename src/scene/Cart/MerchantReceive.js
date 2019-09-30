/**
 * Created by zhangbo on 2019/9/24.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView
} from 'react-native';
import {ListItem, Button, Icon, Image} from 'react-native-elements';
import {LoginIcon} from "../../common/image/Image";

const {height, width} = Dimensions.get('window');
export default class MerchantReceive extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '商家已经接单',
        headerStyle:{
            backgroundColor:'#5FA9FF'
        },
        headerTitleStyle:{
            flex:1,
            fontSize:16,
            color:'#fff',
        }
    })
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{borderColor:'#f8f8f8',borderWidth:1,borderRadius:5,marginBottom:10}}>
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
                <View style={{borderWidth:1,borderColor:'#f8f8f8',borderRadius:5,marginBottom:10,}}>
                    <ListItem
                        containerStyle={{height:10,backgroundColor:'#fff'}}
                        title="配送信息"
                        titleStyle={{fontSize:13}}
                        bottomDivider
                    />
                    <ListItem
                        containerStyle={{height:20,backgroundColor:'#fff'}}
                        title="备注"
                        titleStyle={{fontSize:10}}
                        rightTitle='偏好、其他要求'
                        rightTitleStyle={{fontSize:10,}}
                    />
                    <ListItem
                        containerStyle={{height:20,backgroundColor:'#fff',marginTop:-10}}
                        title="发票"
                        titleStyle={{fontSize:10,lineHeight:20}}
                        rightTitle='请联系商家开发票'
                        rightTitleStyle={{fontSize:10,}}
                    />
                    <ListItem
                        containerStyle={{height:20,backgroundColor:'#fff',marginTop:-10}}
                        title="支付方式"
                        titleStyle={{fontSize:10}}
                        rightTitle='在线支付'
                        rightTitleStyle={{fontSize:10}}
                    />
                </View>
                <View style={{borderWidth:1,borderColor:'#f8f8f8',borderRadius:5,marginBottom:10,}}>
                    <ListItem
                        containerStyle={{height:10,backgroundColor:'#fff'}}
                        title="订单信息"
                        titleStyle={{fontSize:13}}
                        bottomDivider
                    />
                    <ListItem
                        containerStyle={{height:10,backgroundColor:'#fff',}}
                        title="备注"
                        titleStyle={{fontSize:10}}
                        rightTitle='偏好、其他要求'
                        rightTitleStyle={{fontSize:10,}}
                    />
                    <ListItem
                        containerStyle={{height:20,backgroundColor:'#fff',marginTop:-10}}
                        title="发票"
                        titleStyle={{fontSize:10,lineHeight:20}}
                        rightTitle='请联系商家开发票'
                        rightTitleStyle={{fontSize:10,}}
                    />
                    <ListItem
                        containerStyle={{height:20,backgroundColor:'#fff',marginTop:-10}}
                        title="支付方式"
                        titleStyle={{fontSize:10}}
                        rightTitle='在线支付'
                        rightTitleStyle={{fontSize:10}}
                    />
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:15,
    },
});
