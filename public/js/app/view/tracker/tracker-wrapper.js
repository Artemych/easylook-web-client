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
                },
                error: function () {
                    console.log('error');
                }
            });

            //@todo move it
            that.viewModel.get('groups').add(group);
        },

        addTracker: function () {
            var currentGroup = this.viewModel.get('currentGroup');

            if (!currentGroup) {
                alert('Сначала выберете группу');
                return;
            }

            var tracker = new Tracker({
                group: currentGroup,
                groupId: currentGroup.get('id')
            });

            tracker.save();

            currentGroup.get('trackers').add(tracker);
        }
    });
});
