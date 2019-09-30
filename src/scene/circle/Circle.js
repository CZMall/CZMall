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
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {ListItem, Button, Icon, Image} from 'react-native-elements';
import {circle,Cart} from "../../common/image/Image";

const {height, width} = Dimensions.get('window');
export default class Circle extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '圈子',
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
                {
                    [{},{}].map((item,i)=><View key={i}>
                        <ListItem
                            containerStyle={{height:40,backgroundColor:'#fff'}}
                            contentContainerStyle={{height:30}}
                            leftAvatar={{size:"small", source: Cart.qishou}}
                            title="小孩子"
                            subtitle="8-21 12:34 "
                            titleStyle={{fontSize:12}}
                            subtitleStyle={{fontSize:10}}
                        />
                        <View style={{margin:10}}>
                            <Text style={{fontSize:15,color:'#333'}}>每一天都在追寻新的自己，加油</Text>
                        </View>
                        <TouchableOpacity style={{height:height/5,width:width-40,margin:10}} onPress={()=>this.props.navigation.navigate('CircleDetail')}>
                            <ImageBackground style={{height:'100%',width:'100%',borderRadius:20}} source={circle.group} >
                                <View style={{position:'absolute',bottom:0,backgroundColor:'#CCCCCC',width:width-40,borderRadius:5}}>
                                    <Text style={{fontSize:14,color:'#fff'}}>经常趴着午睡，对身体有什么害处？</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
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
                    </View>)
                }
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
