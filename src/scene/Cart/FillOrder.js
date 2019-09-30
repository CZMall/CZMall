import React, { Component } from 'react';
import { Text, View,StyleSheet,Dimensions,ImageBackground } from 'react-native';
const {height,width} =  Dimensions.get('window');
import { ListItem,Icon,Button} from 'react-native-elements';
import {LoginIcon} from "../../common/image/Image";
const list = [
    {
        title: '配送方式',
        rightTitle:'包邮',
    },
    {
        title: '优惠卷',
        rightTitle:'无可用',
    },
    {
        title: '支付方式',
        rightTitle:"在线支付",
    },
    {
        title: '发票',
        rightTitle:"明细(纸质)-个人",
    },

]
const list_drug = [
    {
        title: '配送方式',
        rightTitle:'包邮',
    },
    {
        title: '配送方式',
        rightTitle:'包邮',
    },

]
export default class FillOrder extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '填写订单',
    })
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                <ListItem
                    containerStyle={{height:height/8,marginTop:10,marginBottom:10}}
                    contentContainerStyle={{}}
                    title={<View style={{flexDirection:'row'}}>
                        <Text>张三</Text>
                        <Text>18973120332</Text>
                        <Text style={{color:'red'}}>默认</Text>
                    </View>}

                    subtitle={<View style={{flexDirection:'row',paddingTop:10}}>
                                <Text style={{fontSize:12}}>陕西省西安市雁塔区财富中心二期B座</Text>
                            </View>}
                    subtitleStyle={{fontSize:10,color:'#DCDCDC'}}
                    rightTitle={<Icon name='right' type='antdesign' color='#DCDCDC'/>}
                />

                <ListItem
                    containerStyle={{height:30}}
                    title="老百姓大药房高新分店"
                    titleStyle={{fontSize:12}}
                    contentContainerStyle={{height:30,marginLeft:-10}}
                    bottomDivider
                />
                <View style={styles.middle_content}>
                    { list_drug.map((l,i)=>(
                        <ListItem
                            key={i}
                            containerStyle={{height:50,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:50}}
                            leftAvatar={{size:"small", source:LoginIcon.wechat}}
                            title='汤臣倍健 蛋白粉450g 进口奶粉'
                            titleStyle={{fontSize:12}}
                            subtitle={<View>
                                <Text style={{fontSize:10,color:'#DCDCDC'}}>规格：450</Text>
                                <Text style={{fontSize:12,color:'red'}}>￥399.00</Text>
                            </View>}
                            rightSubtitle={<View>
                                <Text style={{fontSize:10,color:'#DCDCDC'}}>X1</Text>
                            </View>}
                            bottomDivider
                        />

                    ))}
                </View>
                {
                list.map((l, i) => (
                <ListItem
                    key={i}
                    title={l.title}
                    titleStyle={{fontSize:12,lineHeight:30}}
                    rightTitle={l.rightTitle}
                    rightTitleStyle={{fontSize:12,lineHeight:30}}
                    containerStyle={{height:30}}
                    contentContainerStyle={{height:30}}
                    rightContentContainerStyle={{height:30}}
                    bottomDivider
                />)
                )}
                </View>
                <View style={styles.footer}>
                    <View>
                        <Text>共两件</Text>
                    </View>
                    <View style={styles.footer_row}>
                        <View style={styles.footer_row}>
                            <Text>实付:</Text>
                            <Text style={{color:'#FFA500'}}>9888.00</Text>
                        </View>
                        <Button
                            buttonStyle={{height:30,backgroundColor:'#FFA500',marginLeft:10}}
                            title="提交订单"
                            onPress={()=>this.props.navigation.navigate('OrderCenter')}
                        />
                    </View>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#DCDCDC'
    },
    middle_content:{
        marginBottom:10
    },
    footer:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    footer_row:{
        flexDirection:'row',
        alignItems:'center'
    }
});
