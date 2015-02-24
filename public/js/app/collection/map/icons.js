define([
    'lib/backbone',
    'app/model/map/icon'
], function (Backbone, Icon) {
    return Backbone.Collection.extend({
        url: '/json/tracker-icons.json',

        model: Icon,

        parse: function (data) {
            return data.icons;
        },

        getIdByUrl: function (url) {
            return this.findWhere({
                link: url
            }).get('id');
        },

        getUrlById: function (id) {
            return this.findWhere({
                id: id
            }).get('link');
        }
    });
});
