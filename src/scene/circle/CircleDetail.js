/**
 * Created by zhangbo on 2019/9/25.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ImageBackground,
    ScrollView
} from 'react-native';
import {ListItem, Button, Icon, Image} from 'react-native-elements';
import {circle,Cart} from "../../common/image/Image";

const {height, width} = Dimensions.get('window');
export default class Circle extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '圈子详情',
        headerStyle:{
            backgroundColor:'#5FA9FF'
        },
        headerTitleStyle:{
            flex:1,
            textAlign: 'center',
            fontSize:18,
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
                <View>
                        <ListItem
                            containerStyle={{height:40,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:30}}
                            leftAvatar={{size:"small", source: Cart.qishou}}
                            title="小孩子"
                            subtitle="8-21 12:34 "
                            titleStyle={{fontSize:12}}
                            subtitleStyle={{fontSize:10}}
                        />
                        <View style={{height:height/5,width:width-40,margin:10}}>
                            <ImageBackground style={{height:'100%',width:'100%',borderRadius:20}} source={circle.group} >
                            </ImageBackground>
                        </View>
                            <View style={{paddingVertical:10,marginLeft:15}}>
                                <View style={{}}>
                                    <Text style={{fontSize:13}}>导语</Text>
                                </View>
                                <View  style={{paddingVertical:10}}>
                                    <Text style={{fontSize:13}}>父母的过分溺爱，会让孩子认为这些都是自己理所当然承受的，导致他们不知道去关心别人，不会为他人着想，缺乏同情心和自控能力，难以融入社会和承受生活压力。当生活遭遇坎坷，心理就开始变的极度扭曲，甚至泯灭人性，下面这个事件应该足以引起各位家长的注意！</Text>
                                </View>
                            </View>
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                            <View style={styles.footer}>
                                <Icon
                                    size={12}
                                    name='enter'
                                    type='antdesign'
                                    color='#666'
                                />
                                <Text style={styles.textStyle}>10</Text>
                            </View>
                            <View style={styles.footer}>
                                <Icon
                                    size={12}
                                    name='bars'
                                    type='antdesign'
                                    color='#666'
                                />
                                <Text style={styles.textStyle}>100</Text>
                            </View>
                            <View style={styles.footer}>
                                <Icon
                                    size={12}
                                    name='bars'
                                    type='antdesign'
                                    color='#666'
                                />
                                <Text style={styles.textStyle}>99</Text>
                            </View>
                        </View>
                    </View>
                <View style={{paddingVertical:10}}>
                    <View style={{marginLeft:15}}>
                    <Text>评论</Text>
                    </View>
                    <ListItem
                        containerStyle={{height:40,backgroundColor:'#fff'}}
                        contentContainerStyle={{height:30}}
                        leftAvatar={{size:"small", source: Cart.qishou}}
                        title="小孩子"
                        subtitle="8-21 12:34 "
                        titleStyle={{fontSize:12}}
                        subtitleStyle={{fontSize:10}}
                    />
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:10
    },
    footer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
        ,marginBottom:15,
    },
    textStyle:{
        fontSize:12,
        color:'#ccc'
    }
});
