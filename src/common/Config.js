
/**
 * Created by zhagbo on 2019/9/18.
 */
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get("window");

/**
 * 主题
 */
export const theme = {
    width: width,                                       //屏幕宽度
    height: height,                                     //屏幕高度
    primaryColor: '#5FA9FF',                            // 导航
    backgroundColor: '#FFF',                             //白色
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    }
}
