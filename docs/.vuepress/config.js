module.exports = {
    base: '/gulu/',
    title: 'UI组件',
    description: '这是一个好用的UI框架',
    themeConfig: {
        sidebar: [
            {
                title: '入门',
                collapsable: false,
                children: ['/install/', '/get-started/']
            },
            {
                title: '组件',
                collapsable: false,
                children: [
                    '/components/icon',
                    '/components/button',
                    '/components/input',
                    '/components/grid',
                    '/components/layout',
                    '/components/toast',
                    '/components/tabs',
                    '/components/popover',
                    '/components/collapse',
                    '/components/cascader',
                    '/components/carousel',
                    '/components/nav',
                    '/components/pager',
                    '/components/validator',
                    '/components/table',
                    '/components/uploader',
                    '/components/sticky',
                    '/components/datepicker',
                    '/components/scroll',
                ]
            }
        ]
    }
}