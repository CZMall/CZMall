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
import HomeClassificationItem from './HomeClassificationItem'
import {
    commonStyle
} from '../../widget/commonStyle';

type Props = {
    classificationInfos: Array<Object>,
    onClassificationSelected: Function,
}

class HomeClassificationView extends PureComponent<Props>  {

    constructor(props: Object) {
        super(props)
    }

    render() {
        let {
            classificationInfos,
            onClassificationSelected
        } = this.props

        let classificationItems = classificationInfos.map(
            (info, i) => (
                <HomeClassificationItem
                    key={info.title}
                    title={info.title}
                    icon={info.icon}
                    onPress={() => {
                        onClassificationSelected && onClassificationSelected(i)
                    }}
                />
            )
        )

        let classificationViews = []

        for (let i = 0; i < Math.ceil(classificationItems.length / 10); i++) {
            let items = classificationItems.slice(i * 10, i * 10 + 10)

            let classificationView = (
                <View style={styles.itemsView} key={i}>
                    {items}
                </View>
            )
            classificationViews.push(classificationView)
        }
        return (
            <View style={styles.container}>
                <View style={styles.ClassificationContainer}>
                    {classificationViews}
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


export default HomeClassificationView
