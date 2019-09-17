/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *
 * @flow
 */

import screen from './screen'
import system from './system'
import {Dimensions} from 'react-native'

const deviceH = Dimensions.get('window').height
const deviceW = Dimensions.get('window').width

const basePx = 375

export {screen, system}

export default function px2dp(px) {
    return px *  deviceW / basePx
}
