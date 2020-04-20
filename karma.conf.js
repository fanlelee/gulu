var webpackConfig = require('@vue/cli-service/webpack.config.js')
const path = require('path')

module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],

        files: [
            'tests/**/*.spec.js',
            'src/**/*.vue'
        ],

        preprocessors: {
            '**/*.spec.js': ['webpack', 'sourcemap','coverage'],
            'src/**/*.vue': ['webpack', 'sourcemap','coverage']
        },

        webpack: webpackConfig,

        reporters: ['spec', 'coverage'],
        coverageReporter: {
            dir: './coverage',
            reporters: [
                {type: 'lcov', subdir: '.'},
                {type: 'text-summary'}
            ]
        },
        autoWatch: true,

        browsers: ['ChromeHeadless']
    })
}