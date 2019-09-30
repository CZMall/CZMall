import {
    PixelRatio
} from 'react-native';
//  mdpi for android
PIXEL_RATIO_160_1 =1;
// hdp from android
PIXEL_RATIO_240_1d5 =1.5;
// iphone4, 4s, 5, 5c, 5s, 6, 7; xhdpi from android
PIXEL_RATIO_320_2 =2;
// iphone6p, 7p; xxhdpi for android,1080p
PIXEL_RATIO_480_3 =3;
// larger from android
PIXEL_RATIO_560_3x5 =3.5;

// 设置基准分辨率
BASE_PIXEL_RATIO =PIXEL_RATIO_480_3;

// 根据密度适配不同的分辨率,参数为dp
export function getDimensbyDP(length) {
    // 获取密度
    let ratio=PixelRatio.get();
    if (length== null) {
        length = 0;
    }
    let result= parseInt(length /(PIXEL_RATION_480_3 /ratio));
    return length /(BASE_PIXEL_RATIO/ ratio);
}

// 根据密度适配不同的分辨率，参数为px
export function getDimensbyPX(length) {
    // 获取密度
    let ratio=PixelRatio.get();
    let dp= length/ ratio;
    return getDimensbyDP(dp);
}
