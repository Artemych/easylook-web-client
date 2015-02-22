define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base'
], function ($, Handlebars, BaseView) {
    return BaseView.extend({
        initialize: function () {
            var that = this;
            BaseView.prototype.initialize.apply(that, arguments);

            (function fetchPeriodic () {
                window.setTimeout(function () {
                    that.viewModel.get('periodic').fetch({
                       success: function() {
                           that.setCurrentTrackerData();
                           fetchPeriodic();
                       }
                    });
                }, 30000);
            })();

            var map = new ymaps.Map("map", {
                center: [55.753559, 37.609218 ], // москва
                zoom: 12,
                controls: ["zoomControl"]
            });

            that.viewModel.set('map', map);
        },

        setCurrentTrackerData: function () {
            var currentTracker = this.viewModel.get('currentTracker');
            this.viewModel.unset('currentTrackerData');

            if (!currentTracker) {
                return;
            }

            var currentTrackerData = this.viewModel.get('periodic')
                .getDataByTrackerId(currentTracker.get('id'));

            this.viewModel.set('currentTrackerData', currentTrackerData);
        }
    });
});
