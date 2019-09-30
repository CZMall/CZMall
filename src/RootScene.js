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

/*登录注册*/
import LoginScene from './scene/Login/Login';
import RegisterScene from './scene/Register/Register';
import ForgetScene from './scene/ForgetPassword/Forget';

import HomeScene from './scene/Home/HomeScene';
import OrderScene from './scene/Order/OrderScene';
import NearbyScene from './scene/Nearby/NearbyScene';
import Circle from './scene/circle/Circle'
import CircleDetail from './scene/circle/CircleDetail'

import Scan from './scene/Home/Scan';
import Prescription from './scene/Home/Prescription'
import Camera from './scene/Home/Camera'
import ExaminationPassed from './scene/Home/ExaminationPassed'
import SelectPeople from './scene/Home/SelectPeople'
import PeopleManagement from './scene/Home/PeopleManagement'
import Search from './scene/Home/Search'
import City from './scene/CityList'

import CartScene from './scene/Cart/CartScene';
import UploadRecipe from './scene/Cart/UploadRecipe';
import OrderCenter from './scene/Cart/OrderCenter';
import SuccessPay from './scene/Cart/SuccessPay';
import FillOrder from './scene/Cart/FillOrder';
import SubmitOrder from './scene/Cart/SubmitOrder';
import Payway from './scene/Cart/Payway';
import MerchantReceive from './scene/Cart/MerchantReceive';
import OrderFinish from './scene/Cart/OrderFinish';
import Evaluate from './scene/Cart/Evaluate'

import MineScene from './scene/Mine/MineScene';
import MineOrderTab from  './scene/Mine/MineOrderTab'
import MineViewCell from './scene/Mine/MineViewCell'

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
      screen: createStackNavigator({ Circle: Circle }),
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
    Classification: { screen: ClassificationScene },
    Login:{screen:LoginScene, },
    Register:{screen:RegisterScene},
    Forget:{screen:ForgetScene},
    UploadRecipe:{screen: UploadRecipe},
    MineViewCell:{screen:MineViewCell},
    OrderCenter:{screen:OrderCenter},
    SuccessPay:{screen:SuccessPay},
    FillOrder:{screen:FillOrder},
    MineOrderTab:{screen:MineOrderTab},
    SubmitOrder:{screen:SubmitOrder},
    Payway:{screen:Payway},
    MerchantReceive:{screen:MerchantReceive},
    OrderFinish:{screen:OrderFinish},
    Evaluate:{screen:Evaluate},
    Scan:{screen:Scan},
    Prescription:{screen:Prescription},
    Camera:{screen:Camera},
    ExaminationPassed:{screen:ExaminationPassed},
    SelectPeople:{screen:SelectPeople},
    PeopleManagement:{screen:PeopleManagement},
    Search:{screen:Search,navigationOptions:{header:null}},
    City:{screen:City},
    CircleDetail:{screen:CircleDetail},

    BusinessDetails: { screen: BusinessDetails},
    GoodsDetails: { screen: GoodsDetails},
    MorePharmacy: { screen: MorePharmacy},
  },
  {
      initialRouteName: 'Tab',
      headerLayoutPreset: "center",

      defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: commonStyle.black,
      showIcon: true,
    },
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default RootScene
