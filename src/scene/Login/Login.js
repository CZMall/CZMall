import React, { Component } from 'react';
import { Text, View,StyleSheet,ImageBackground,Dimensions,TouchableOpacity, TextInput ,StatusBar} from 'react-native';
const {height,width} =  Dimensions.get('window');
import{theme}  from '../../common/Config'
import {LoginIcon} from "../../common/image/Image";
import { Input ,Image,Button} from 'react-native-elements';
const eye=true
export default class Login  extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '登录',
    })
    constructor(props) {
        super(props);
        this.state = {
           eye:true
        };
    };
    isfalseEye(){
      this.setState({eye:false})
    }
    istrueEye(){
        this.setState({eye:true})
    }
    render() {
        return (
            <View style={styles.container}>
               {/* <StatusBar backgroundColor={'#fff'} //状态栏背景颜色
                           barStyle={'dark-content'} //状态栏样式（黑字）
                />*/}
                    <View style={{flex:1}}>
                        <View style={styles.middle}>
                            <View style={styles.middle_content}>
                                <Input
                                    inputStyle={{fontSize:15,color:'#999999'}}
                                    inputContainerStyle={{borderBottomWidth:1,borderBottomColor:'#F8F8F8'}}
                                    placeholder='请输入手机号'
                                    style={{fontSize:10,color:'red'}}
                                    onChangeText={(text) => console.log('21')}
                                    leftIcon={<Image
                                        source={LoginIcon.phone}
                                        style={{ width: 12, height: 19,marginRight:10 }}/>}
                                />
                                <Input
                                    secureTextEntry={this.state.eye}
                                    inputStyle={{fontSize:15,color:'#999999'}}
                                    inputContainerStyle={{borderBottomWidth:2,borderBottomColor:'#F8F8F8'}}
                                    placeholder='请输入密码'
                                    errorStyle={{ color: '#FF0000',marginLeft:20}}
                                    /*  errorMessage='账号或密码错误'*/
                                    leftIcon={<Image
                                        source={LoginIcon.password}
                                        style={{ width: 15, height: 19 ,marginRight:10 }}/>}
                                    rightIcon={<TouchableOpacity
                                        onPressIn={()=>this.isfalseEye()}
                                        onPressOut={()=>this.istrueEye()}
                                        >
                                        <Image
                                        source={LoginIcon.chakan}
                                        style={{ width: 20, height: 12 }}/>
                                    </TouchableOpacity>}
                                />
                                <View style={styles.forgetPasword}>
                                    <Text style={styles.textStyle} onPress={()=>this.props.navigation.navigate('Register')}>注册></Text>
                                    <Text style={styles.textStyle} onPress={()=>this.props.navigation.navigate('Forget')}>忘记密码?</Text>

                                </View>
                                <Button
                                    titleStyle={{fontSize:18,color:'#fff'}}
                                    buttonStyle={{borderRadius:24,height:44,backgroundColor:"#5FA9FF",marginTop:20}}
                                    title="登 录"
                                    onPress={()=>this.props.navigation.navigate('Tab')}
                                />
                            </View>
                            <View style={styles.footer}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Tab")}>
                                    <Image
                                        source={LoginIcon.wechat}
                                        style={{ width: 35, height: 35 }}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Tab")}>
                                    <Image
                                        source={LoginIcon.qq}
                                        style={{ width: 35, height: 35 }}/>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    <Image style={styles.imageStyle}
                           source={LoginIcon.bj}>
                    </Image>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center'
    },
    imageStyle:{
        height:100,
        width:width,
        resizeMode:'contain'
    },
    textStyle:{
     fontSize:15,
     color:'#B5B5B5'
    },
    font_color:{
        color:'#fff',
        fontWeight:'bold',
        letterSpacing:5
    },
    middle:{
        flex:1,
        marginTop:40,
        width:width,
        alignItems:'center'
    },
    middle_content:{
        width:width-40,
    },
    forgetPasword:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        marginTop:20,
        marginBottom:20,
        marginLeft:10,
        marginRight:10
    },
    footer:{
        marginTop:50,
        flexDirection:'row',
        justifyContent:'space-between',
        width:width/2,
    }

});
