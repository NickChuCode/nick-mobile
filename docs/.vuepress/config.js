module.exports = {
    title: 'vn-Mobile',
    description: '一个好用的 UI 组件库',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '快速上手', link: '/get-started/' },
            { text: '安装', link: '/install/' },
            { text: '所有组件', link: '/components/' },
        ],
        sidebar: [
            '/',
            {
                title: '入门',
                children: [
                    '/get-started/',
                    '/install/',
                ]
            },
            {
                title: '组件',
                children: [
                    '/components/button.md'
                ]
            }
        ]
    }
}
