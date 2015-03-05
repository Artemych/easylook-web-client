define([
    'lib/backbone',
    'app/model/tracker/model'
], function (Backbone, Model) {
    return Backbone.Collection.extend({
        url: '/trackers/api/models',

        model: Model
    });
});
