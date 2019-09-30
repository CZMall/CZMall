/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *
 * @flow
 */

import React, { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  TabBarBottom
} from 'react-navigation';

import {
  commonStyle
} from './widget/commonStyle';
import TabBarItem from './widget/TabBarItem';

import HomeScene from './scene/Home/HomeScene';
import OrderScene from './scene/Order/OrderScene';
import NearbyScene from './scene/Nearby/NearbyScene';
import CartScene from './scene/Cart/CartScene';
import MineScene from './scene/Mine/MineScene';

import WebScene from './widget/WebScene';
import ClassificationScene from './scene/Classification/ClassificationScene';
import BusinessDetails from './scene/Detail/BusinessDetails';
import GoodsDetails from './scene/Detail/GoodsDetails';
import MorePharmacy from './scene/Detail/MorePharmacy';
import LocalImg from './common/commonImages';

const lightContentScenes = ['Home', 'Mine']

function getCurrentRouteName(navigationState: any) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}


class RootScene extends PureComponent<{}> {
  constructor() {
    super()

    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <AppContainer
        onNavigationStateChange={
          (prevState, currentState) => {
            const currentScene = getCurrentRouteName(currentState)
            const previousScene = getCurrentRouteName(prevState)
            if (previousScene !== currentScene) {
              if (lightContentScenes.indexOf(currentScene) >= 0) {
                StatusBar.setBarStyle('light-content')
              } else {
                StatusBar.setBarStyle('dark-content')
              }
            }
          }
        }
      />
    )
  }
}

const Tab = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({ Home: HomeScene }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={LocalImg.home_page_normal}
            selectedImage={LocalImg.home_page_selected}
          />
        )
      }),
    },
    Nearby: {
      screen: createStackNavigator({ Classification: ClassificationScene }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '分类',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={LocalImg.classification_normal}
            selectedImage={LocalImg.classification_selected}
          />
        )
      }),
    },

    Order: {
      screen: createStackNavigator({ Order: OrderScene }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '圈子',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={LocalImg.circle_normal}
            selectedImage={LocalImg.circle_selected}
          />
        )
      }),
    },

    Cart: {
      screen: createStackNavigator({ Cart: CartScene }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '购物车',
        tabBarIcon: ({ focused, tintColor }) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={LocalImg.shopping_cart_normal}
                selectedImage={LocalImg.shopping_cart_selected}
            />
        )
      }),
    },

    Mine: {
      screen: createStackNavigator({ Mine: MineScene }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={LocalImg.my_normal}
            selectedImage={LocalImg.my_selected}
          />
        )
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: true,
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: commonStyle.primary,
      inactiveTintColor: commonStyle.gray,
      style: { backgroundColor: commonStyle.white },
    },
  }
)

Tab.navigationOptions = {
  header: null,
};

const AppNavigator = createStackNavigator(
  {
    Tab: { screen: Tab },
    Web: { screen: WebScene },
    BusinessDetails: { screen: BusinessDetails},
    GoodsDetails: { screen: GoodsDetails},
    MorePharmacy: { screen: MorePharmacy},
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: commonStyle.black,
      showIcon: true,
    },
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default RootScene
