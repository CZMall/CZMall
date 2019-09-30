/**
 * Created by zhangbo on 2019/9/20.
 */
import React, {Component} from 'react';
import { ListItem,Button,Icon} from 'react-native-elements';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    SectionList
} from 'react-native';
import {Cart, LoginIcon} from "../../common/image/Image";

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
const Data=[
    { title: "Title1", data: ["item1", "item2"] },
    { title: "Title1", data: ["item1", "item2"] },
    { title: "Title1", data: ["item1", "item2"] },
]
export class Item extends Component{
    _renderItem(item,index){
        return(
            <View style={{ backgroundColor:'#fff',marginLeft:10,marginRight:10,paddingTop:10,paddingBottom:10}}>
            <ListItem
                key={index}
                containerStyle={{height:50,backgroundColor:'#fff'}}
                contentContainerStyle={{height:50}}
                leftElement={<Image style={{width: 40, height: 40}}
                                    source={Cart.good}
                />}
                title='汤臣倍健 蛋白粉450g 进口奶粉汤臣倍健 蛋白粉450g 进口奶粉'
                titleStyle={{fontSize:12}}
                subtitle={<View>
                    <Text style={{fontSize:10,color:'#DCDCDC'}}>规格：450</Text>
                    <Text style={{fontSize:12,color:'red'}}>￥399.00</Text>
                </View>}
                rightSubtitle={<View>
                    <Text style={{fontSize:10,color:'#DCDCDC'}}>X1</Text>
                </View>}
            />

            </View>
        )
    }
    _renderSectionHeader(){
        return(
            <ListItem
                containerStyle={{height:30,marginTop:15,marginLeft:10,marginRight:10}}
                leftElement={<View style={{flexDirection:'row',alignItems:'center',height:30}}>
                    <View style={{marginRight:5}}>
                    <Icon
                        size={18}
                        name='inbox'
                        type='antdesign'
                        color='#666'
                    />
                    </View>
                    <Text style={{fontSize:17,color:'#333'}}>怡康医药超市></Text>
                </View> }
                rightElement={<View style={{height:30,justifyContent:'center'}}><Text style={{color:'#5FA9FF',fontSize:15}}>等待买家付款</Text></View>}
                bottomDivider
            />
        )
    }
    _footerComponent(){
        return(
            <View style={{backgroundColor:'#fff',marginLeft:10,marginRight:10,alignItems:'flex-end',borderTopWidth:1,borderColor:'#f8f8f8'}}>
                <View><Text>共一件商品 共计39.99元</Text></View>
            <View style={{flexDirection:'row',justifyContent:'flex-end',paddingTop:10,paddingBottom:10}}>
                <Button
                    buttonStyle={styles.upload_button}
                    titleStyle={styles.text_button}
                    title="删除订单"
                    onPress={()=>alert('删除订单')}
                />
                <Button
                    buttonStyle={styles.upload_button}
                    titleStyle={styles.text_button}
                    title="查看物流"
                    onPress={()=>alert('查看物流')}
                />
                <Button
                    buttonStyle={styles.upload_button}
                    titleStyle={styles.text_button}
                    title="确认收获"
                    onPress={()=>alert('拍照')}
                />
            </View>
            </View>
        )
    }
    render(){
        return(
            <SectionList
                renderItem={({ item, index, section }) =>this._renderItem(item,index)}
                renderSectionHeader={({ section: { title } }) => this._renderSectionHeader()}
                sections={Data}
                keyExtractor={(item, index) => item + index}
                renderSectionFooter={() => this._footerComponent()}
            />
        )
    }
}
export default class MineOrderTab extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '我的订单',
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
    render() {
        return (
            <ScrollableTabView
                style={styles.container}
                tabBarBackgroundColor='#FFF'
                renderTabBar={() => <DefaultTabBar backgroundColor={"#fff"}/>}
                tabBarUnderlineStyle={styles.lineStyle}
                tabBarActiveTextColor='#5FA9FF'>
                <View tabLabel='全部'>
                    <Item/>
                </View>
                <View tabLabel='待付款'>
                    <Item/>
                </View>
                <View tabLabel='待收货'>
                    <Item/>
                </View>
                <View tabLabel='待评价'>
                    <Item/>
                </View>
            </ScrollableTabView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#DCDCDC'
    },
    lineStyle: {
        width:ScreenWidth/4,
        height: 2,
        backgroundColor: '#5FA9FF',
    },
    upload_button:{
        width:ScreenWidth/6,
        marginLeft:5,
        height:29,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#666',
        borderRadius:5,
    },
    text_button:{
        color:'#DCDCDC',
        fontSize:10
    }
});
