define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/base',
    'text!app/template/shared/secondary-header.html'
], function ($, Handlebars, BaseView, secondaryHeaderTemplate) {
    return BaseView.extend({
        el: '.second-header',
        template: Handlebars.compile(secondaryHeaderTemplate)
    });
});