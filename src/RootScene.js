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
            normalImage={LocalImg.homepage_normal}
            selectedImage={LocalImg.homepage_selected}
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
            normalImage={LocalImg.merchant_normal}
            selectedImage={LocalImg.merchant_selected}
          />
        )
      }),
    },

    Order: {
      screen: createStackNavigator({ Order: OrderScene }),
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '觅Me',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={LocalImg.find_me_normal}
            selectedImage={LocalImg.find_me_selected}
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
                normalImage={LocalImg.cart_normal}
                selectedImage={LocalImg.cart_selected}
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
            normalImage={LocalImg.mine_normal}
            selectedImage={LocalImg.merchant_selected}
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
    Classification: { screen: ClassificationScene },
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
