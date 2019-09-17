/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native'
import {
  Heading2,
  Heading3,
  Paragraph
} from './Text'
import Separator from './Separator';
import {
  screen,
  system
} from '../common';

type Props = {
  image?: any,
  style?: ViewPropTypes.style,
  title: string,
  name: string,
  secondsWeBoys: string,
  remainTimer:string,
  subtitle?: string,
  subNames?: string,
  rightImage?: any,
  onPress: Function,
}

class DetailCell extends PureComponent<Props> {
  render() {
    let icon = this.props.image &&
        <Image style={styles.icon} source={this.props.image} />
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
          <View style={[styles.content, this.props.style]}>
            {icon}
            <Heading3 style={styles.commons}>{this.props.title}</Heading3>
            <Heading3 style={styles.nameCommons}>{this.props.name}</Heading3>
            <View style={{
              flex: 1,
              backgroundColor: 'blue' }}
            />
            <Paragraph style={{
              marginRight:20,
              flexDirection:'row',
              justifyContent: 'flex-start'
            }}>
              {this.props.secondsWeBoys}
            </Paragraph>
            <Paragraph style={{
              color: '#999999',
              marginRight:20,
              flexDirection:'row',
              justifyContent: 'flex-start'
            }}>
              {this.props.remainTimer}
            </Paragraph>
            <Paragraph style={{ color: '#999999' }}>
              {this.props.subtitle}
            </Paragraph>
            <Paragraph style={{ color: '#c12529' }}>
              {this.props.subNames}
            </Paragraph>
            <Image style={styles.rightIcon}
                   source={this.props.rightImage}
            />
          </View>

          <Separator />
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  commons: {
    fontSize: 16,
    color: "#030303",
    fontWeight:'900'
  },
  nameCommons: {
    fontSize: 16,
    color: "#c12529",
    fontWeight:'900'
  },
  rightIcon: {
    width: 14,
    height: 14,
    marginLeft: 5,
  }
})


export default DetailCell
