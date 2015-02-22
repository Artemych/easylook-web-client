define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base',
    'text!app/template/map/tracker-condition.html'
], function ($, Handlebars, BaseView, trackerCondition) {
    return BaseView.extend({
        className: 'tracker-block',
        template: Handlebars.compile(trackerCondition),

        initialize: function () {
            var that = this;

            BaseView.prototype.initialize.apply(that, arguments);
            that.listenTo(that.viewModel, 'change:currentTracker', that.changeCurrentTrackerInfo);
            that.listenTo(that.viewModel, 'change:currentTrackerData', that.updateTrackerInfo);
        },

        changeCurrentTrackerInfo: function () {
            var model = this.viewModel.get('currentTracker');


            if (model) {
                this.$el.addClass('active');
                var trackerData = this.viewModel.get('periodic').getDataByTrackerId(
                    parseInt(model.get('id')));
                this.viewModel.set('currentTrackerData', trackerData);
            } else {
                this.$el.removeClass('active');
            }
        },

        updateTrackerInfo: function () {
            var currentTrackerData = this.viewModel.get('currentTrackerData');

            if (!currentTrackerData) {
                return;
            }

            this.$('.tracker-info-lat').html(currentTrackerData.get('lat'));
            this.$('.tracker-info-lng').html(currentTrackerData.get('lng'));
            this.$('.tracker-info-speed').html(currentTrackerData.get('speed'));

            var startDate = this.getDateObject(currentTrackerData.get('log_date') * 1000);
            this.$('.tracker-info-last-date').html(startDate.hours + ':' + startDate.min);
        }
    });
});