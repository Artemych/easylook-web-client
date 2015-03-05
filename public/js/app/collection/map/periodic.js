define([
    'lib/backbone',
    'app/model/map/periodic'
], function (Backbone, Periodic) {
    return Backbone.Collection.extend({
        url: '/api/periodic',
        model: Periodic,
        trackerMap: {},

        set: function(models, options) {
            var that = this;

            Backbone.Collection.prototype.set.apply(that, [models, options]);

            _.each(that.models, function (item) {
                that.trackerMap[item.get('tracker_id')] = item;
            });
        },

        parse: function (data) {
            return data.periodic;
        },

        getDataByTrackerId: function (trackerId) {
            return this.trackerMap[trackerId];
        }
    });
});
