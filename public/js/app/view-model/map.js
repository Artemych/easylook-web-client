define([
    'lib/underscore',
    'app/view-model/base',
    'app/collection/map/groups',
    'app/collection/map/icons',
    'app/collection/map/periodic'
], function (_, BaseViewModel, Groups, Icons, Periodic) {
    return BaseViewModel.extend({
        defaults: {
            groups: new Groups(),
            icons: new Icons(),
            periodic: new Periodic()
        },

        initialize: function() {
            var that = this,
                promises;

            BaseViewModel.prototype.initialize.apply(that, arguments);

            promises = {
                groups: that.get('groups').fetch(),
                icons: that.get('icons').fetch(),
                periodic: that.get('periodic').fetch()
            };

            that.set('promises', promises);
        }
    });
});