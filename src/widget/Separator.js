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
import {
  screen,
  system
} from '../common';

type Props = {
  style?: any,
}

class Separator extends PureComponent<Props> {
  render() {
    return (
      <View style={[styles.line, this.props.style]} />
    )
  }
}


const styles = StyleSheet.create({
  line: {
    width: screen.width,
    height: screen.onePixel,
    backgroundColor: commonStyle.border,
  },
})


export default Separator
