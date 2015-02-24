define([
    'lib/backbone',
    'app/model/tracker/tariff'
], function (Backbone, Tariff) {
    return Backbone.Collection.extend({
        url: '/json/tariffs.json',

        model: Tariff
    });
});
