/**
 * Created by zhangbo on 2019/9/23.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
} from 'react-native';
const {height,width} =  Dimensions.get('window');
import { ListItem,Button,Icon,Image,CheckBox} from 'react-native-elements';
import {Cart} from "../../common/image/Image";
const List =[
    {id:0, image:Cart.Alipay,title:'支付宝'},
    {id:1, image:Cart.WeChat,title:'微信'},
    {id:2, image:Cart.yunshanfu,title:'云闪付'},
    {id:3, image:Cart.balance,title:'余额支付'}
]

export default class Payway extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '支付方式',
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
            checked:true,
            index:0,
        }
    }
isActive=async (i)=>{
    await this.setState({checked: !this.state.checked,index:i})
}
    render() {
        return (
            <View style={styles.container}>
                <ListItem
                    title="请选择付款方式"
                    titleStyle={{fontSize:14}}
                />
                {List.map((item,i)=>(
                    <TouchableOpacity
                        key={i}
                        onPress={() => this.isActive(i)}
                        style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox
                        key={i}
                        checkedIcon='check-circle'
                        uncheckedIcon='circle-o'
                        checked={i == this.state.index}
                        onPress={() => this.isActive(i)}

                    />
                        <Image
                            source={item.image}
                            style={{ width: 40, height: 40,resizeMode:'contain'}}/>
                        <View style={{marginLeft:20}}>
                            <Text>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                    )
                )}
                <View style={{alignItems:'center',marginTop:50}}>
                <Button
                    buttonStyle={{height:40,backgroundColor:'#5FA9FFFF',width:width-120,borderRadius:20}}
                    title="确认支付"
                    /*onPress={()=>this.props.navigation.navigate('MerchantReceive')}*/
                    onPress={()=>this.props.navigation.navigate('OrderFinish')}
                />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    checkBox: {
        width: 40,
        height: 40,
    },
});
