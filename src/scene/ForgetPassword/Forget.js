import React, { Component } from 'react';
import { Text, View,StyleSheet,Dimensions,ImageBackground } from 'react-native';
import { Input ,Image,Button} from 'react-native-elements';
import {RegisterIcon} from "../../common/image/Image";
const {height,width} =  Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class Forget extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '忘记密码',
    })
    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                <View style={styles.content}>
                    <Input
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        placeholder='请输入手机号'
                        leftIcon={<Image
                            source={RegisterIcon.phone}
                            style={styles.leftIconStyle}/>}
                    />
                    <Input
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        placeholder='验证码'
                        leftIcon={<Image
                            source={RegisterIcon.Verification}
                            style={styles.leftIconStyle}/>}
                        rightIcon={
                            <Button
                                buttonStyle={{height:40,backgroundColor:'#5FA9FF'}}
                                title="60秒后重新发送"
                                titleStyle={{fontSize:14,color:"#fff"}}
                                onPress={()=>alert('发送验证码')}
                            />
                        }
                    />
                    <Input
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        placeholder='设置密码'
                        leftIcon={<Image
                            source={RegisterIcon.password}
                            style={styles.leftIconStyle}/>}
                    />
                    <Input
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        placeholder='确认密码'
                        leftIcon={<Image
                            source={RegisterIcon.password}
                            style={styles.leftIconStyle}/>}
                    />
                    <Button
                        buttonStyle={{borderRadius:20,height:40,marginTop:20,backgroundColor:'#5FA9FF'}}
                        title="确认修改"
                        titleStyle={{fontSize:18,color:'#fff'}}
                        onPress={()=>this.props.navigation.navigate('Login')}
                    />
                </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        backgroundColor:'#fff'
    },
    content:{
        width:width-40
    },
    inputStyle:{
        fontSize:14,
        color:'#999999'
    },
    leftIconStyle:{
        width: 15,
        height: 19,
        marginRight:10,
    },
    inputContainerStyle:{
        borderBottomWidth:1,
        borderBottomColor:'#F8F8F8',
        height:70,
    }

});
