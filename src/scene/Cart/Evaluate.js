/**
 * Created by zhangbo on 2019/9/24.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
import {ListItem, Button, Icon, Image,CheckBox,AirbnbRating} from 'react-native-elements';
import {Cart, LoginIcon} from "../../common/image/Image";

const {height, width} = Dimensions.get('window');
export default class Evaluate extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '评价',
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
            <View style={styles.container}>
                <View style={{borderColor:'#f8f8f8',borderWidth:1,borderRadius:5,marginBottom:10}}>
                    <View style={{justifyContent:"center",alignItems:'center',marginTop:10,marginBottom:10}}>
                        <Text style={{fontSize:18,color:'#333333'}}>您对骑手满意吗？</Text>
                    </View>
                    <ListItem
                        containerStyle={{height:40,backgroundColor:'#f8f8f8'}}
                        contentContainerStyle={{height:30}}
                        leftAvatar={{size:"small", source: Cart.qishou}}
                        title="同城快药专送"
                        subtitle="9月19日 12:34 左右送达"
                        titleStyle={{fontSize:12}}
                        subtitleStyle={{fontSize:10}}
                        rightTitle={<CheckBox
                            title='匿名评价'
                            containerStyle={{borderWidth:0,backgroundColor:'#f8f8f8',width:90,marginRight:-30}}
                            textStyle={{fontSize:8}}
                            size={12}
                            checked={false}
                        />}
                    />
                    <View style={{alignItems:'center',paddingTop:30,paddingBottom:30}}>
                        <View style={{flexDirection:'row',width:width/2,justifyContent:'space-between'}}>
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Image
                                    source={Cart.cha}
                                    style={{ width: 32, height: 32 ,marginBottom:10}}/>
                                <View >
                                    <Text>差</Text>
                                </View>
                            </View>
                            <View >
                                <Image
                                    source={Cart.yiban}
                                    style={{ width: 32, height: 32 ,marginBottom:10}}/>
                                <View>
                                    <Text>一般</Text>
                                </View>
                            </View>
                            <View >
                                <Image
                                    source={Cart.henbang}
                                    style={{ width: 32, height: 32,marginBottom:10 }}/>
                                <View>
                                    <Text>很棒</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{borderColor:'#f8f8f8',borderWidth:1,borderRadius:5}}>
                    <View style={{justifyContent:"center",alignItems:'center',marginTop:10,marginBottom:10}}>
                        <Text style={{fontSize:18,color:'#333333'}}>您对商家/药品满意吗？</Text>
                    </View>
                    <ListItem
                        containerStyle={{height:40,backgroundColor:'#f8f8f8'}}
                        contentContainerStyle={{height:30}}
                        leftAvatar={{size:"small", source: Cart.good}}
                        title="怡康药店高新三路"
                        titleStyle={{fontSize:12}}
                        rightTitle={<CheckBox
                            title='匿名评价'
                            containerStyle={{borderWidth:0,backgroundColor:'#f8f8f8',width:90,marginRight:-30}}
                            textStyle={{fontSize:8}}
                            size={12}
                            checked={true}
                        />}
                    />
                    <View>
                        <AirbnbRating
                            size={20} />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:15,
    },
});
