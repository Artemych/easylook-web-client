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
            'click .tracker-icon-eye': 'togglePlaceMark'
        },

        togglePlaceMark: function (e) {
            var $clickedEl = $(e.target);
            $($clickedEl).toggleClass('active', !$($clickedEl).hasClass('active'));
            /*
             var dataId = $(this).data('id');
             var placeMark = $('.map-icon[data-id=' + dataId +']');
             placeMark.toggleClass('hide', !placeMark.hasClass('hide'));
             */
        }
    });
});
