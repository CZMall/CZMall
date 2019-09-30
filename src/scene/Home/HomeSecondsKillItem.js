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
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import {
    Heading3,
    Paragraph
} from '../../widget/Text';
import {
    screen
} from '../../common';
import {
    commonStyle
} from '../../widget/commonStyle';

type Props = {
    onPress: Function,
    icon: any,
    title: string,
    discountPrice: string,
    originalPrice: string

}

class HomeSecondsKillItem extends PureComponent<Props> {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              onPress={this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon} />
                <Heading3>
                    {this.props.title}
                </Heading3>
                <Paragraph style={styles.discountPrices}>
                    {this.props.discountPrice}
                </Paragraph>
                <Paragraph  style={styles.originalPrices}>
                    {this.props.originalPrice}
                </Paragraph>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4,
        height: screen.width/2.3,
    },
    icon: {
        width: screen.width / 5,
        height: screen.width / 5,
        margin: 5,
    },
    discountPrices: {
        marginTop:10,
        color: commonStyle.red,
        fontSize: 14,
    },
    originalPrices: {
        fontSize: 14,
        color:'#ececec',
        textDecorationLine: 'line-through'
    }
});


export default HomeSecondsKillItem;
