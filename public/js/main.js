define.amd = false;

require.config({
    baseUrl: '/js',
    shim: {
        'lib/jquery': {
            exports: '$'
        },
        'lib/handlebars': {
            exports: 'Handlebars'
        },
        'lib/underscore': {
            exports: '_'
        },
        'lib/backbone': {
            deps: [
                'lib/underscore',
                'lib/jquery'
            ],
            exports: 'Backbone'
        },
        'lib/backbone-relational': {
            deps: ['lib/backbone']
        },
        'lib/backbone-babysitter': {
            deps: [
                'lib/backbone'
            ]
        },
        'lib/backbone-babysitter-propagandist': {
            deps: [
                'lib/backbone-babysitter'
            ]
        },
    },
    paths: {
        text: 'lib/text'
    }
});