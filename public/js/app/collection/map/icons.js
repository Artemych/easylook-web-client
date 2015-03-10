define([
    'lib/backbone',
    'app/model/map/icon'
], function (Backbone, Icon) {
    return Backbone.Collection.extend({
        url: '/api/tracker-icons',

        model: Icon,

        parse: function (data) {
            return data.icons;
        },

        getIdByUrl: function (url) {
            if (!url) {
                return this.at(0).get('id');
            }

            return this.findWhere({
                link: url
            }).get('id');
        },

        getUrlById: function (id) {
            if (!id) {
                return this.at(0).get('link');
            }

            return this.findWhere({
                id: parseInt(id)
            }).get('link');
        }
    });
});
