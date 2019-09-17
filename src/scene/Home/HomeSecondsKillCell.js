/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *
 * @flow
 */


import React, {
    PureComponent
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import PageControl from 'react-native-page-control'

import {
    screen,
    system
} from '../../common';
import { commonStyle } from '../../widget/commonStyle'
import HomeSecondsKillItem from './HomeSecondsKillItem'

type Props = {
    secondsKillInfos: Array<Object>,
    onSecondsKillSelected: Function,
}

type State = {
    currentPage: number
}


class HomeSecondsKillCell extends PureComponent<Props, State>  {

    constructor(props: Object) {
        super(props)

        this.state = {
            currentPage: 0
        }
    }

    render() {
        let { secondsKillInfos, onSecondsKillSelected } = this.props

        let secondsKillItems = secondsKillInfos.map(
            (info, i) => (
                <HomeSecondsKillItem
                    key={info.title}
                    title={info.title}
                    icon={info.icon}
                    discountPrice={info.discountPrice}
                    originalPrice={info.originalPrice}
                    onPress={() => {
                        onSecondsKillSelected && onSecondsKillSelected(i)
                    }}
                />
            )
        )

        let secondsKillViews = []
        let pageCount = Math.ceil(secondsKillItems.length /4)

        for (let i = 0; i < pageCount; i++) {
            let killItems = secondsKillItems.slice(i * 4, i * 4 + 10)

            let secondsKillView = (
                <View style={styles.secondsKillsView} key={i}>
                    {killItems}
                </View>
            )
            secondsKillViews.push(secondsKillView)
        }
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={(e) => this.onScroll(e)}>
                    <View style={styles.menuContainer}>
                        {secondsKillViews}
                    </View>
                </ScrollView>

                {/*<PageControl*/}
                {/*    style={styles.pageControl}*/}
                {/*    numberOfPages={pageCount}*/}
                {/*    currentPage={this.state.currentPage}*/}
                {/*    hidesForSinglePage*/}
                {/*    pageIndicatorTintColor='gray'*/}
                {/*    currentPageIndicatorTintColor={color.primary}*/}
                {/*    indicatorSize={{ width: 8, height: 8 }}*/}
                {/*/>*/}
            </View>

        )
    }

    onScroll(e: any) {
        let x = e.nativeEvent.contentOffset.x
        let currentPage = Math.round(x / screen.width)

        console.log('onScroll  ' + e.nativeEvent.contentOffset.x + '  page ' + currentPage + '  current ' + this.state.currentPage)
        if (this.state.currentPage != currentPage) {
            this.setState({
                currentPage: currentPage
            })
        }
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyle.white,
    },
    menuContainer: {
        flexDirection: 'row',
    },
    secondsKillsView: {
        flexDirection: 'row',
        width: screen.width,
    },
    pageControl: {
        margin: 10,
    }
})


export default HomeSecondsKillCell
