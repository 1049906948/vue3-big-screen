import {IMenubarList} from "@/type/store/layout";

export const route:Array<IMenubarList> = [
    {
        id: 2,
        parentId: 0,
        name: 'home',
        path: '/home',
        component: 'Layout',
        meta: { title: '首页', icon: 'el-icon-phone' },
    },
    {
        id: 2,
        parentId: 0,
        name: 'admin',
        path: '/admin',
        component: 'Layout',
        meta: { title: '权限管理', icon: 'el-icon-phone' },
        children:[
            {
                id: 20,
                parentId: 2,
                name: 'user',
                path: '/admin/user',
                component: 'admin',
                meta: { title: '用户管理', icon: 'el-icon-goods' }
            },
            {
                id: 21,
                parentId: 2,
                name: 'menu',
                path: '/admin/menu',
                component: 'admin',
                meta: { title: '菜单管理', icon: 'el-icon-question'}
            },
        ]
    },


    {
        id: 22,
        parentId: 2,
        name: 'ProjectImport',
        path: '/Project/ProjectImport',
        component: 'ProjectImport',
        meta: { title: '项目导入', icon: 'el-icon-help' }
    },
    {
        id: 3,
        parentId: 0,
        name: 'Nav',
        path: '/Nav',
        component: 'Layout',
        redirect: '/Nav/SecondNav/ThirdNav',
        meta: { title: '多级导航', icon: 'el-icon-picture' }
    },
    {
        id: 30,
        parentId: 3,
        name: 'SecondNav',
        path: '/Nav/SecondNav',
        redirect: '/Nav/SecondNav/ThirdNav',
        component: 'SecondNav',
        meta: { title: '二级导航', icon: 'el-icon-camera', alwaysShow: true }
    },
    {
        id: 300,
        parentId: 30,
        name: 'ThirdNav',
        path: '/Nav/SecondNav/ThirdNav',
        component: 'ThirdNav',
        meta: { title: '三级导航', icon: 'el-icon-platform' }
    },
    {
        id: 31,
        parentId: 3,
        name: 'SecondText',
        path: '/Nav/SecondText',
        redirect: '/Nav/SecondText/ThirdText',
        component: 'SecondText',
        meta: { title: '二级文本', icon: 'el-icon-opportunity', alwaysShow: true }
    },
    {
        id: 310,
        parentId: 31,
        name: 'ThirdText',
        path: '/Nav/SecondText/ThirdText',
        component: 'ThirdText',
        meta: { title: '三级文本', icon: 'el-icon-menu' }
    },
    {
        id: 4,
        parentId: 0,
        name: 'Components',
        path: '/Components',
        component: 'Layout',
        redirect: '/Components/OpenWindowTest',
        meta: { title: '组件测试', icon: 'el-icon-phone' }
    },
    {
        id: 40,
        parentId: 4,
        name: 'OpenWindowTest',
        path: '/Components/OpenWindowTest',
        component: 'OpenWindowTest',
        meta: { title: '选择页', icon: 'el-icon-goods' }
    },
    {
        id: 41,
        parentId: 4,
        name: 'CardListTest',
        path: '/Components/CardListTest',
        component: 'CardListTest',
        meta: { title: '卡片列表', icon: 'el-icon-question-filled' }
    },
    {
        id: 42,
        parentId: 4,
        name: 'TableSearchTest',
        path: '/Components/TableSearchTest',
        component: 'TableSearchTest',
        meta: { title: '表格搜索', icon: 'el-icon-question-filled' }
    },
    {
        id: 43,
        parentId: 4,
        name: 'ListTest',
        path: '/Components/ListTest',
        component: 'ListTest',
        meta: { title: '标签页列表', icon: 'el-icon-question-filled' }
    },
    {
        id: 5,
        parentId: 0,
        name: 'Permission',
        path: '/Permission',
        component: 'Layout',
        redirect: '/Permission/Directive',
        meta: { title: '权限管理', icon: 'el-icon-phone', alwaysShow: true }
    },
    {
        id: 50,
        parentId: 5,
        name: 'Directive',
        path: '/Permission/Directive',
        component: 'Directive',
        meta: { title: '指令管理', icon: 'el-icon-goods' }
    }
]


