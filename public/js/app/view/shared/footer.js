define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'text!app/template/shared/footer.html'
], function ($, Handlebars, BaseView, footerTemplate) {
    return BaseView.extend({
        el: '.footer',
        template: Handlebars.compile(footerTemplate),
        events: {
            'click .min-logo': 'minLogoClicked',
            'click .print-screen': 'printScreen',
            'click .refresh': 'refreshData'
        },

        minLogoClicked: function () {
            window.location = '/trackers/tracker'
        },

        printScreen: function () {
            alert("Функционал находится в разработке");
        },

        refreshData: function() {
            this.viewModel.trigger('refreshData');
        }
    });
});