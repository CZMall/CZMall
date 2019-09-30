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
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {SearchBar,ListItem,Image} from 'react-native-elements';
import {main} from "../../common/image/Image";

const {height, width} = Dimensions.get('window');
export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
        }
    }
    updateSearch = search => {
        this.setState({ search });
    };
    render() {
        const { search } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.goBack()}
                        style={{height:60,justifyContent:'center',alignItems:'center',marginLeft:5,marginRight:5}}>
                    <Text >返回</Text>
                    </TouchableOpacity>
                        <SearchBar
                            inputContainerStyle={{backgroundColor:'#EFEFEF',borderWidth:0,height:40,borderRadius:20}}
                            inputStyle={{fontSize:12}}
                            containerStyle={{backgroundColor:'#fff',borderBottomWidth:0,borderTopWidth:0,height:60,flex:1}}
                            showCancel={true}
                            showLoading={true}
                            placeholder="搜索药品"
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                    <View style={{height:60,justifyContent:'center',alignItems:'center',marginLeft:5,marginRight:5}}>
                        <Text>取消</Text>
                    </View>
                </View>
                <ListItem
                    leftElement={<Image style={{width: 9, height: 12}}
                                        source={main.shape}
                    />}
                    title='附近的药店'
                />
                <ListItem
                    title='热门搜索'
                />
                <FlatList
                    data={[
                        {key: '阿莫西林'},
                        {key: '999感冒灵'},
                        {key: '999感冒灵'},
                        {key: '999感冒灵'},
                        {key: '999感冒灵'},
                        {key: '999感冒灵'},
                        {key: '999感冒灵'},
                        {key: '999感冒灵'},
                    ]}
                    numColumns={5}

                    renderItem={({item}) =><View style={styles.flatItem}>
                        <Text style={{fontSize:12,color:'#999'}}>{item.key}</Text>
                    </View>}
                />
                <ListItem
                    title='搜索历史'
                    rightTitle={<Image style={{width: 12, height: 13}}
                    source={main.delete}
                />}
                />
                <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Dan'},
                    ]}
                    numColumns={5}
                    renderItem={({item}) => <View style={styles.flatItem}>
                        <Text style={{fontSize:12,color:'#999'}}>{item.key}</Text>
                    </View>}
                />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatItem: {justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        height:40,
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        backgroundColor:'#f8f8f8',
        width:(width-100)/5
    }
});
