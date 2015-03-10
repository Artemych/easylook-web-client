define([
    'lib/jquery',
    'lib/handlebars',
    'app/view/shared/base-collection',
    'app/view/tracker/group',
    'app/model/map/group',
    'app/model/map/tracker',
    'text!app/template/tracker/tracker-list.html'
], function ($, Handlebars, BaseCollectionView, GroupView, Group, Tracker, trackerList) {
    return BaseCollectionView.extend({
        el: '#profile-info',
        template: Handlebars.compile(trackerList),
        itemView: GroupView,

        events: {
            'click .add-group': 'addGroup',
            'click .add-tracker': 'addTracker'
        },

        initialize: function () {

            var that = this;
            BaseCollectionView.prototype.initialize.apply(that, arguments);

            that.listenTo(that.collection, 'add', that.appendChild);
            that.listenTo(that.collection, 'remove', that.removeChild);
        },

        addGroup: function () {
            var that = this;

            var group = new Group({
                title: "Новая группа"
            });

            group.save({}, {
                success: function () {
                    console.log('success');
                    that.viewModel.get('groups').add(group);
                },
                error: function () {
                    console.log('error');
                }
            });
        },

        addTracker: function () {
            var that = this,
                currentGroup = this.viewModel.get('currentGroup');

            if (!currentGroup) {
                alert('Сначала выберете группу');
                return;
            }

            var imei = prompt("Введите imei");

            if (!imei) {
                alert('Imei обязателен');
                return;
            }

            var tracker = new Tracker({
                group: currentGroup,
                title: "Новый трекер",
                modelId: that.viewModel.get('models').at(0).get('id'),
                iconId: that.viewModel.get('icons').at(0).get('id'),
                tariffId: that.viewModel.get('tariffs').at(0).get('id'),
                imei: imei,
                groupId: currentGroup.get('id')
            });

            tracker.save({}, {
                success: function () {
                    console.log('success');
                    currentGroup.get('trackers').add(tracker);
                },
                error: function () {
                    console.log('error');
                }
            });
        }
    });
});
