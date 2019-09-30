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
  Platform
} from "react-native";
import {
  color,
  NavigationItem,
  Separator,
  SpacingView
} from '../../widget';
import {
  commonStyle
} from '../../widget/commonStyle'

import { drugcategorys } from "./DataSource";
import {LargeList} from "react-native-largelist-v3";
import LocalImg from '../../common/commonImages';

const leftData = [{items: drugcategorys}];

class ClassificationScene extends PureComponent<Props, State> {

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: '分类',
    headerStyle: { backgroundColor: commonStyle.white },
    headerRight: (
        <NavigationItem
            icon={LocalImg.navigation_item_share_icon}
            onPress={() => {

            }}
        />
    ),
  })
  _listRef: LargeList;
  indexes: LargeList;
  _buttonRefs: [] = [];

  constructor(props) {
    super(props);
    for (let s = 0; s < drugcategorys.length; ++s) {
      const refs = [];
      for (let r = 0; r < drugcategorys[s].items.length; ++r) {
        refs.push(React.createRef());
      }
      this._buttonRefs.push(refs);
    }
  }
  /*componentDidMount(){
    alert(JSON.stringify(leftData))
  }*/
  render() {
    const buttons = [];
    this._buttonRefs.forEach(btn => buttons.concat(btn));
    return (
        <View style={styles.container}>
          <LargeList
              style={styles.lc}
              ref={ref => (this.indexes = ref)}
              showsVerticalScrollIndicator={false}
              bounces={false}
              data={leftData}
              heightForIndexPath={() => 60}
              renderIndexPath={this.renderIndexes}
          />
          <LargeList
              ref={ref => (this._listRef = ref)}
              style={styles.rc}
              data={drugcategorys}
              heightForSection={() => 36}
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
        <TouchableOpacity
            ref={this._buttonRefs[section][row]}
            style={styles.indexes}
            onPress={() => {
              this._listRef
                  .scrollToIndexPath({ section: row, row: -1 }, false)
                  .then();
            }}
        >
          <Text style={{ fontSize: 15}} fontWeight={300}>
            {drugCategory.header}
          </Text>
          <View style={styles.line} />
        </TouchableOpacity>
    );
  };

  renderSection = (section: number) => {
    const sectionData = drugcategorys[section];
    return (
        <View style={styles.section}>
          <Text style={styles.sectionText} fontWeight={300}>
            {sectionData.header}
          </Text>
        </View>
    );
  };

  renderItem = ({ section: section, row: row }) => {
    let drugCategory = drugcategorys[section].items[row];
    return (
        <View>
          <View style={styles.renderItemCell}>

            <View style={{
              flex: 1,
              marginLeft: 20,
              marginTop: 10
            }}>
              <Text style={{ fontSize: 15 }} fontWeight={300}>
                {drugCategory.title}
              </Text>
              <Text style={{
                fontSize: 14,
                color: commonStyle.categoryDrankGray
              }}>
                {drugCategory.subtitle}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{
                  fontSize: 14,
                  color: commonStyle.categoryDrankGray
                }}>
                  {drugCategory.sales}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: commonStyle.categoryDrankGray,
                  marginLeft: 10
                }}>
                  {drugCategory.praise}
                </Text>
              </View>
              <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
              >
                <Text style={{
                  fontSize: 16,
                  color: commonStyle.red
                }}>
                  {drugCategory.prise}
                </Text>
                <TouchableOpacity
                    style={{
                      backgroundColor: "rgb(232,191,106)",
                      borderRadius: 5,
                      marginRight: 16
                    }}
                    onPress={() => this.onBuy(drugCategory)}
                >
                  <Text style={{
                    fontSize: 16,
                    marginHorizontal: 5
                  }}>
                    购买
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {row < drugcategorys[section].items.length - 1 &&
          <View style={styles.rowLine} />}
        </View>
    );
  };

  onBuy = () => {
    console.log("buy");
  };

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
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
    backgroundColor: commonStyle.categoryGray,
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: commonStyle.categoryGray
  },
  //头标题
  section: {
    flex: 1,
    backgroundColor: commonStyle.categoryGray,
    justifyContent: "center"
  },
  //cell文字位置
  sectionText: {
    marginLeft: 10,
    fontSize: 15
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
