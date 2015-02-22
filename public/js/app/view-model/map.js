define([
    'lib/underscore',
    'app/view-model/base',
    'app/collection/map/groups',
    'app/collection/map/icons'
], function (_, BaseViewModel, Groups, Icons) {
    return BaseViewModel.extend({
        defaults: {
            groups: new Groups(),
            icons: new Icons()
        },

        initialize: function() {
            var that = this,
                promises;

            BaseViewModel.prototype.initialize.apply(that, arguments);

            promises = {
                groups: that.get('groups').fetch(),
                icons: that.get('icons').fetch()
            };

            that.set('promises', promises);
        }
    });
});