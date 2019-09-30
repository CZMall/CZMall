/**
 * Created by zhangbo on 2019/9/27.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {ListItem, Button,CheckBox, Icon, Image,Input} from 'react-native-elements';
import {Cart, LoginIcon} from "../../common/image/Image";

const {height, width} = Dimensions.get('window');
export default class SelectPeople extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '选择问诊人',
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
    _keyExtractor = (item, index) => index;
    _renderItem=()=>{
        return(
            <View style={styles.itemStyle}>
                <Text>张三</Text>
                <Text>女  24岁</Text>
            </View>
        )
    }
    _listFooterComponent=()=>{
        return(
            <TouchableOpacity style={styles.itemStyle} onPress={()=>this.props.navigation.navigate('PeopleManagement')}>
                <Icon
                    reverse
                    name='plus'
                    type='antdesign'
                    color={'rgba(95, 169, 255, 0.1)'}
                    iconStyle={{color:'#5FA9FF',borderWidth:0}}
                />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{}}>
                    <ListItem
                        leftAvatar={{size:27, source: Cart.qishou}}
                        title="你需要为谁咨询"
                        titleStyle={{fontSize:16,color:'#333'}}
                    />
                    <View>
                        <FlatList
                            horizontal={true}
                            data={[{key: 'a'}, {key: 'b'}]}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            ListFooterComponent={this._listFooterComponent}
                        />
                    </View>
                    <View style={{marginTop:20}}>
                <ListItem
                    containerStyle={{backgroundColor:'#fff'}}
                    leftElement={<View><Text>是否就该病情到医院就诊过</Text></View>}
                    rightElement={<View style={{flexDirection:'row'}}>
                        <View style={styles.borderText}>
                            <Text>是</Text>
                        </View>
                            <View style={[styles.borderText,{marginLeft:10}]}>
                                <Text>否</Text>
                            </View>
                        </View>}
                />
                <ListItem
                    containerStyle={{backgroundColor:'#fff'}}
                    leftElement={<View><Text>医生诊断的疾病名称</Text></View>}
                    title={<Input
                        inputStyle={{fontSize:14,color:'#999999'}}
                        inputContainerStyle={{height:30,borderBottomWidth:0,}}
                        placeholder='请输入'

                    />}
                />
                    </View>
                </View>
                <View style={{alignItems:'center',margin:15,width:width-30}}>
                    <View>
                        <CheckBox
                            center
                            title='我已同意《互联网金融医疗协议》'
                            containerStyle={{backgroundColor:'#fff',borderWidth:0}}
                            checked={true}
                        />
                    </View>
                    <Button
                        buttonStyle={{borderRadius:24,height:44,backgroundColor:"#5FA9FF",width:width-30}}
                        title="开始问诊"
                        titleStyle={{fontSize:16,color:'#fff'}}
                        onPress={()=>this.props.navigation.navigate('SelectPeople')}
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
    itemStyle:{
        height:100,
        width:100,
        backgroundColor:'rgba(95, 169, 255, 0.1)',
        borderWidth:1,
        borderColor:'#5FA9FF',
        borderRadius:5,
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center'
    },
    borderText:{
        borderWidth:1,
        borderColor: '#5FA9FF',
        width:40,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    }

});
