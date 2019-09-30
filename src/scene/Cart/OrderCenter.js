import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import { ListItem,Icon,Button} from 'react-native-elements';
import {LoginIcon} from "../../common/image/Image";
const list = [
    {
        name: '账户金额',
        avatar_url:LoginIcon.wechat,
        subtitle: '平台账户'
    },
    {
        name: '微信支付',
        avatar_url: LoginIcon.wechat,
        subtitle: '微信安全支付'
    },
    {
        name: '支付宝支付',
        avatar_url: LoginIcon.wechat,
        subtitle: '安全快捷'
    },
    {
        name: '银联支付',
        avatar_url: LoginIcon.wechat,
        subtitle: '由银联支付提供服务'
    },
    {
        name: 'paypal',
        avatar_url: LoginIcon.wechat,
        subtitle: '海外支付'
    },
]
export default class OrderCenter extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '收银台',
    })

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                <ListItem
                   title="订单金额"
                   rightTitle="￥78666.00"
                   containerStyle={{backgroundColor:'#fff',marginTop:5,marginBottom:5,height:40}}
                   rightTitleStyle={{color:'red'}}
                />
                {
                    list.map((l, i) => (
                        <ListItem
                            key={i}
                            containerStyle={{height:40,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:30}}
                            leftAvatar={{size:"small", source: l.avatar_url}}
                            title={l.name}
                            titleStyle={{fontSize:12}}
                            subtitle={l.subtitle}
                            subtitleStyle={{fontSize:10,color:'#DCDCDC'}}
                            rightTitle={<Icon name='right' type='antdesign' color='#DCDCDC'/>}
                            bottomDivider
                        />
                    ))
                }
                </View>
                <Button
                    buttonStyle={{height:40,backgroundColor:'#FFA500'}}
                    title="确认支付"
                    onPress={()=>this.props.navigation.navigate('SuccessPay')}
                />
            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#DCDCDC'
    },
});
