define([
    'lib/backbone',
], function (Backbone) {
    return Backbone.Router.extend({
        initialize: function (options) {
            options = options || {};

            this.viewModel = options.viewModel;
        }
    });
});
