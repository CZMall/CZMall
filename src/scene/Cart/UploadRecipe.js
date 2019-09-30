import React, { Component } from 'react';
import { Text, View,StyleSheet,Dimensions,ImageBackground } from 'react-native';
const {height,width} =  Dimensions.get('window');
import { Input ,Image,Button} from 'react-native-elements';
export default class UploadRecipe extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '上传处方',
    })
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                <Text style={styles.textStyle}>请上传您的处方</Text>
                </View>
                <View style={styles.upload_content}>
                    <Button
                        buttonStyle={styles.upload_button}
                        titleStyle={styles.text_button}
                        title="从相册上传"
                        onPress={()=>alert('相册')}
                    />
                    <Button
                        buttonStyle={styles.upload_button}
                        titleStyle={styles.text_button}
                        title="拍照"
                        onPress={()=>alert('拍照')}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
    },
    textStyle:{
        color:'#DCDCDC',
        fontSize:20,
    },
    content:{
        height:height/5,
        justifyContent:'center',
        alignItems:'center'
    },
    upload_content:{
        height:height/5,
        justifyContent:'space-around'
    },
    upload_button:{
        width:width/4*3,
        height:40,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#DCDCDC',
        borderRadius:20,
    },
    text_button:{
        color:'#DCDCDC'
    }
});
