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
    Heading3
} from '../../widget/Text';
import {
    screen
} from '../../common';

type Props = {
    onPress: Function,
    icon: any,
    title: string,
}

class HomeClassificationItem extends PureComponent<Props> {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              onPress={this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon} />
                <Heading3>
                    {this.props.title}
                </Heading3>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 5,
        height: screen.width / 5,
    },
    icon: {
        width: screen.width / 9,
        height: screen.width / 9,
        margin: 5,
    }
});

export default HomeClassificationItem;
