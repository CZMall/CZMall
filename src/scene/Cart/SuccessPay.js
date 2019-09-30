/**
 * Created by zhangbo on 2019/9/19.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {LoginIcon} from "../../common/image/Image";
const {height,width} =  Dimensions.get('window');
import { Input ,Image,Button,Avatar} from 'react-native-elements';
export default class SuccessPay extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '订单支付成功',
    })
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top_content}>
                    <Avatar
                        size="small"
                        rounded
                        overlayContainerStyle={{backgroundColor: '#00CD66'}}
                        icon={{name: 'check', type: 'antdesign'}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                <Text style={styles.textStyle}>支付成功</Text>
                <Button
                    buttonStyle={styles.query_button}
                    titleStyle={styles.text_button}
                    title="查看物流"
                    onPress={()=>alert('查看')}
                />
                </View>
                <View style={styles.middle_content}>
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
    top_content:{
        backgroundColor:'#fff',
        alignItems:'center',
        marginBottom:10,
        height:height/5,
        justifyContent:'space-around'
    },
    middle_content:{
        backgroundColor:'#fff',
        height:height/5,
    },
    query_button:{
        width:width/3,
        height:20,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#DCDCDC',
        borderRadius:20,
    },
    text_button:{
        color:'#BEBEBE'
    },
    textStyle:{
        color:'#000',
        fontSize:15
    }
});
