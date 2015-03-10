define([
    'lib/backbone',
    'app/model/tracker/tariff'
], function (Backbone, Tariff) {
    return Backbone.Collection.extend({
        url: '/api/tariffs',

        model: Tariff,

        parse: function(data) {
            return data.tariffs;
        }
    });
});
