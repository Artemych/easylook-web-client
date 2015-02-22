define([
    'lib/underscore',
    'lib/jquery',
    'lib/backbone',
    'app/model/shared/base',
    'app/model/map/tracker'
], function (_, $, Backbone, Base, Tracker) {
    return Base.extend({
        relations: [{
            type: Backbone.HasMany,
            key: 'trackers',
            relatedModel: Tracker,
            reverseRelation: {
                key: 'group'
            }
        }]
    });
});