/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *  data:2019.09.29
 *
 * @flow
 */

import React, {
    PureComponent
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native'
import {
    NavigationItem,
    SpacingView,
    PharmacyCell,
} from '../../widget';
import LocalImg from '../../common/commonImages'
import {commonStyle} from "../../widget/commonStyle";
import api from "../../api";
import DataSource from "../../DataSource";

let {width, height} = Dimensions.get('window')

type Props = {
    navigation: any,
}

type State = {
    data: Array<Object>,
    refreshState: number,
}

class MorePharmacy extends PureComponent<Props, State> {

    static navigationOptions = ({ navigation }: any) => ({
        headerTitle: (
            <Text style={{
                color: commonStyle.white,
                fontSize: 19,
                textAlign: 'center',
            }}>
                药店
            </Text>
        ),
        headerStyle: { backgroundColor: commonStyle.blue },
        headerTintColor: commonStyle.white,
        headerRight: (
            <NavigationItem
                icon={LocalImg.search_white_icon}
                titleStyle={{ color: commonStyle.white }}
                onPress={() => {

                }}
            />
        ),
    })

    constructor(props: Props) {
        super(props)

        this.state = {
            selected: [],
            lens: {},
            data: [],
            // refreshState: RefreshState.Idle,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.advertisingViewStyle}>
                        <Image source={LocalImg.banner_icon} style={styles.advertisingImageStyle}/>
                    </View>
                    <SpacingView />
                    <View style={styles.selectedViewStyle}>
                        <TouchableOpacity onPress={() => this.comprehensiveSortClicked()}>
                            <Text style={styles.sortTextStyle}>
                                综合排序
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.upOrDownSortClicked()}>
                            <Image source={LocalImg.down_icon} style={styles.downImageStyle}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.distanceClicked()}>
                            <Text style={styles.distanceTextStyle}>
                                距离
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.salesClicked()}>
                            <Text style={styles.salesTextStyle}>
                                销量
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.screeningClicked()}>
                            <Text style={styles.screeningTextStyle}>
                                筛选
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.screenImageClicked()}>
                            <Image source={LocalImg.screen_icon} style={styles.screenImageStyle}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.shopViewStyle}>
                        {this.onAllHarmacy()}
                    </View>
                </ScrollView>
            </View>
        )
    }

    onAllHarmacy() {
        {
            return DataSource.list.map((item, i) => {
                item.onPress = () => {
                    this.props.navigation.push('BusinessDetails')
                }
                return (<PharmacyCell {...item} key={i}/>)
            })
        }
    }

    comprehensiveSortClicked() {
        Alert.alert('综合排序')
    }

    upOrDownSortClicked() {
        Alert.alert('向下')
    }

    distanceClicked() {
        Alert.alert('距离')
    }

    salesClicked() {
        Alert.alert('销量')
    }

    screeningClicked() {
        Alert.alert('筛选')
    }

    screenImageClicked() {
        Alert.alert('筛选图片')
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyle.white,
    },
    advertisingViewStyle: {
        backgroundColor: commonStyle.white,
    },
    advertisingImageStyle: {
        marginTop: 20,
        marginLeft: 10
    },
    selectedViewStyle: {
        flexDirection: 'row',
        backgroundColor: commonStyle.white,
        height: 44
    },
    //综合排序
    sortTextStyle: {
        marginTop: 12,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        height: 20,
        fontFamily: "PingFang-SC-Medium",
    },
    downImageStyle: {
        marginLeft: 6,
        marginTop: 20,
    },
    //距离
    distanceTextStyle: {
        marginTop: 12,
        marginLeft: 28,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        height: 20,
        fontFamily: "PingFang-SC-Medium",
    },
    //销量
    salesTextStyle: {
        marginTop: 12,
        marginLeft: 31,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        height: 20,
        fontFamily: "PingFang-SC-Medium",
    },
    //筛选
    screeningTextStyle: {
        marginTop: 12,
        marginLeft: 94,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        height: 20,
        fontFamily: "PingFang-SC-Medium",
    },
    screenImageStyle: {
        marginLeft: 5,
        marginTop:16
    },
    shopViewStyle: {
        backgroundColor: commonStyle.white,
        // marginTop: 4,
        paddingVertical: 16
    }
})

export default MorePharmacy
