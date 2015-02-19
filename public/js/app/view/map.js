define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/base'
], function ($, Handlebars, BaseView) {
    return BaseView.extend({
        initialize: function () {
            var that = this;
            BaseView.prototype.initialize.apply(that, arguments);
            var map = new ymaps.Map("map", {
                center: [55.753559, 37.609218 ], // москва
                zoom: 12,
                controls: ["zoomControl"]
            });

            that.viewModel.set('map', map);
        }
    });
});
