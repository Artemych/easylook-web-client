define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base-collection',
    'app/view/map/icon',
    'text!app/template/map/tracker-info.html'
], function ($, Handlebars, BaseCollectionView, Icon, trackerInfo) {
    return BaseCollectionView.extend({
        className: 'tracker-block',
        itemView: Icon,
        template: Handlebars.compile(trackerInfo),

        initialize: function () {
            var that = this;

            BaseCollectionView.prototype.initialize.apply(that, arguments);
            that.listenTo(that.viewModel, 'change:currentTracker', that.changeCurrentTrackerInfo);
        },

        setContent: function (title, tariff, group) {
            this.$('.tracker-info-title').html(title);
            this.$('.tracker-info-tariff').html(tariff);
            this.$('.tracker-info-group').html(group);
        },

        changeCurrentTrackerInfo: function () {
            var model = this.viewModel.get('currentTracker');

            if (model) {
                this.setContent(model.get('title'), model.get('tariff'), model.get('group').get('title'));
                this.$el.addClass('active');
            } else {
                this.setContent('', '', '');
                this.$el.removeClass('active');
            }
        }
    });
});
