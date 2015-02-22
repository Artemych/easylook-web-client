define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base-collection',
    'app/view/map/tracker',
    'text!app/template/map/group.html'
], function ($, Handlebars, BaseCollectionView, TrackerView, group) {
    return BaseCollectionView.extend({
        template: Handlebars.compile(group),

        itemView: TrackerView,

        events: {
            'click .tracker-group-title' : 'toggle'
        },

        initialize: function () {
            var that = this;

            BaseCollectionView.prototype.initialize.apply(that, arguments);

            that.collection = that.model.get('trackers');
        },

        toggle: function(e) {
            var $clickedEl = $(e.target);
            $clickedEl.toggleClass('active', !$clickedEl.hasClass('active'));
        }
    });
});
