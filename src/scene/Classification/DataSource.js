/**
 * Copyright (c) 2019-present, Zhang Xuelin
 * All rights reserved.
 *
 *
 * @flow
 */

let drugCategorys = [
    {
        header: "按人群找药",
        items: [
            {
                icon: '',
                title: "黄焖鸡米饭",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞4",
                prise: "¥18.86",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖排骨小份",
                subtitle: "含米饭一份",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥18.76",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "加香菇",
                subtitle: "",
                sales: "月销290份",
                praise: "赞4",
                prise: "¥5",
                activity: ""
            },
        ]
    },
    {
        header: "按科室找药",
        items: [
            {
                icon: '',
                title: "泡菜",
                subtitle: "含米饭一份",
                sales: "月销2020份",
                praise: "赞4",
                prise: "¥0.00",
                activity: ""
            },
            {
                icon: '',
                title: "加豆皮",
                subtitle: "",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥3",
                activity: ""
            },
            {
                icon: '',
                title: "加金针菇",
                subtitle: "",
                sales: "月销220份",
                praise: "赞2",
                prise: "¥4",
                activity: ""
            },
            {
                icon: '',
                title: "加青菜",
                subtitle: "",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥3",
                activity: ""
            },
            {
                icon: '',
                title: "加香菇",
                subtitle: "",
                sales: "月销290份",
                praise: "赞4",
                prise: "¥5",
                activity: ""
            },
        ]
    },
    {
        "header": "家庭长备药",
        items:[
            {
                icon: '',
                title: "米饭",
                subtitle: "",
                sales: "月销22000份",
                praise: "赞4",
                prise: "¥2",
                activity: ""
            },
        ]},
    {
        header: "慢性病用药",
        items: [
            {
                icon: '',
                title: "黄焖鸡小份加豆皮",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞4",
                prise: "¥20.86",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖鸡小份加香菇",
                subtitle: "",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥3",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖鸡小份加金针菇",
                subtitle: "",
                sales: "月销220份",
                praise: "赞2",
                prise: "¥4",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖鸡小份加青菜",
                subtitle: "含米饭一份",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥18.76",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "加香菇",
                subtitle: "",
                sales: "月销290份",
                praise: "赞4",
                prise: "¥5",
                activity: ""
            },
        ]
    },
    {
        header: "医疗器材",
        items: [
            {
                icon: '',
                title: "黄焖猪脚小份加香菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞4",
                prise: "¥25.86",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加百事可乐",
                subtitle: "含米饭一份",
                sales: "月销2份",
                praise: "赞1",
                prise: "¥3",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加金针菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞2",
                prise: "¥24",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加豆皮",
                subtitle: "含米饭一份",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥18.76",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加青菜",
                subtitle: "",
                sales: "月销290份",
                praise: "赞4",
                prise: "¥5",
                activity: ""
            },
        ]
    },
    {
        header: "健康家电",
        items: [
            {
                icon: '',
                title: "黄焖猪脚小份加香菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞4",
                prise: "¥25.86",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加百事可乐",
                subtitle: "含米饭一份",
                sales: "月销2份",
                praise: "赞1",
                prise: "¥3",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加金针菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞2",
                prise: "¥24",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加豆皮",
                subtitle: "含米饭一份",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥18.76",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加青菜",
                subtitle: "",
                sales: "月销290份",
                praise: "赞4",
                prise: "¥5",
                activity: ""
            },
        ]
    },
    {
        header: "隐形眼镜",
        items: [
            {
                icon: '',
                title: "黄焖猪脚小份加香菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞4",
                prise: "¥25.86",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加百事可乐",
                subtitle: "含米饭一份",
                sales: "月销2份",
                praise: "赞1",
                prise: "¥3",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加金针菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞2",
                prise: "¥24",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加豆皮",
                subtitle: "含米饭一份",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥18.76",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加青菜",
                subtitle: "",
                sales: "月销290份",
                praise: "赞4",
                prise: "¥5",
                activity: ""
            },
        ]
    },
    {
        header: "成人计生",
        items: [
            {
                icon: '',
                title: "黄焖猪脚小份加香菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞4",
                prise: "¥25.86",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加百事可乐",
                subtitle: "含米饭一份",
                sales: "月销2份",
                praise: "赞1",
                prise: "¥3",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加金针菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞2",
                prise: "¥24",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加豆皮",
                subtitle: "含米饭一份",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥18.76",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加青菜",
                subtitle: "",
                sales: "月销290份",
                praise: "赞4",
                prise: "¥5",
                activity: ""
            },
        ]
    },
    {
        header: "保健滋补",
        items: [
            {
                icon: '',
                title: "黄焖猪脚小份加香菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞4",
                prise: "¥25.86",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加百事可乐",
                subtitle: "含米饭一份",
                sales: "月销2份",
                praise: "赞1",
                prise: "¥3",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加金针菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞2",
                prise: "¥24",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加豆皮",
                subtitle: "含米饭一份",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥18.76",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加青菜",
                subtitle: "",
                sales: "月销290份",
                praise: "赞4",
                prise: "¥5",
                activity: ""
            },
        ]
    },
    {
        header: "母婴用品",
        items: [
            {
                icon: '',
                title: "黄焖猪脚小份加香菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞4",
                prise: "¥25.86",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加百事可乐",
                subtitle: "含米饭一份",
                sales: "月销2份",
                praise: "赞1",
                prise: "¥3",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加金针菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞2",
                prise: "¥24",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加豆皮",
                subtitle: "含米饭一份",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥18.76",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加青菜",
                subtitle: "",
                sales: "月销290份",
                praise: "赞4",
                prise: "¥5",
                activity: ""
            },
        ]
    },
    {
        header: "个人美妆",
        items: [
            {
                icon: '',
                title: "黄焖猪脚小份加香菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞4",
                prise: "¥25.86",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加百事可乐",
                subtitle: "含米饭一份",
                sales: "月销2份",
                praise: "赞1",
                prise: "¥3",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加金针菇",
                subtitle: "含米饭一份",
                sales: "月销220份",
                praise: "赞2",
                prise: "¥24",
                activity: ""
            },
            {
                icon: '',
                title: "黄焖猪脚小份加豆皮",
                subtitle: "含米饭一份",
                sales: "月销20份",
                praise: "赞1",
                prise: "¥18.76",
                activity: "8折优惠，限1份"
            },
            {
                icon: '',
                title: "黄焖猪脚小份加青菜",
                subtitle: "",
                sales: "月销290份",
                praise: "赞4",
                prise: "¥5",
                activity: ""
            },
        ]
    }
];
export { drugCategorys };
