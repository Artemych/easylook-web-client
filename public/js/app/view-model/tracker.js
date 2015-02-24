define([
    'lib/underscore',
    'app/view-model/base',
    'app/collection/map/groups',
    'app/collection/map/icons',
    'app/collection/tracker/tariffs',
    'app/collection/tracker/models'
], function (_, BaseViewModel, Groups, Icons, Tariffs, Models) {
    return BaseViewModel.extend({
        defaults: {
            groups: new Groups(),
            icons: new Icons(),
            tariffs: new Tariffs(),
            models: new Models()
        },

        initialize: function() {
            var that = this,
                promises;

            BaseViewModel.prototype.initialize.apply(that, arguments);

            promises = {
                groups: that.get('groups').fetch(),
                icons: that.get('icons').fetch(),
                tariffs: that.get('tariffs').fetch(),
                models: that.get('models').fetch()
            };

            that.set('promises', promises);
        }
    });
});