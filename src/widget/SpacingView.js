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
  StyleSheet
} from 'react-native';

import {commonStyle} from './commonStyle'


class SpacingView extends PureComponent<{}> {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: 14,
    backgroundColor: commonStyle.paper,
  },
})


export default SpacingView
