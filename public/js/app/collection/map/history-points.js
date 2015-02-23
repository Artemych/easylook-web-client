define([
    'lib/backbone',
    'app/model/map/history-point'
], function (Backbone, Point) {
    return Backbone.Collection.extend({
        url: '/json/history.json',

        model: Point
    });
});