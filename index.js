/** @format */

import React, { PureComponent } from 'react'
import {AppRegistry} from 'react-native';

import RootScene from './src/RootScene';

export default class CZMall extends PureComponent<Props, State> {
  render() {
    return (
      <RootScene />
    );
  }
}
AppRegistry.registerComponent('CZMall', () => CZMall);
