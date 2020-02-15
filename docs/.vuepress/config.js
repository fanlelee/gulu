module.exports = {
    base: '/gulu/',
    title: 'Gulu组件',
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
                    '/components/button',
                    '/components/collapse',
                    '/components/grid',
                    '/components/input',
                    '/components/layout',
                    '/components/popover',
                    '/components/tabs',
                    '/components/toast',
                ]
            }
        ]
    }
}