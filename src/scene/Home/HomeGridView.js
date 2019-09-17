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
  StyleSheet
} from 'react-native';
import {
  commonStyle
} from '../../widget/commonStyle';
import {
  screen
} from '../../common';
import HomeGridItem from './HomeGridItem'

type Props = {
  infos: Array<Object>,
  onGridSelected: Function,
}


class HomeGridView extends PureComponent<Props> {

  static defaultProps = {
    infos: []
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.infos.map((info, index) => (
          <HomeGridItem
            info={info}
            key={index}
            onPress={() => this.props.onGridSelected(index)}
          />
        ))}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTopWidth: screen.onePixel,
    borderLeftWidth: screen.onePixel,
    borderColor: commonStyle.border
  },
})


export default HomeGridView
