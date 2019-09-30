/** @format */

import React, { PureComponent } from 'react'
import {AppRegistry} from 'react-native';

import RootScene from './src/RootScene';

export default class CZMall extends PureComponent {
  render() {
    return (
      <RootScene />
    );
  }
}
AppRegistry.registerComponent('CZMall', () => CZMall);
