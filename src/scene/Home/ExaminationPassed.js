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
import {ListItem, Button, Icon, Image,CheckBox} from 'react-native-elements';
import {Cart} from "../../common/image/Image";

const {height, width} = Dimensions.get('window');
export default class ExaminationPassed extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '按处方找药',
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
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:2}}>
                    {
                        [{},{},{}].map((item, i) => (
                            <ListItem
                                key={i}
                                leftElement={<Image style={{width: 40, height: 40}}
                                                    source={Cart.good}
                                />}
                                title={<View><Text>[999]感冒灵颗粒</Text></View>}
                                subtitle={<View><Text>￥11.20</Text></View>}
                                checkBox={{checkedIcon:'check-circle',
                                    uncheckedIcon:'circle-o',checked:true}}
                                bottomDivider
                            />
                        ))
                    }
                </View>
                <View style={{alignItems:'center',margin:15,width:width-30,flex:1}}>
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
                        title="确定"
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
});
