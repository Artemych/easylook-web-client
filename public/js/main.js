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
        }
    },
    paths: {
        text: 'lib/text'
    }
});