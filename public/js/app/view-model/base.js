define([
    'lib/underscore',
    'lib/backbone'
], function (_, Backbone) {
    return Backbone.Model.extend({
        unset: function (attribute, options) {
            var attributes,
                that = this;

            if (_(attribute).isArray()) {
                attributes = {};

                _(attribute).each(function (attributeName) {
                    that.set(attributeName, null, _({}).extend(options, {
                        unset: true
                    }));
                });
            }
            else {
                Backbone.Model.prototype.unset.apply(that, arguments);
            }
        },

        listenToOnceDefined: function (key, event, callback) {
            if (this.get(key)) {
                this.listenTo(this.get(key), event, callback);
            }
            else {
                this.once('change:' + key, function (model, value) {
                    this.listenTo(value, event, callback);
                });
            }
        }
    });
});