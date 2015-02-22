define([
    'lib/backbone',
    'app/model/map/group'
], function (Backbone, Group) {
    return Backbone.Collection.extend({
        url: '/json/map-trackers.json',

        model: Group,

        parse: function (data) {
            return data.groups;
        }
    });
});
