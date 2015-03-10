define([
    'lib/backbone',
    'app/model/map/group'
], function (Backbone, Group) {
    return Backbone.Collection.extend({
        url: '/api/groups-with-trackers',

        model: Group,

        parse: function (data) {
            return data.groups;
        },

        getTrackerById: function (id) {
            var tracker = null;

            _.map(this.models, function(el) {
                var trackers = el.get('trackers'),
                    trackerModel = trackers.findWhere({id: id});

                if (trackerModel) {
                    tracker = trackerModel;
                }
            });

            return tracker;
        },

        getIconByTrackerId: function(trackerId) {
            var tracker = this.getTrackerById(trackerId);

            return tracker.get('icon');
        }
    });
});
