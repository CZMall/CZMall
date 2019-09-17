
/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 * @param  引导页
 *
 * @flow
 */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    ScrollView,
} from 'react-native';


let imgData = [
    "https://m.360buyimg.com/mobilecms/s772x376_jfs/t23224/12/1547449730/265644/6da76a53/5b627790N1beab594.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp",
    "https://m.360buyimg.com/mobilecms/s772x376_jfs/t23389/341/1459755771/98229/bdf1b674/5b619766Nb8e94478.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp",
    "https://m.360buyimg.com/mobilecms/s772x376_jfs/t23560/365/1407572473/129109/377153ef/5b6010acN1b265667.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp",
    "https://m.360buyimg.com/mobilecms/s772x376_jfs/t25549/223/5998595/106769/8dfb1308/5b62a8a3Nae1a28e1.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp",
    "https://m.360buyimg.com/mobilecms/s772x376_jfs/t24148/59/1544888845/169957/6b3a521d/5b62a6edNd0172ab9.jpg!cr_1125x549_0_72!q70.jpg.dpg.webp",
]

let {width} = Dimensions.get('window');

export default class one extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDot: 0
        }
        this.timer = null;
        this.setDot = this.setDot.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.scrollend = this.scrollend.bind(this);
    }
    renderDot() {
        let dots = [],
            style;
        imgData.forEach((item,index)=>{
            style = index === this.state.activeDot ? {backgroundColor:'#fff'} : {};
            dots.push(
                <View key={index} style={[styles.dot,style]} />
            )
        })
        return dots;
    }
    setDot(e) {
        let offsetX = e.nativeEvent.contentOffset.x;
        let active = Math.floor(offsetX / width);

        this.setState({
            activeDot: active
        })
    }
    componentDidMount() {
        this.startTimer();
    }
    startTimer() {
        let activeDot = 0,
            imgCount = imgData.length,
            scrollView = this.refs.scrollView,
            offsetX;
        this.timer = setInterval(()=>{
            if ((this.state.activeDot+1) >= imgCount) {
                activeDot = 0;
            } else {
                activeDot = this.state.activeDot + 1;
            }
            offsetX = activeDot * width;

            this.setState({activeDot:activeDot});
            if (activeDot >= 5) {
                scrollView.scrollTo({x:offsetX,y:0,animated:false});
            } else {
                scrollView.scrollTo({x:offsetX,y:0,animated:true});
            }
        },1500);
    }
    scrollend() {
        clearInterval(this.timer);
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    pagingEnabled={true}
                    showsVerticalScrollIndicator={false}
                    style={styles.imgContainer}
                    onMomentumScrollEnd={(e)=>{this.setDot(e)}} // 滑动的时候设置点的位置
                    // onScrollBeginDrag={()=>clearInterval(this.timer)}
                    // onScrollEndDrag={()=>{this.timer = setInterval(this.startTimer,1000)}}
                >
                    {imgData.map((item,index)=>{
                        return (
                            <Image source={{uri:item}} style={{width:Dimensions.get('window').width,height:200}} key={index} />
                        )
                    })}

                </ScrollView>
                <View style={styles.dotContainer}>
                    {this.renderDot()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
    },
    imgContainer: {
    },
    dotContainer: {
        width:Dimensions.get('window').width,
        height: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 6,
        marginRight: 5,
    },
    activeDot: {
        backgroundColor: '#fff'
    }
})

/* 1. 设置ScrollView 的水平，自动分页
  2.滑动结束后设置点的位置
  3.定时器
*/
