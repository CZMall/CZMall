/**
 * Created by zhangbo on 2019/9/26.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    ImageBackground,
Modal,
    Alert
} from 'react-native';
import {ListItem, Button, Icon, Image,Overlay} from 'react-native-elements';
import {Cart, main} from "../../common/image/Image";
const {height, width} = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker';
export default class Prescription extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '处方找药',
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
    constructor(props) {
        super(props)
        this.state = {
            avatarSource:Cart.good,
            pickerSource:Cart.good,
            modalVisible:true,
            Visible:false
        }
    }
    selectPhoto=()=> {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.launchCamera(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    selectPicker=()=> {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    pickerSource: source,
                });
            }
        });
    }
    setModalVisible=() =>{
        this.setState({ modalVisible: false });
        this.props.navigation.navigate('ExaminationPassed')
    }
    setVisible=() =>{
        this.setState({ Visible: false });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:40}}>
                    <View style={{flexDirection:'row',width:width/3*2,justifyContent:'center',alignItems:'center'}}>
                        <View style={{width:5,height:5,backgroundColor:'#5FA9FF',borderRadius:2.5}}></View>
                        <View style={{height:1,backgroundColor:'#5FA9FF',width:100}}></View>
                        <View style={{width:5,height:5,backgroundColor:'#5FA9FF',borderRadius:2.5}}></View>
                        <View style={{height:1,backgroundColor:'#5FA9FF',width:100}}></View>
                        <View style={{width:5,height:5,backgroundColor:'#5FA9FF',borderRadius:2.5}}></View>
                    </View>
                    <View style={{flexDirection:'row',width:width/3*2+40,justifyContent:'space-around',alignItems:'center',marginTop:20}}>
                        <Text style={{fontSize:12}}>上传处方</Text>
                        <Text style={{fontSize:12}}>审核通过</Text>
                        <Text style={{fontSize:12}}>找到药品</Text>
                    </View>
                    <View>

                    </View>
                </View>
                <View style={styles.item}>
                    <View style={{marginLeft:10}}>
                        <Text style={styles.titleText}>相册上传</Text>
                        <Text  style={styles.subtitleText}>请点击上传您的处方</Text>
                    </View>
                    <TouchableOpacity style={{marginRight:15}} onPress={()=>this.selectPhoto()}>
                        <Image style={{width: 60, height: 60}}
                               source={this.state.avatarSource}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <View style={{marginLeft:10}}>
                        <Text style={styles.titleText}>拍照</Text>
                        <Text  style={styles.subtitleText}>请点击拍照上传您的处方</Text>
                    </View>
                    <TouchableOpacity style={{marginRight:15}} onPress={()=>this.selectPicker()}>
                        <Image style={{width: 60, height: 60}}
                               source={this.state.pickerSource}
                        />
                    </TouchableOpacity>
                </View>
                <Button
                    buttonStyle={{borderRadius:24,height:44,backgroundColor:"#5FA9FF",marginTop:40,marginLeft:10,marginRight:10}}
                    title="提交"
                    titleStyle={{fontSize:16,color:'#fff'}}
                    onPress={()=>this.props.navigation.navigate('Tab')}
                />
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={()=>{
                    }}
                    onShow={()=>{
                    }}>
                    <View style={{position:'absolute',top:height/6,right:20,zIndex:100}}>
                        <Icon
                            name='close-o'
                            type='evilicon'
                            color='#fff'
                            onPress={() =>  this.setState({ modalVisible: false })}
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>

                        <View style={{height:height/2,width:width-60,backgroundColor:'white',alignItems:'center'}}>

                            <ImageBackground style={{height:177,width:'100%',alignItems:'center',justifyContent:'flex-end'}} source={main.pass} >
                                <View style={{position:'absolute',bottom:0}}>
                                    <Text style={{fontSize:25,color:'#666666'}}>审核通过</Text>
                                </View>
                            </ImageBackground>
                            <Button
                                title='按处方找药'
                                titleStyle={{fontSize:18,color:'#fff'}}
                                buttonStyle={{borderRadius:22,height:44,backgroundColor:"#5FA9FF",marginTop:40,width:(width-60)/2,}}
                                onPress={()=>{this.setModalVisible()}}/>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.Visible}
                    transparent={true}
                    onRequestClose={()=>{
                    }}
                    onShow={()=>{
                    }}>
                    <View style={{position:'absolute',top:height/6,right:20,zIndex:100}}>
                        <Icon
                            name='close-o'
                            type='evilicon'
                            color='#fff'
                            onPress={() =>  this.setState({ modalVisible: false })}
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.5)'}}>

                        <View style={{height:height/2,width:width-60,backgroundColor:'white',alignItems:'center'}}>
                            <ImageBackground style={{height:177,width:'100%',alignItems:'center',justifyContent:'flex-end'}} source={main.notPass} >
                                <View style={{position:'absolute',bottom:0}}>
                                    <Text style={{fontSize:25,color:'#666666'}}>审核未通过</Text>
                                </View>
                            </ImageBackground>
                            <View style={{width:(width-60),flexDirection:'row',justifyContent:'space-around'}}>
                            <Button
                                title='重新上传'
                                titleStyle={{fontSize:18,color:'#fff'}}
                                buttonStyle={{borderRadius:22,height:44,backgroundColor:"#5FA9FF",marginTop:40,width:(width-60)/3,}}
                                onPress={()=>{this.setVisible()}}/>
                            <Button
                                title='找医生开药'
                                titleStyle={{fontSize:18,color:'#fff'}}
                                buttonStyle={{borderRadius:22,height:44,backgroundColor:"#5FA9FF",marginTop:40,width:(width-60)/3,}}
                                onPress={()=>{this.setVisible()}}/>
                        </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f8f8f8'
    },
    item:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        margin:15,
        paddingVertical: 10,
        borderRadius:5,

    },
    titleText:{
        fontSize:16,
        color:'#333'
    },
    subtitleText:{
        fontSize:13,
        color:'#C0BFC0'
    }
});
