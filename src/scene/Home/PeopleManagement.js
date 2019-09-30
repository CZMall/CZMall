/**
 * Created by zhangbo on 2019/9/27.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
import {ListItem, Button, Icon, Image,Input} from 'react-native-elements';
import {LoginIcon} from "../../common/image/Image";

const {height, width} = Dimensions.get('window');
export default class PeopleManagement extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '问诊人管理',
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
            <View style={styles.container}>
                <View>
                <Input
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    placeholder='请填写真实姓名'
                    onChangeText={(text) => console.log('21')}
                    leftIcon={<View>
                        <Text style={styles.titleStyle}>真实姓名:</Text>
                    </View>}
                />
                <Input
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    placeholder='请填写性别'
                    onChangeText={(text) => console.log('21')}
                    leftIcon={<View><Text style={styles.titleStyle}>性       别:</Text></View>}
                />
                <Input
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    placeholder='请填写年龄'
                    onChangeText={(text) => console.log('21')}
                    leftIcon={<View><Text style={styles.titleStyle}>年       龄:</Text></View>}
                />
                <Input
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    placeholder='请填写身份证号'
                    onChangeText={(text) => console.log('21')}
                    leftIcon={<View><Text style={styles.titleStyle}>身份证号:</Text></View>}
                />
                </View>
                <View style={{marginBottom:40,marginLeft:15,marginRight:15}}>
                <Button
                    titleStyle={{fontSize:18,color:'#fff'}}
                    buttonStyle={{borderRadius:24,height:44,backgroundColor:"#5FA9FF",marginTop:20}}
                    title="登 录"
                    onPress={()=>this.props.navigation.navigate('Tab')}
                />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between'
    },
    inputStyle:{
        fontSize:15,
        color:'#999999'
    },
    inputContainerStyle:{
        borderBottomWidth:1,
        borderBottomColor:'#F8F8F8'
    },
    titleStyle:{
        fontSize:16,
        color:'#000'
    }
});
