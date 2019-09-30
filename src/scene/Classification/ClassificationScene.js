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
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  TextInput,
  TouchableHighlight
} from "react-native";
import {
  NavigationItem,
  Separator,
  SpacingView
} from '../../widget';
import {
  commonStyle
} from '../../widget/commonStyle'

import { drugCategorys } from "./DataSource";
import {LargeList} from "react-native-largelist-v3";
import LocalImg from '../../common/commonImages';
import {Paragraph} from "../../widget/Text";

const leftData = [{items: drugCategorys}];
let {width, height} = Dimensions.get('window')

class ClassificationScene extends PureComponent<Props, State> {

  static navigationOptions = ({ navigation }: any) => ({
    headerStyle: {
      backgroundColor: commonStyle.blue
    },

    headerTitle: (
        <View style={styles.searchBoxView}>
          <Image source={LocalImg.search_icon}
                 style={styles.searchIcon}
          />
          <TextInput
              keyboardType='web-search'
              placeholder='搜索药品名称，满68元包邮'
              style={styles.inputText}
              underlineColorAndroid='transparent' />
          <Image source={LocalImg.voice_icon} style={styles.voiceIcon}/>
        </View>
    ),

  })
  _listRef: LargeList;
  indexes: LargeList;
  _buttonRefs: [] = [];

  constructor(props) {
    super(props);
    for (let s = 0; s < drugCategorys.length; ++s) {
      const refs = [];
      for (let r = 0; r < drugCategorys[s].items.length; ++r) {
        refs.push(React.createRef());
      }
      this._buttonRefs.push(refs);
    }

    this.state = { //状态机变量声明
      indexCell: 0,
    }
  }
  render() {
    const buttons = [];
    this._buttonRefs.forEach(btn => buttons.concat(btn));
    return (
        <View style={styles.container}>
          <LargeList
              style={styles.lc}
              ref={ref => (this.indexes = ref)}
              showsVerticalScrollIndicator={false}
              // bounces={false}
              data={leftData}
              heightForIndexPath={() => 50}
              renderIndexPath={this.renderIndexes}
          />
          <LargeList
              ref={ref => (this._listRef = ref)}
              style={styles.rc}
              data={drugCategorys}
              heightForSection={() => 100}
              renderSection={this.renderSection}
              heightForIndexPath={() => 96}
              renderIndexPath={this.renderItem}
          />
        </View>
    );
  }


  renderIndexes = ({ section: section, row: row }) => {
    const drugCategory = leftData[section].items[row];

    return (
        <TouchableHighlight
            ref={this._buttonRefs[section][row]}
            style={styles.indexes}
            underlayColor = {commonStyle.gray}
            onPress={() => {
              this._listRef
                  .scrollToIndexPath({ section: row, row: -1 }, true)
                  .then();
            }}
        >
          <Text style={{
            fontSize: 14,
            color: commonStyle.blue
          }} fontWeight={300}>
            {drugCategory.header}
          </Text>
          {/*<View style={styles.line} />*/}
        </TouchableHighlight>
    );
  };

  renderSection = (section: number) => {
    const sectionData = drugCategorys[section];
    return (
        <View style={styles.section}>
          <Image source={LocalImg.home_bg_icon}
                 style={{
                   height: 62,
                   width: 272,
                   marginRight: 15
                 }} />
          <Text style={styles.sectionText}
                fontWeight={300}>
            {sectionData.header}
          </Text>
        </View>
    );
  };

  renderItem = ({ section: section, row: row }) => {
    let drugCategory = drugCategorys[section].items[row];
    return (
        <View>
          <View style={styles.renderItemCell}>
            <View style={{
              backgroundColor: commonStyle.white,
              width: (width-14)/4,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <Image source={LocalImg.drugs_icon}
                     style={{
                       width: 50,
                       height: 50,
                     }}
              />
              <Text style={{
                textAlign: 'center',
                fontSize: 12,
                margin: 5,
              }}>
                {drugCategory.title}
              </Text>
            </View>

            <View style={{
              backgroundColor: commonStyle.white,
              width: (width-14)/4,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <Image source={LocalImg.drugs_icon}
                     style={{
                       width: 50,
                       height: 50,
                     }}
              />
              <Text style={{
                textAlign: 'center',
                fontSize: 12,
                margin: 5,
              }}>
                {drugCategory.title}
              </Text>
            </View>
            <View style={{
              backgroundColor: commonStyle.white,
              width: (width-14)/4,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <Image source={LocalImg.drugs_icon}
                     style={{
                       width: 50,
                       height: 50,
                     }}
              />
              <Text style={{
                textAlign: 'center',
                fontSize: 12,
                margin: 5,
              }}>
                {drugCategory.title}
              </Text>
            </View>
          </View>
          {row < drugCategorys[section].items.length - 1 &&
          <View style={styles.rowLine} />}
        </View>
    );
  };

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  searchBoxView: {
    height: 30,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 30,
    backgroundColor: commonStyle.white,
    alignItems: 'center',
    marginLeft: 48,
    marginRight: 52,
    justifyContent: 'space-between'
  },
  searchIcon: {
    marginLeft: 6,
    marginRight: 6,
    width: 16.7,
    height: 16.7,
    resizeMode: 'stretch'
  },
  inputText: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  voiceIcon: {
    marginLeft: 5,
    marginRight: 10,
    width: 15,
    height: 20,
    resizeMode: 'stretch'
  },
  lc: {
    flex: 1
  },
  rc: {
    backgroundColor:commonStyle.categoryGray,
    flex: 1,
    flexGrow: 3,
  },
  indexes: {
    backgroundColor: commonStyle.white,
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: commonStyle.red
  },
  //头标题
  section: {
    flex: 1,
    marginRight: 10,
    backgroundColor: commonStyle.categoryGray,
    justifyContent: 'space-between'

  },
  //cell文字位置
  sectionText: {
    margin: 10,
    fontSize: 13,
    alignItems:'center'
  },
  rowLine: {
    height: 1,
    backgroundColor: commonStyle.categoryGray,
    marginLeft: 16
  },
  //右侧cell的大小
  renderItemCell: {
    flex: 1,
    flexDirection: "row",
    backgroundColor:commonStyle.white,
    marginRight:10
  }
});


export default ClassificationScene
