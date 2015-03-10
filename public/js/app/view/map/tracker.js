define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'text!app/template/map/tracker.html'
], function ($, Handlebars, BaseView, tracker) {
    return BaseView.extend({
        className: 'tracker',
        template: Handlebars.compile(tracker),

        events: {
            'click .tracker-icon-eye': 'togglePlaceMark',
            'click .tracker-icon-compass': 'setCurrentTracker'
        },

        togglePlaceMark: function (e) {
            var $clickedEl = $(e.target),
                placeMark = $('.map-icon[data-id=' + this.model.get('id') +']');

            $($clickedEl).toggleClass('active', !$($clickedEl).hasClass('active'));
            placeMark.toggleClass('hide', !placeMark.hasClass('hide'));
        },

        setCurrentTracker: function (e) {
            var $clickedEl = $(e.target),
                isActive = $clickedEl.hasClass('active'),
                map = this.viewModel.get('map'),
                periodicData = this.viewModel.get('periodic')
                    .getDataByTrackerId(this.model.get('id'));

            this.$('.tracker-icon-compass').removeClass('active');

            if (isActive) {
                this.viewModel.unset('currentTracker');
            } else {
                $clickedEl.addClass('active');
                map.setCenter([periodicData.get('lat'), periodicData.get('lng')]);
                map.setZoom(14);
                this.viewModel.set('currentTracker', this.model);
            }
        }
    });
});
