/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *  data:2019.09.18
 *
 * @flow
 */

import React, {PureComponent} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    ScrollView,
    Dimensions,
    Animated,
    RefreshControl,
    TouchableOpacity
} from 'react-native'
import px2dp from '../../common/index'
import Button from '../../widget/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import {commonStyle} from '../../widget/commonStyle'
import {LargeList} from "react-native-largelist-v3";
import { drugLists } from "./DrugListData";
let {width, height} = Dimensions.get('window')
const LABEL_HEIGHT = 25
const PIC_SIZE = px2dp(60)

const leftData = [{items: drugLists}];

class GoodsList extends PureComponent<Props, State> {
    _listRef: LargeList;
    indexes: LargeList;
    _buttonRefs: [] = [];

    constructor(props){
        super(props)
        this.state = {
            scrollY: new Animated.Value(0)
        }
        for (let s = 0; s < drugLists.length; ++s) {
            const refs = [];
            for (let r = 0; r < drugLists[s].items.length; ++r) {
                refs.push(React.createRef());
            }
            this._buttonRefs.push(refs);
        }
    }

    addItem(obj){
        this.refs[obj.key].measure((a, b, w, h, px,py) => {
            this.props.onAdd({
                x: px,
                y: py,
                data: obj,
                pos: [px, py, 26, height - 60]
            })
        })
    }
    minusItem(obj, index){
        this.props.minus(obj, index)
    }
    renderTypes(){
        let { drugLists } = this.props
        return (
            <View>
                {
                    Object.keys(drugLists).map((item, i) => {
                        return (
                            <Button key={i} onPress={()=>{}}>
                                <View style={[styles.typeItem, i==0?styles.active:null]}>
                                    {i==0?<Icon name={"ios-flame"}
                                                size={px2dp(20)}
                                                style={{marginRight:20}}
                                                color={commonStyle.red} />:null
                                    }
                                    <Text numberOfLines={2}
                                          style={{fontSize: px2dp(13), color: commonStyle.black}}>
                                        {item}
                                    </Text>
                                </View>
                            </Button>
                        )
                    })
                }
            </View>
        )
    }

    render(){
        let { headHeight } = this.props
        let scrollY = this.state.scrollY.interpolate({
            inputRange: [0, headHeight, headHeight],
            outputRange: [0, headHeight, headHeight+1]
        })
        const buttons = [];
        this._buttonRefs.forEach(btn => buttons.concat(btn));

        if(Platform.OS == "android"){
            style.height = height
        }
        return (
            <View style={styles.listViewContainer}>

                <LargeList
                    style={styles.lc}
                    ref={ref => (this.indexes = ref)}
                    showsVerticalScrollIndicator={false}
                    data={leftData}
                    heightForIndexPath={() => 60}
                    renderIndexPath={this.renderIndexes}
                />
                <LargeList
                    ref={ref => (this._listRef = ref)}
                    style={styles.rc}
                    data={drugLists}
                    heightForSection={() => 36}
                    renderSection={this.renderSection}
                    heightForIndexPath={() => 96}
                    renderIndexPath={this.renderItem}
                />
            </View>
        )
    }

    //左侧数据
    renderIndexes = ({ section: section, row: row }) => {
        const drugList = leftData[section].items[row];
        return (
            <TouchableOpacity
                ref={this._buttonRefs[section][row]}
                style={styles.indexes}
                onPress={() => {
                    this._listRef
                        .scrollToIndexPath({ section: row, row: -1 }, false)
                        .then();
                }}
            >
                <Text style={{ fontSize: 15}} fontWeight={300}>
                    {drugList.header}
                </Text>
                <View style={styles.line} />
            </TouchableOpacity>
        );
    };
    renderSection = (section: number) => {
        const sectionData = drugLists[section];
        return (
            <View style={styles.section}>
                <Text style={styles.sectionText} fontWeight={300}>
                    {sectionData.header}
                </Text>
            </View>
        );
    };

    renderItem = ({ section: section, row: row }) => {
        let drugList = drugLists[section].items[row];
        return (
            <View>
                <View style={styles.renderItemCell}>

                    <View style={{
                        flex: 1,
                        marginLeft: 20,
                        marginTop: 10
                    }}>
                        <Text style={{ fontSize: 15 }} fontWeight={300}>
                            {drugList.title}
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: commonStyle.categoryDrankGray
                        }}>
                            {drugList.subtitle}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{
                                fontSize: 14,
                                color: commonStyle.categoryDrankGray
                            }}>
                                {drugList.sales}
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                color: commonStyle.categoryDrankGray,
                                marginLeft: 10
                            }}>
                                {drugList.praise}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: commonStyle.red
                            }}>
                                {drugList.prise}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "rgb(232,191,106)",
                                    borderRadius: 5,
                                    marginRight: 16
                                }}
                                onPress={() => this.onBuy(drugCategory)}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    marginHorizontal: 5
                                }}>
                                    购买
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {row < drugLists[section].items.length - 1 &&
                <View style={styles.rowLine} />}
            </View>
        );
    };

    onBuy = () => {
        console.log("buy");
    };

}

const styles = StyleSheet.create({
    listViewContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor:commonStyle.white,
        marginBottom: 100
    },
    typeItem: {
        flexDirection: "row",
        alignItems:"center",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: commonStyle.lightGray,
        backgroundColor:commonStyle.lightGray
    },
    itemWrap: {
        paddingTop: 12,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: commonStyle.paper,
        backgroundColor: commonStyle.white,
        paddingHorizontal: 12
    },
    item: {
        flexDirection: "row"
    },
    label: {
        height: LABEL_HEIGHT,
        paddingLeft: 10,
        justifyContent: "center",
        backgroundColor: commonStyle.paper,
        borderLeftWidth: 3,
        borderLeftColor: commonStyle.gray
    },
    active: {
        borderLeftWidth: 3,
        borderLeftColor: commonStyle.primary,
        paddingLeft: 7,
        backgroundColor: commonStyle.white,
        borderBottomColor: commonStyle.white,
    },
    addBtn: {
        backgroundColor: "transparent",
        position: "absolute",
        right: 4,
        bottom: 4,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    priceView: {
        flexDirection:"row",
        backgroundColor:"transparent",
        position: "absolute",
        right: 34,
        bottom: 4,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    lc: {
        flex: 1
    },
    rc: {
        backgroundColor:commonStyle.categoryGray,
        flex: 1,
        flexGrow: 3,
    },
    indexes: {
        backgroundColor: commonStyle.categoryGray,
        justifyContent: "center",
        alignItems: "center"
    },
    line: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        backgroundColor: commonStyle.categoryGray
    },
    //头标题
    section: {
        flex: 1,
        backgroundColor: commonStyle.categoryGray,
        justifyContent: "center"
    },
    //cell文字位置
    sectionText: {
        marginLeft: 10,
        fontSize: 15
    },
    rowLine: {
        height: 1,
        backgroundColor: commonStyle.categoryGray,
        marginLeft: 16
    },
    //右侧cell的大小
    renderItemCell: {
        flex: 1,
        flexDirection: "row",
        backgroundColor:commonStyle.white,
        marginRight:10
    }
})

export default GoodsList
