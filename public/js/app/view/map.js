define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/base',
    'text!app/template/map/index.html'
], function ($, Handlebars, BaseView, mapTemplate) {
    return BaseView.extend({
        el: '#container',

        template: Handlebars.compile(mapTemplate),

        templateData: function () {
            return {
                test: 'test string'
            }
        }
    });
});
