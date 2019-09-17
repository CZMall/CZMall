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
    StyleSheet} from 'react-native';

import {
    screen
} from '../../common';
import MineViewItem from './MineViewItem'
import {
    commonStyle
} from '../../widget/commonStyle';
type Props = {
    mineViewInfos: Array<Object>,
    onMineViewSelected: Function,
}

class MineViewCell extends PureComponent<Props>  {

    constructor(props: Object) {
        super(props)
    }

    render() {
        let {
            mineViewInfos,
            onMineViewSelected
        } = this.props

        let mineViewItems = mineViewInfos.map(
            (info, i) => (
                <MineViewItem
                    key={info.title}
                    title={info.title}
                    icon={info.icon}
                    onPress={() => {
                        onMineViewSelected && onMineViewSelected(i)
                    }}
                />
            )
        )

        let mineViews = []

        for (let i = 0; i < Math.ceil(mineViewItems.length / 10); i++) {
            let items = mineViewItems.slice(i * 10, i * 10 + 10)

            let mineView = (
                <View style={styles.itemsView} key={i}>
                    {items}
                </View>
            )
            mineViews.push(mineView)
        }
        return (
            <View style={styles.container}>
                <View style={styles.ClassificationContainer}>
                    {mineViews}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: commonStyle.white,
    },
    ClassificationContainer: {
        flexDirection: 'row',
    },
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screen.width
    }
});


export default MineViewCell
