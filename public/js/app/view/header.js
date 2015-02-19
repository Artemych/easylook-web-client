define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/base',
    'text!app/template/shared/header.html'
], function ($, Handlebars, BaseView, headerTemplate) {
    return BaseView.extend({
        el: '.header',
        template: Handlebars.compile(headerTemplate),

        templateData: function () {
            //@todo fetch data from server
            return {username: "test user"};
        }
    });
});