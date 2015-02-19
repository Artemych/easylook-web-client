define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/base',
    'text!app/template/shared/footer.html'
], function ($, Handlebars, BaseView, footerTemplate) {
    return BaseView.extend({
        el: '.footer',
        template: Handlebars.compile(footerTemplate)
    });
});