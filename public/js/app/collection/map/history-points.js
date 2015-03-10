define([
    'lib/backbone',
    'app/model/map/history-point'
], function (Backbone, Point) {
    return Backbone.Collection.extend({
        url: '/api/tracker-history',

        model: Point,

        parse: function (data) {
            return data.history;
        }
    });
});