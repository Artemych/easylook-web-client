define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'app/view/map/tracker-list',
    'app/view/map/tracker-info',
    'app/view/map/tracker-condition',
    'app/view/map/tracker-history'
], function ($, Handlebars, BaseView, TrackerListView, TrackerInfoView, TrackerConditionView, TrackerHistoryView) {
    return BaseView.extend({
        el: '.trackers-wrapper',

        events: {
            'click .tracker-block-title': 'toggle'
        },

        render: function () {
            var that = this;

            new TrackerListView({
                viewModel: that.viewModel,
                collection: that.viewModel.get('groups')
            }).renderTo(that.$el);

            new TrackerInfoView({
                viewModel: that.viewModel,
                collection: that.viewModel.get('icons')
            }).renderTo(that.$el);

            new TrackerConditionView({
                viewModel: that.viewModel
            }).renderTo(that.$el);

            new TrackerHistoryView({
                viewModel: that.viewModel
            }).renderTo(that.$el);
        },

        toggle: function(e) {
            var $clickedEl = $(e.target);
            $clickedEl.parent().toggleClass('active', !$clickedEl.parent().hasClass('active'));
        }
    });
});