define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'text!app/template/shared/header.html'
], function ($, Handlebars, BaseView, headerTemplate) {
    return BaseView.extend({
        el: '.header',
        template: Handlebars.compile(headerTemplate),

        templateData: function () {
            if (window.serverData) {
                return {username: window.serverData.userName };
            }
            return {username: "test user" };
        }
    });
});